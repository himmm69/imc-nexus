import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Old Pages (keep for backward compatibility)
import HomePage from "./pages/HomePage";
import ModulesPage from "./pages/ModulesPage";
import ModuleDetailPage from "./pages/ModuleDetailPage";
import NotesPage from "./pages/NotesPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import PapersPage from "./pages/PapersPage";
import PaperDetailPage from "./pages/PaperDetailPage";
import PracticePage from "./pages/PracticePage";
import StudyGroupsPage from "./pages/StudyGroupsPage";
import NotFound from "./pages/NotFound";

// Profile page
import Profile from "./pages/Profile";

// New Supabase-powered pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadNew from "./pages/UploadNew";
import Topics from "./pages/Topics";
import TopicDetail from "./pages/TopicDetail";
import PastPapers from "./pages/PastPapers";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/topics/:id" element={<TopicDetail />} />
              <Route path="/past-papers" element={<PastPapers />} />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/upload-new"
                element={
                  <ProtectedRoute>
                    <UploadNew />
                  </ProtectedRoute>
                }
              />

              {/* Admin-only routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <Admin />
                  </ProtectedRoute>
                }
              />

              {/* Old routes (backward compatibility) */}
              <Route path="/modules" element={<ModulesPage />} />
              <Route path="/modules/:moduleId" element={<ModuleDetailPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/notes/:noteId" element={<NoteDetailPage />} />
              <Route path="/papers" element={<PapersPage />} />
              <Route path="/papers/:paperId" element={<PaperDetailPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <UploadNew />
                  </ProtectedRoute>
                }
              />
              <Route path="/groups" element={<StudyGroupsPage />} />

              {/* Catch-all 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
