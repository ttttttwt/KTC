import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getUserById,
  getRoles,
  addRolesToUser,
  removeRolesFromUser,
} from "../service";
import type { User, Role } from "../type";

export default function UpdateUserRole() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState<Set<number>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [userResponse, rolesResponse] = await Promise.all([
          getUserById(id),
          getRoles(),
        ]);

        const userData = userResponse as unknown as User;
        setUser(userData);
        setAllRoles(rolesResponse as unknown as Role[]);

        const currentUserRoleIds = new Set(
          userData.roles.map((role) => role.id as number)
        );
        setSelectedRoleIds(currentUserRoleIds);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleRoleChange = (roleId: number) => {
    setSelectedRoleIds((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(roleId)) {
        newSelected.delete(roleId);
      } else {
        newSelected.add(roleId);
      }
      return newSelected;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id) return;

    try {
      setIsLoading(true);
      const currentRoleIds = new Set(user.roles.map((r) => r.id as number));
      const rolesToAdd = [...selectedRoleIds].filter(
        (id) => !currentRoleIds.has(id)
      );
      const rolesToRemove = [...currentRoleIds].filter(
        (id) => !selectedRoleIds.has(id)
      );

      if (rolesToAdd.length) {
        await addRolesToUser(id, rolesToAdd);
      }
      if (rolesToRemove.length) {
        await removeRolesFromUser(id, rolesToRemove);
      }

      alert("Roles updated successfully");
      // refresh the user data
      const updatedUser = await getUserById(id);
      setUser(updatedUser as unknown as User);
    } catch (err) {
      setError("Failed to update roles");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="p-6">
        <div className="text-red-600">{error || "User not found"}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Update Roles for {user.fullName}
      </h1>
      <div className="mt-2 mb-6">
        <p className="text-gray-600">User ID: {user.id}</p>
        <p className="text-gray-600">Username: {user.username}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {allRoles.map((role) => (
            <div key={role.id} className="flex items-center">
              <input
                type="checkbox"
                id={`role-${role.id}`}
                checked={selectedRoleIds.has(role.id as number)}
                onChange={() => handleRoleChange(role.id as number)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={`role-${role.id}`} className="ml-2 block">
                <span className="text-gray-900 font-medium">{role.name}</span>
                <span className="text-gray-500 text-sm ml-2">
                  ({role.description})
                </span>
              </label>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
