"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    api
      .get("/tasks")
      .then((res) => setTasks(res.data))
      .catch(() => router.push("/auth/login"));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {tasks.map((task: any) => (
        <div key={task._id} className="border p-2 mb-2">
          {task.title}
        </div>
      ))}
    </div>
  );
}
