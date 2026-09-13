


// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from "./authSlice";

// Pages & Components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import PracticePage from "./pages/PracticePage"; // Import your Practice Page here
import ProblemPage from "./pages/ProblemPage";
import AdminPanel from "./components/AdminPanel";
import Admin from "./pages/Admin";
import AdminVideo from "./components/AdminVideo";
import AdminDelete from "./components/AdminDelete";
import AdminUpload from "./components/AdminUpload";

// Protected Route Component
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Admin Route Component
const AdminRoute = ({ isAuthenticated, user, children }) => {
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public / Auth Routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
      <Route path="/problem/:problemId" element={<ProblemPage />} />

      {/* Protected User Routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Homepage />
          </ProtectedRoute>
        } 
      />

      {/* NEW: Practice Route */}
      <Route 
        path="/practice" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <PracticePage />
          </ProtectedRoute>
        } 
      />

      {/* Protected Admin Routes */}
      <Route 
        path="/admin" 
        element={
          <AdminRoute isAuthenticated={isAuthenticated} user={user}>
            <Admin />
          </AdminRoute>
        } 
      />
      <Route 
        path="/admin/create" 
        element={
          <AdminRoute isAuthenticated={isAuthenticated} user={user}>
            <AdminPanel />
          </AdminRoute>
        } 
      />
      <Route 
        path="/admin/delete" 
        element={
          <AdminRoute isAuthenticated={isAuthenticated} user={user}>
            <AdminDelete />
          </AdminRoute>
        } 
      />
      <Route 
        path="/admin/video" 
        element={
          <AdminRoute isAuthenticated={isAuthenticated} user={user}>
            <AdminVideo />
          </AdminRoute>
        } 
      />
      <Route 
        path="/admin/upload/:problemId" 
        element={
          <AdminRoute isAuthenticated={isAuthenticated} user={user}>
            <AdminUpload />
          </AdminRoute>
        } 
      />
    </Routes>
  );
}

export default App;

