import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function WorkerMySubmissions({ currentUser }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    if (!currentUser?.email) return;

    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/api/submissions/my?workerEmail=${encodeURIComponent(
            currentUser.email
          )}&page=${page}&limit=${limit}`
        );
        const data = await res.json();

        if (res.ok) {
          if (data.submissions) {
            setSubmissions(data.submissions);
            setTotalPages(data.totalPages || 1);
          } else {
              setSubmissions(data);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [currentUser?.email, page]);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Submissions</h2>
      
      {submissions.length === 0 ? (
        <p className="text-gray-500">No submissions found.</p>
      ) : (
        <div className="overflow-x-auto card bg-base-100 shadow-md">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Buyer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s._id}>
                  <td>{s.taskTitle}</td>
                  <td>{s.buyerName}</td>
                  <td>{new Date(s.submissionDate).toLocaleDateString()}</td>
                  <td>{s.payableAmount}</td>
                  <td>
                    <span
                      className={`badge badge-sm ${
                        s.status === "approved"
                          ? "badge-success"
                          : s.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="join">
            <button
              className="join-item btn"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <button className="join-item btn btn-active pointer-events-none">
              Page {page} of {totalPages}
            </button>
            <button
              className="join-item btn"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkerMySubmissions;