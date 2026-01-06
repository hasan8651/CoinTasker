import { useState } from "react";
import { useNavigate } from "react-router";
import { uploadToImgbb } from "../../services/imageUploader";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function BuyerAddTask({ currentUser, onUserUpdate }) {
  const [form, setForm] = useState({
    title: "",
    detail: "",
    requiredWorkers: "",
    payableAmount: "",
    completionDate: "",
    submissionInfo: "",

  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const requiredWorkers = Number(form.requiredWorkers);
    const payableAmount = Number(form.payableAmount);


    if (
      !form.title ||
      !form.detail ||
      !requiredWorkers ||
      !payableAmount ||
      !form.completionDate ||
      !form.submissionInfo
    ) {
      setError("All required fields must be filled.");
      setLoading(false);
      return;
    }

    const totalPayable = requiredWorkers * payableAmount;

    if (totalPayable > currentUser.coins) {
      alert("Not available Coin. Purchase Coin.");
      navigate("/dashboard/purchase-coin");
      setLoading(false);
      return;
    }

    try {
  
      let finalImageUrl = "";
      if (imageFile) {
        finalImageUrl = await uploadToImgbb(imageFile);
      }

 
      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          detail: form.detail,
          requiredWorkers,
          payableAmount,
          completionDate: form.completionDate,
          submissionInfo: form.submissionInfo,
          imageUrl: finalImageUrl,
          buyerEmail: currentUser.email,
          buyerName: currentUser.name,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data?.message === "Not available Coin. Purchase Coin.") {
          alert(data.message);
          navigate("/dashboard/purchase-coin");
        } else {
          setError(data.message || "Failed to add task.");
        }
        setLoading(false);
        return;
      }

      if (data.updatedBuyer) {
        onUserUpdate(data.updatedBuyer);
      }

      alert("Task added successfully!");
      navigate("/dashboard/my-tasks");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto card bg-base-100 shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      {error && <p className="text-sm text-error mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="label">Task Title</label>
          <input
            className="input input-bordered w-full"
            value={form.title}
            onChange={handleChange("title")}
            placeholder="e.g. Watch my YouTube video"
            required
          />
        </div>

        {/* Detail */}
        <div>
          <label className="label">Task Detail</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={form.detail}
            onChange={handleChange("detail")}
            required
          />
        </div>

        {/* Workers & Amount */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Required Workers</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={form.requiredWorkers}
              onChange={handleChange("requiredWorkers")}
              min={1}
              required
            />
          </div>
          <div>
            <label className="label">Payable Amount (coins)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={form.payableAmount}
              onChange={handleChange("payableAmount")}
              min={1}
              required
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="label">Completion Date</label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={form.completionDate}
            onChange={handleChange("completionDate")}
            required
          />
        </div>

        {/* Info */}
        <div>
          <label className="label">Submission Info</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={form.submissionInfo}
            onChange={handleChange("submissionInfo")}
            placeholder="What proof is needed?"
            required
          />
        </div>

        {/* Image Upload Input */}
        <div>
          <label className="label">Task Image</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Adding Task..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default BuyerAddTask;