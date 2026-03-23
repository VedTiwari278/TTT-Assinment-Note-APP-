import { Link, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

function DashboardLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-4 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">My Notes</h1>
            <p className="text-sm text-gray-500">
              {user?.name} • {user?.email}
            </p>
          </div>

          <nav className="flex items-center gap-2">
            <Link to="/dashboard/overview">
              <Button variant="secondary">Overview</Button>
            </Link>
            <Link to="/dashboard/notes/new">
              <Button>+ New Note</Button>
            </Link>
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <Outlet />
    </main>
  );
}

export default DashboardLayout;
