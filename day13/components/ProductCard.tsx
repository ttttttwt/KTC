import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/type";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div
      className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <Image
        src={product.images[0]}
        alt={product.title}
        width={400}
        height={192}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <h2 className="text-lg font-bold mb-2 text-gray-800">{product.title}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-green-500 font-semibold">${product.price}</p>
    </div>
  );
}
