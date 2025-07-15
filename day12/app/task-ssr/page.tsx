import { getOurTasks } from "@/service";
import React from "react";

export const dynamic = "force-dynamic";

async function fetchData() {
  const data = await getOurTasks()
    .then((data) => (Array.isArray(data) ? data : []))
    .catch((error) => console.error("Error fetching data:", error));

  console.log(">>> Đang gọi fetchData trong thời gian build?");
  return data;
}

export default async function Page() {
  const data = await fetchData();
  return (
    <div>
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
    </div>
  );
}
