"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

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
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button
          onClick={logout}
          className="text-sm text-red-500 border px-3 py-1"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createTask} className="bg-black text-white px-4">
          Add
        </button>
      </div>

      {tasks.length === 0 && (
        <p className="text-gray-500 text-sm">No tasks yet</p>
      )}

      {tasks.map((task) => (
        <div key={task._id} className="border p-2 mb-2 flex justify-between">
          <span>{task.title}</span>
          <button
            onClick={() => deleteTask(task._id)}
            className="text-red-500 text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
