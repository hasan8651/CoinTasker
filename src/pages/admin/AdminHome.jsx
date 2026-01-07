// src/pages/admin/AdminHome.jsx
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function AdminHome() {
  const [stats, setStats] = useState({
    totalWorkers: 0,
    totalBuyers: 0,
    totalCoins: 0,
    totalPayments: 0,
  });
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("microtasker_user"));


  const loadData = async () => {
     if (!user?.email) return;
    try {
      setLoading(true);
      const [statsRes, withdrawRes] = await Promise.all([
           fetch(`${API_BASE}/api/admin/stats?email=${user.email}`),
        fetch(`${API_BASE}/api/withdrawals/pending?email=${user.email}`),
      ]);

      const statsData = await statsRes.json();
      const withdrawData = await withdrawRes.json();

      if (statsRes.ok) setStats(statsData);
      if (withdrawRes.ok) setWithdrawRequests(withdrawData);
    } catch (err) {
      console.error("Failed to load admin home data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApproveWithdrawal = async (id, workerEmail, amountCoin) => {
    try {
      const res = await fetch(`${API_BASE}/api/withdrawals/${id}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerEmail, amountCoin }),
      });

      if (res.ok) {
        alert("Withdrawal approved successfully!");
        loadData(); // Refresh data
      } else {
        alert("Failed to approve withdrawal.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  if (loading) return <div className="p-4">Loading admin dashboard...</div>;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="text-sm font-semibold text-base-content/70">Total Workers</h3>
          <p className="text-2xl font-bold">{stats.totalWorkers}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="text-sm font-semibold text-base-content/70">Total Buyers</h3>
          <p className="text-2xl font-bold">{stats.totalBuyers}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="text-sm font-semibold text-base-content/70">Total Available Coins</h3>
          <p className="text-2xl font-bold">{stats.totalCoins}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="text-sm font-semibold text-base-content/70">Total Payments ($)</h3>
          <p className="text-2xl font-bold">${stats.totalPayments}</p>
        </div>
      </section>

      {/* Withdraw Requests */}
      <section className="card bg-base-100 shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">Pending Withdraw Requests</h3>
        {withdrawRequests.length === 0 ? (
          <p className="text-sm text-base-content/70">No pending requests.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Worker Name</th>
                  <th>Amount ($)</th>
                  <th>Coins</th>
                  <th>Payment System</th>
                  <th>Account No</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {withdrawRequests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.workerName}</td>
                    <td>${req.withdrawalAmount}</td>
                    <td>{req.withdrawalCoin}</td>
                    <td>{req.paymentSystem}</td>
                    <td>{req.accountNumber}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleApproveWithdrawal(
                            req._id,
                            req.workerEmail,
                            req.withdrawalCoin
                          )
                        }
                      >
                        Payment Success
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminHome;