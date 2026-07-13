"""Minimal Bybit V5 REST client with HMAC-SHA256 request signing.

Only the plumbing lives here: signing, the retCode envelope, and GET/POST.
Risk guards live in server.py so they are applied before any request is
built. The signed payload is byte-identical to what is sent on the wire
(query string for GET, raw JSON body for POST), which is what Bybit's
signature scheme requires.
"""
from __future__ import annotations

import hashlib
import hmac
import json
import time
from typing import Any
from urllib.parse import urlencode

import httpx

from .config import Settings

MAINNET_URL = "https://api.bybit.com"
TESTNET_URL = "https://api-testnet.bybit.com"


class BybitAPIError(RuntimeError):
    """Raised when Bybit returns a non-zero retCode."""

    def __init__(self, ret_code: int, ret_msg: str, path: str):
        self.ret_code = ret_code
        self.ret_msg = ret_msg
        self.path = path
        super().__init__(f"Bybit API error {ret_code} on {path}: {ret_msg}")


class BybitClient:
    def __init__(self, settings: Settings, http: httpx.Client | None = None):
        self.settings = settings
        self.base_url = TESTNET_URL if settings.env == "testnet" else MAINNET_URL
        self._http = http or httpx.Client(base_url=self.base_url, timeout=15.0)

    def _auth_headers(self, payload: str) -> dict[str, str]:
        s = self.settings
        if not s.api_key or not s.api_secret:
            raise RuntimeError(
                "This endpoint requires authentication but no API credentials are "
                "configured. Set BYBIT_API_KEY and BYBIT_API_SECRET (see .env.example)."
            )
        timestamp = str(int(time.time() * 1000))
        message = f"{timestamp}{s.api_key}{s.recv_window}{payload}"
        signature = hmac.new(
            s.api_secret.encode(), message.encode(), hashlib.sha256
        ).hexdigest()
        return {
            "X-BAPI-API-KEY": s.api_key,
            "X-BAPI-TIMESTAMP": timestamp,
            "X-BAPI-RECV-WINDOW": str(s.recv_window),
            "X-BAPI-SIGN": signature,
            "X-BAPI-SIGN-TYPE": "2",
        }

    @staticmethod
    def _unwrap(response: httpx.Response, path: str) -> dict[str, Any]:
        response.raise_for_status()
        data = response.json()
        if data.get("retCode") != 0:
            raise BybitAPIError(
                data.get("retCode", -1), data.get("retMsg", "unknown error"), path
            )
        return data.get("result", {})

    def get(
        self, path: str, params: dict[str, Any] | None = None, auth: bool = False
    ) -> dict[str, Any]:
        clean = {k: v for k, v in (params or {}).items() if v is not None}
        query = urlencode(clean)
        url = f"{path}?{query}" if query else path
        headers = self._auth_headers(query) if auth else {}
        return self._unwrap(self._http.get(url, headers=headers), path)

    def post(self, path: str, body: dict[str, Any]) -> dict[str, Any]:
        clean = {k: v for k, v in body.items() if v is not None}
        payload = json.dumps(clean, separators=(",", ":"))
        headers = self._auth_headers(payload)
        headers["Content-Type"] = "application/json"
        return self._unwrap(self._http.post(path, content=payload, headers=headers), path)
