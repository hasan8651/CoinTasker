// src/pages/worker/WorkerWithdrawals.jsx
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function WorkerWithdrawals({ currentUser }) {
  const [withdrawCoin, setWithdrawCoin] = useState("");
  const [paymentSystem, setPaymentSystem] = useState("Bkash");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const totalCoins = currentUser?.coins || 0;
  // 20 coins = 1 dollar
  const withdrawalAmount = Number(withdrawCoin) / 20; 
  const maxWithdrawAmount = totalCoins / 20;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(withdrawCoin) > totalCoins) {
      return alert("Insufficient coins");
    }
    if (Number(withdrawCoin) < 200) {
      return alert("Minimum withdrawal is 200 coins");
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/withdrawals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workerEmail: currentUser.email,
          workerName: currentUser.name,
          withdrawalCoin: Number(withdrawCoin),
          withdrawalAmount,
          paymentSystem,
          accountNumber,
          withdrawDate: new Date(),
          status: "pending",
        }),
      });

      if (res.ok) {
        alert("Withdrawal request submitted!");
        setWithdrawCoin("");
        setAccountNumber("");
      } else {
        alert("Failed to submit request.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Earnings Info */}
      <div className="card bg-base-100 shadow-md p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Your Earnings</h2>
        <div className="stat">
          <div className="stat-title">Total Coins</div>
          <div className="stat-value text-primary">{totalCoins}</div>
          <div className="stat-desc">
            Equivalent to ${maxWithdrawAmount.toFixed(2)}
          </div>
        </div>
        <p className="text-xs text-error mt-2">
          Minimum withdrawal: 200 coins ($10)
        </p>
      </div>

      {/* Withdrawal Form */}
      <div className="card bg-base-100 shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Withdraw Funds</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Coin To Withdraw</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={withdrawCoin}
              onChange={(e) => setWithdrawCoin(e.target.value)}
              max={totalCoins}
              required
            />
          </div>
          <div>
            <label className="label">Withdraw Amount ($)</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={`$${withdrawalAmount.toFixed(2)}`}
              readOnly
            />
          </div>
          <div>
            <label className="label">Payment System</label>
            <select
              className="select select-bordered w-full"
              value={paymentSystem}
              onChange={(e) => setPaymentSystem(e.target.value)}
            >
              <option>Bkash</option>
              <option>Rocket</option>
              <option>Nagad</option>
              <option>Stripe</option>
            </select>
          </div>
          <div>
            <label className="label">Account Number</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              required
            />
          </div>

          {totalCoins < 200 ? (
            <p className="text-error font-semibold text-center">
              Insufficient coin (Need 200+)
            </p>
          ) : (
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Processing..." : "Withdraw"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default WorkerWithdrawals;