import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="flex min-w-screen min-h-screen bg-white">
      <Outlet />
    </div>
  );
}
