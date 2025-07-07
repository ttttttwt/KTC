import { useState } from "react";
import ListUser from "./list";
import CreateUser from "./create";

export default function Index() {
  const [reload, setReload] = useState(1);
  const handleReload = () => {
    setReload((prev) => prev + 1);
    console.log("Reloading user list...");
  };
  return (
    <div className="mx-auto p-4 flex flex-col gap-5">
      <div>
        <CreateUser onReload={handleReload} />
      </div>
      <hr />
      <div className="text-2xl font-bold">User List</div>
      <ListUser reload={reload} onReload={handleReload} />
    </div>
  );
}
