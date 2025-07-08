import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const limit = 4;

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategories]);

  const fetchProducts = async () => {
    const offset = (currentPage - 1) * limit;

    if (selectedCategories.length === 0) {
      // Fetch all products
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      const data = await response.json();
      setProducts(data);

      // Get total count for pagination
      const totalResponse = await fetch(
        "https://api.escuelajs.co/api/v1/products"
      );
      const totalData = await totalResponse.json();
      setTotalPages(Math.ceil(totalData.length / limit));
    } else {
      // Fetch products from selected categories
      const categoryPromises = selectedCategories.map((categoryId) =>
        fetch(
          `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
        ).then((response) => response.json())
      );

      const categoryResults = await Promise.all(categoryPromises);
      const allCategoryProducts = categoryResults.flat();

      // Apply pagination to filtered results
      const startIndex = offset;
      const endIndex = startIndex + limit;
      const paginatedProducts = allCategoryProducts.slice(startIndex, endIndex);

      setProducts(paginatedProducts);
      setTotalPages(Math.ceil(allCategoryProducts.length / limit));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.includes(categoryId);
      const newSelection = isSelected
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];

      // Reset to first page when category changes
      setCurrentPage(1);
      return newSelection;
    });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* // Sidebar */}
      <div className="w-72 p-4 bg-white ">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="p-3 rounded shadow flex items-center text-blue-600"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      {/* // Main content */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-fit">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.images[0]}
            />
          ))}
        </div>
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50"
            }`}
          >
            Previous
          </button>

          {renderPaginationButtons()}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
