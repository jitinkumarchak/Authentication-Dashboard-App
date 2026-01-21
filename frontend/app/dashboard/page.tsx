"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await api.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const createTask = async () => {
    if (!title.trim()) return;
    await api.post(
      "/tasks",
      { title },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button
            onClick={logout}
            className="text-sm text-gray-500 hover:text-red-500"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            className="border rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="New task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createTask}
            className="bg-black text-white px-4 rounded-lg hover:bg-gray-900"
          >
            Add
          </button>
        </div>

        <input
          className="border rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {tasks.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-6">
            No tasks yet. Add one to get started.
          </p>
        )}

        {tasks
          .filter((task) =>
            (task.title ?? "").toLowerCase().includes(search.toLowerCase()),
          )
          .map((task) => (
            <div
              key={task._id}
              className="border rounded-lg p-3 mb-2 flex justify-between items-center hover:bg-gray-50"
            >
              <span>{task.title}</span>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
