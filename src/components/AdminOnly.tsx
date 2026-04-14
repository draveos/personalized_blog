import type { ReactNode } from "react";
import { useAuth } from "../lib/auth-context";

interface AdminOnlyProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
    const { isLoggedIn } = useAuth();
    return <>{isLoggedIn ? children : fallback}</>;
}

export default AdminOnly;
