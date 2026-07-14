#!/usr/bin/env python3
"""
Leverage reality simulator — offline, no exchange, no network.

Answers "how much will I make with $X at high leverage?" honestly, by running a
Monte-Carlo simulation of many trading runs against a realistic random price
model (no predictive edge, because none has been demonstrated) with real Bybit
perp fees and liquidation mechanics.

It is NOT a prediction of any specific coin. It shows the *distribution of
outcomes* the mechanics produce — which is the honest answer to the question.

Usage:
    python3 scripts/simulate.py                     # $20, 100x, 1 week
    python3 scripts/simulate.py --balance 20 --leverage 50 --days 30
"""
from __future__ import annotations

import argparse
import math
import random
import statistics

# --- realistic constants ---------------------------------------------------
TAKER_FEE = 0.00055     # 0.055% per side, Bybit perp taker
MAINT_MARGIN = 0.005    # ~0.5% maintenance margin (majors)
ANNUAL_VOL = 0.70       # ~70% annualized vol, typical for BTC/ETH
MINUTES_PER_YEAR = 365 * 24 * 60


def per_minute_sigma(annual_vol: float) -> float:
    return annual_vol / math.sqrt(MINUTES_PER_YEAR)


def simulate_once(
    start: float,
    leverage: float,
    max_trades: int,
    hold_min: int,
    risk_fraction: float,
    sigma: float,
    rng: random.Random,
) -> dict:
    """One trading run: enter random-direction (no edge) leveraged trades until
    time runs out or the account is dust. Returns the outcome."""
    balance = start
    fees_paid = 0.0
    trades = 0
    ever_liquidated = False
    # Adverse fractional move that triggers liquidation (isolated margin).
    liq_move = max(1.0 / leverage - MAINT_MARGIN, 1.0 / leverage * 0.5)

    for _ in range(max_trades):
        if balance < start * 0.05:      # < 5% of start: effectively wiped out
            break
        margin = balance * risk_fraction
        notional = margin * leverage
        direction = rng.choice((1, -1))  # coin flip: no predictive edge
        entry_fee = notional * TAKER_FEE
        fees_paid += entry_fee
        balance -= entry_fee

        # Walk the price minute-by-minute; liquidate on adverse excursion.
        price = 1.0
        worst_adverse = 0.0
        liquidated = False
        for _ in range(hold_min):
            price *= math.exp(rng.gauss(0.0, sigma))
            adverse = -((price - 1.0) * direction)
            if adverse > worst_adverse:
                worst_adverse = adverse
            if worst_adverse >= liq_move:
                liquidated = True
                break
        trades += 1

        if liquidated:
            balance -= margin           # entire margin lost
            ever_liquidated = True
            continue

        final_move = (price - 1.0) * direction
        exit_fee = notional * price * TAKER_FEE
        fees_paid += exit_fee
        balance += notional * final_move - exit_fee

    return {
        "final": max(balance, 0.0),
        "fees": fees_paid,
        "trades": trades,
        "wiped": balance < start * 0.5,       # ended with under half the stack
        "liquidated": ever_liquidated,
    }


def monte_carlo(n: int, start: float, leverage: float, days: int,
                trades_per_day: float, hold_min: int, risk_fraction: float,
                seed: int | None = None) -> dict:
    rng = random.Random(seed)
    sigma = per_minute_sigma(ANNUAL_VOL)
    max_trades = max(1, int(round(days * trades_per_day)))
    finals, fees, survived = [], [], []
    wiped = liq = 0
    for _ in range(n):
        r = simulate_once(start, leverage, max_trades, hold_min, risk_fraction, sigma, rng)
        finals.append(r["final"])
        fees.append(r["fees"])
        survived.append(r["trades"])
        wiped += r["wiped"]
        liq += r["liquidated"]
    finals.sort()
    return {
        "median_final": statistics.median(finals),
        "mean_final": statistics.fmean(finals),
        "p10": finals[int(0.10 * n)],
        "p90": finals[int(0.90 * n)],
        "best": finals[-1],
        "avg_fees": statistics.fmean(fees),
        "median_trades": statistics.median(survived),
        "wiped_pct": 100.0 * wiped / n,
        "liq_pct": 100.0 * liq / n,
    }


def main() -> None:
    p = argparse.ArgumentParser(description="Offline leverage reality simulator")
    p.add_argument("--balance", type=float, default=20.0)
    p.add_argument("--leverage", type=float, default=100.0)
    p.add_argument("--days", type=int, default=7)
    p.add_argument("--trades-per-day", type=float, default=5.0)
    p.add_argument("--hold-min", type=int, default=60, help="minutes held per trade")
    p.add_argument("--risk-fraction", type=float, default=1.0,
                   help="fraction of balance used as margin per trade (1.0 = all-in)")
    p.add_argument("--runs", type=int, default=2000)
    p.add_argument("--seed", type=int, default=None)
    args = p.parse_args()

    print("=" * 66)
    print(f" Leverage reality check — ${args.balance:g} over {args.days} days")
    print(f" model: no edge (coin-flip), ~{ANNUAL_VOL:.0%} annual vol, "
          f"{TAKER_FEE:.3%}/side fee")
    print(f" {args.runs} simulated runs, {args.trades_per_day:g} trades/day, "
          f"all-in={args.risk_fraction == 1.0}")
    print("=" * 66)

    r = monte_carlo(args.runs, args.balance, args.leverage, args.days,
                    args.trades_per_day, args.hold_min, args.risk_fraction, args.seed)
    print(f"\n At {args.leverage:g}x leverage:")
    print(f"   • Wiped out (<50% left):   {r['wiped_pct']:.0f}% of runs")
    print(f"   • Hit a liquidation:       {r['liq_pct']:.0f}% of runs")
    print(f"   • Median ending balance:   ${r['median_final']:.2f}  "
          f"(started ${args.balance:g})")
    print(f"   • Typical range (p10–p90): ${r['p10']:.2f} – ${r['p90']:.2f}")
    print(f"   • Luckiest of {args.runs}:        ${r['best']:.2f}")
    print(f"   • Avg fees paid to exchange: ${r['avg_fees']:.2f}")

    # The money shot: how outcomes degrade as leverage climbs.
    print("\n" + "-" * 66)
    print(" Same $%g, one week, across leverage levels:" % args.balance)
    print("-" * 66)
    print(f" {'leverage':>9} | {'wiped out':>10} | {'median end':>11} | {'avg fees':>9}")
    print(f" {'-'*9} | {'-'*10} | {'-'*11} | {'-'*9}")
    for lev in (1, 5, 10, 20, 50, 100):
        rr = monte_carlo(1200, args.balance, lev, args.days, args.trades_per_day,
                         args.hold_min, args.risk_fraction, args.seed)
        print(f" {lev:>8}x | {rr['wiped_pct']:>9.0f}% | "
              f"${rr['median_final']:>10.2f} | ${rr['avg_fees']:>8.2f}")

    print("\n Note: 'no edge' is the honest assumption. WITH a real edge the")
    print(" numbers improve; a losing edge makes them worse. High leverage")
    print(" mostly changes how *fast* you reach the outcome, not the average.")


if __name__ == "__main__":
    main()
