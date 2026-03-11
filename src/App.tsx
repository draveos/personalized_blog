"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth-context";
import { Navbar } from "./components/NavBar";
import { LiquidGlassCursor } from "./components/LiquidGlassCursor";
import GlassFilters from "./components/GlassFilters";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/login/LoginPage";
import DashBoardPage from "./pages/DashBoard"
import {SiteStoreProvider} from "./lib/site-store"

function App() {
    return (
        // 1. 가장 바깥쪽이나 Router 바로 안쪽에 AuthProvider를 감싸줍니다.
        <AuthProvider>
            <SiteStoreProvider>
                <Router>
                    <div className="min-h-screen bg-black text-foreground overflow-x-hidden font-sans selection:bg-primary selection:text-primary-foreground">
                        <LiquidGlassCursor />
                        <GlassFilters />
                        <Navbar />

                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/dashboard" element={<DashBoardPage />} />
                        </Routes>
                    </div>
                </Router>
                </SiteStoreProvider>
        </AuthProvider>
    );
}

export default App;