// src/pages/worker/WorkerTaskList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function WorkerTaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
const [sort, setSort] = useState("deadline");

const url = `${API_BASE}/api/tasks/available?search=${search}&sort=${sort}`;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/tasks/available`);
        const data = await res.json();
        if (res.ok) {
          setTasks(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <div className="p-4">Loading tasks...</div>;

  return (
    <div>


<div className="flex gap-4 mb-4">
  <input 
    className="input input-bordered" 
    placeholder="Search tasks..." 
    onChange={e => setSearch(e.target.value)} 
  />
  <select className="select select-bordered" onChange={e => setSort(e.target.value)}>
    <option value="deadline">Deadline</option>
    <option value="price_desc">Price (High to Low)</option>
    <option value="price_asc">Price (Low to High)</option>
  </select>
</div>

      <h2 className="text-2xl font-bold mb-6">Available Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task._id} className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-lg">{task.title}</h3>
                <div className="text-sm text-base-content/70 space-y-1 mt-2">
                  <p><strong>Buyer:</strong> {task.buyerName}</p>
                  <p><strong>Deadline:</strong> {new Date(task.completionDate).toLocaleDateString()}</p>
                  <p><strong>Payable:</strong> {task.payableAmount} coins</p>
                  <p><strong>Slots:</strong> {task.requiredWorkers} left</p>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/dashboard/task-details/${task._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkerTaskList;