import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth-context";

interface ProtectedRouteProps {
    children?: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <>{children ?? <Outlet />}</>;
}

export default ProtectedRoute;
