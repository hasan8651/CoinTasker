// src/pages/worker/WorkerTaskDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function WorkerTaskDetails({ currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [submissionDetails, setSubmissionDetails] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/tasks/${id}`);
        const data = await res.json();
        if (res.ok) setTask(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submissionDetails.trim()) return alert("Please enter submission details");

    try {
      const res = await fetch(`${API_BASE}/api/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: task._id,
          taskTitle: task.title,
          payableAmount: task.payableAmount,
          workerEmail: currentUser.email,
          workerName: currentUser.name,
          buyerEmail: task.buyerEmail,
          buyerName: task.buyerName,
          submissionDetails,
          submissionDate: new Date(),
          status: "pending",
        }),
      });

      if (res.ok) {
        alert("Submission successful!");
        navigate("/dashboard/my-submissions");
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!task) return <div className="p-4">Task not found.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="card bg-base-100 shadow-md p-6">
        <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
        <img
          src={task.imageUrl}
          alt={task.title}
          className="w-full h-48 object-cover rounded-lg mb-4 bg-gray-200"
        />
        <p className="text-base mb-4">{task.detail}</p>
        <div className="grid grid-cols-2 gap-4 text-sm text-base-content/80">
          <p><strong>Buyer:</strong> {task.buyerName}</p>
          <p><strong>Deadline:</strong> {new Date(task.completionDate).toLocaleDateString()}</p>
          <p><strong>Payable:</strong> {task.payableAmount} coins</p>
          <p><strong>Submission Info:</strong> {task.submissionInfo}</p>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Submit Your Work</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="textarea textarea-bordered w-full h-32"
            placeholder="Enter submission details (proofs, links, etc.)..."
            value={submissionDetails}
            onChange={(e) => setSubmissionDetails(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Submit Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default WorkerTaskDetails;