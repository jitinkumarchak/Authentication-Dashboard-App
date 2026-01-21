"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api
      .get("/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setTasks(res.data));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {tasks.map((t: any) => (
        <div key={t._id}>{t.title}</div>
      ))}
    </div>
  );
}
