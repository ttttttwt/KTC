type ProductCardProps = {
  title: string;
  price: number;
  image?: string; // có thể không có
};

export default function ProductCard({ title, price, image }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-max">
      <div className="w-full h-72 mb-4 flex items-center justify-center bg-gray-100 rounded">
        {image ? (
          <img src={image} alt={title} className="object-contain h-full" />
        ) : (
          <div className="text-gray-400">No Image</div>
        )}
      </div>
      <div className="flex-grow">
        <h3 className="text-sm font-medium text-gray-800 mb-2 truncate">
          {title.length > 50 ? title.slice(0, 50) + "..." : title}
        </h3>
        <p className="text-red-500 font-bold">{price.toLocaleString()}đ</p>
      </div>
    </div>
  );
}
