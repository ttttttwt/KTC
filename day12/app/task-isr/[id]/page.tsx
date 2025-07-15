import { getTaskById } from "@/service";
import React from "react";

export const revalidate = 20;

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function fetchData(id: string) {
  const data = await getTaskById(id)
    .then((data) => (typeof data === "object" ? data : {}))
    .catch((error) => console.error("Error fetching data:", error));
  console.log(">>> Fetching task data for ID:", id);
  return data;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const data = await fetchData(id);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <div className="bg-gray-800 p-4 rounded-lg">
        <p className="text-white">ID: {data?.id}</p>
        <p className="text-white">Title: {data?.title}</p>
        <p className="text-white">Description: {data?.description}</p>
      </div>
    </div>
  );
}
