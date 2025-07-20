import { useEffect, useState } from "react";
import { useAuthStore } from "../useAuthStore";
import { useNavigate } from "react-router";
import type { User } from "../type";
import { getUsers } from "../service";

export default function UserList() {
  const { loggedInUser } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/");
    }

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await getUsers();
        setUsers(response as unknown as User[]);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [loggedInUser, navigate]);

  if (isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading users...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="overflow-x-auto">
        <div className="max-h-164 overflow-y-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="py-3 px-5 border-b font-semibold">Full Name</th>
                <th className="py-3 px-5 border-b font-semibold">Username</th>
                <th className="py-3 px-5 border-b font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="even:bg-gray-50 hover:bg-blue-50">
                  <td className="py-3 px-5 border-b">{user.fullName}</td>
                  <td className="py-3 px-5 border-b">{user.username}</td>
                  <td className="py-3 px-5 border-b">
                    <button
                      onClick={() => navigate(`/update-user-role/${user.id}`)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Manage Roles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
