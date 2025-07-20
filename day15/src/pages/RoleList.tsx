import { useEffect, useState } from "react";
import { useAuthStore } from "../useAuthStore";
import { useNavigate } from "react-router";
import type { Role } from "../type";
import { addRole, getRoles } from "../service";
import { useForm } from "react-hook-form";

export default function RoleList() {
  const { loggedInUser } = useAuthStore();
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Import useForm from react-hook-form

  type FormValues = {
    name: string;
    description: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/");
    }
    const fetchRoles = async () => {
      try {
        setIsLoading(true);
        const response = await getRoles();
        setRoles(response as unknown as Role[]);
      } catch (error) {
        console.error("Error fetching roles:", error);
        alert("Failed to fetch roles.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoles();
  }, [loggedInUser, navigate]);

  if (isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Role List</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading roles...</span>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: FormValues) => {
    // Form submission logic would go here
    await addRole({
      name: data.name,
      description: data.description,
      code: data.name,
    });
    reset();
    // Refresh the roles list after adding a new role
    const updatedRoles = await getRoles();
    setRoles(updatedRoles as unknown as Role[]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900">Role List</h1>
      <p className="mt-1 text-sm text-gray-600">
        Manage user roles and permissions
      </p>

      {/* Add Role Form */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
        <h2 className="text-lg font-medium mb-3">Add New Role</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Role Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Role name is required" })}
                className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.name && (
                <span className="text-xs text-red-600">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                {...register("description", {})}
                className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.description && (
                <span className="text-xs text-red-600">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Role
            </button>
          </div>
        </form>
      </div>

      {/* Role List */}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-3">Existing Roles</h2>
        <div className="max-h-96 overflow-y-auto border rounded-lg">
          <ul className="divide-y divide-gray-200">
            {roles.map((role) => (
              <li key={role.id} className="px-4 py-3 hover:bg-gray-50">
                <h2 className="text-lg font-medium">{role.name}</h2>
                <p className="text-sm text-gray-500">{role.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
