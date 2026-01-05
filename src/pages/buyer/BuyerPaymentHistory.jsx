import { useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function BuyerPaymentHistory({ currentUser }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser?.email) return;
    loadPayments();
  }, [currentUser?.email]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `${API_BASE}/api/payments/my?buyerEmail=${encodeURIComponent(
          currentUser.email
        )}`
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to load payment history.");
        setLoading(false);
        return;
      }
      setPayments(data);
    } catch (err) {
      console.error(err);
      setError("Network error while loading payments.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading payment history...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Payment History</h2>
      {error && <p className="text-sm text-error">{error}</p>}
      {payments.length === 0 ? (
        <p className="text-sm text-base-content/70">
          You have not made any payments yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount ($)</th>
                <th>Coins Received</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.paymentDate
                      ? new Date(p.paymentDate).toLocaleString()
                      : "-"}
                  </td>
                  <td>{p.amountDollars}</td>
                  <td>{p.coinsReceived}</td>
                  <td className="truncate max-w-xs">{p.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BuyerPaymentHistory;