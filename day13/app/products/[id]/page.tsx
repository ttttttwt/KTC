"use client";

import { Product } from "@/type";
import { useParams } from "next/dist/client/components/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function DetailPage() {
  const params = useParams();

  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const product = await response.json();
        setData(product);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetail();
  }, [params.id]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Detail Page</h1>
      {data ? (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="relative h-96 mb-6">
        <Image
          fill
          src={data.images[0]}
          alt={data.title}
          className="object-fix rounded-lg"
        />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{data.title}</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">{data.description}</p>
        <p className="text-2xl font-bold text-green-600">
        ${data.price.toLocaleString()}
        </p>
      </div>
      ) : (
      <p className="text-gray-500 text-center">No product data available</p>
      )}
    </div>
  );
}
