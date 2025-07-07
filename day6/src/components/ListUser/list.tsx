import { useEffect, useState } from "react";
import UpdateUser from "./update";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function ListUser({
  reload,
  onReload,
}: {
  reload?: number;
  onReload?: () => void;
}) {
  const [data, setData] = useState<User[]>([]);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [reload]);

  const handleEdit = (userId: number) => {
    setSelectedUserId(userId);
    setShowUpdatePopup(true);
  };

  const handleDelete = (userId: number) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "DELETE",
    }).then(() => {
      console.log("User deleted successfully");
      onReload?.();
    });
  };

  const handleClosePopup = () => {
    setShowUpdatePopup(false);
    setSelectedUserId(null);
  };

  return (
    <>
      <table className="mt-4 w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id} className="hover:bg-blue-200">
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdatePopup && selectedUserId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <UpdateUser
              userId={selectedUserId}
              onClose={handleClosePopup}
              onUpdate={() => {
                onReload?.();
                handleClosePopup();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
