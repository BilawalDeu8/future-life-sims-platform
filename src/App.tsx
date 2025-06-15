
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Simulation from "./pages/Simulation";
import Timeline from "./pages/Timeline";
import Community from "./pages/Community";
import CreatePath from "./pages/CreatePath";
import RealWorldData from "./pages/RealWorldData";
import LifeCanvas from "./pages/LifeCanvas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is authenticated in localStorage (for demo mode)
    const localAuth = localStorage.getItem('userAuthenticated');
    
    // Only check authentication if Supabase is configured
    if (!isSupabaseConfigured()) {
      // In demo mode, check localStorage for authentication
      // If no auth status is set, default to false (not authenticated)
      setIsAuthenticated(localAuth === 'true');
      return;
    }

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session) {
        localStorage.setItem('userAuthenticated', 'true');
      } else {
        localStorage.removeItem('userAuthenticated');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        localStorage.setItem('userAuthenticated', 'true');
      } else {
        localStorage.removeItem('userAuthenticated');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } />
          <Route path="/onboarding" element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } />
          <Route path="/simulation" element={
            <ProtectedRoute>
              <Simulation />
            </ProtectedRoute>
          } />
          <Route path="/timeline" element={
            <ProtectedRoute>
              <Timeline />
            </ProtectedRoute>
          } />
          <Route path="/life-canvas" element={
            <ProtectedRoute>
              <LifeCanvas />
            </ProtectedRoute>
          } />
          <Route path="/create-path" element={
            <ProtectedRoute>
              <CreatePath />
            </ProtectedRoute>
          } />
          <Route path="/real-world-data" element={
            <ProtectedRoute>
              <RealWorldData />
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
