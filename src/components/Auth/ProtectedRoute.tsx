import { useAuthStore } from "@/store/authStore";
import { Navigate } from "@tanstack/react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  // Authenticated but requires admin role
  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" />; // Redirect to home if not admin
  }

  // All checks passed
  return <>{children}</>;
};
