import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface AuthContextType {
    isLoggedIn: boolean
    user: { email: string; name: string } | null
    login: (email: string, password: string) => boolean
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEMO_USER = {
    email: "admin@admin.com",
    password: "admin",
    name: "Studio Admin",
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<{ email: string; name: string } | null>(null)

    const login = useCallback((email: string, password: string) => {
        if (email === DEMO_USER.email && password === DEMO_USER.password) {
            setIsLoggedIn(true)
            setUser({ email: DEMO_USER.email, name: DEMO_USER.name })
            return true
        }
        return false
    }, [])

    const logout = useCallback(() => {
        setIsLoggedIn(false)
        setUser(null)
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
