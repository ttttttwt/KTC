"use client";
import { getOurTasks, login } from "@/service";
import { useEffect, useState } from "react";

type Data = {
  id: number;
  title: string;
  description: string;
};

export default function Page() {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    // login first
    login("tungnt@softech.vn", "123456789").then((response) => {
      if (response.access_token && typeof window !== "undefined") {
        localStorage.setItem("access_token", response.access_token);
        getOurTasks()
          .then((data) => setData(Array.isArray(data) ? data : []))
          .catch((error) => console.error("Error fetching data:", error));
      }
    });
  }, []);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-white">ID</th>
            <th className="px-4 py-2 text-left text-white">Title</th>
            <th className="px-4 py-2 text-left text-white">Description</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="border-b border-gray-700">
              <td className="px-4 py-2 text-white">{item.id}</td>
              <td className="px-4 py-2 text-white">{item.title}</td>
              <td className="px-4 py-2 text-white">{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
