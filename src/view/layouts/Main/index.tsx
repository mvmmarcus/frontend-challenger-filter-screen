import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="flex w-screen h-screen">
      <Outlet />
    </div>
  );
}
