import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import LandingPage from "./pages/LandingPage";
import MyComponent from "./MyComponent";
import AddEntity from "./pages/AddEntity";
import UpdateEntity from "./pages/UpdateEntity";
import EntityList from "./pages/EntityList"; 
import Login from "./pages/Login";
import MysteryPetGenerator from "./pages/MysteryPetGenerator";
import { AuthContext } from "./context/authContext";
import "./pages/LandingCss.css";

// Import new pages for the required features
import PetQuiz from "./pages/PetQuiz";
import PetGallery from "./pages/PetGallery";
import VirtualPet from "./pages/VirtualPet";
import ARMode from "./pages/ARMode";
import Leaderboard from "./pages/Leaderboard";
import Adoption from "./pages/Adoption";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// Import marketplace pages
import PetMarketplace from "./pages/PetMarketplace";
import PetListing from "./pages/PetListing";
import PetDetails from "./pages/PetDetails";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";

function NotFound() {
  return <h2 style={{ textAlign: "center", color: "red" }}>404 - Page Not Found</h2>;
}

// Auto Login Component for Testing
function AutoLogin() {
  const { login, user } = useContext(AuthContext);
  
  useEffect(() => {
    // Only attempt login if not already logged in
    if (!user) {
      console.log("AutoLogin: Attempting to log in with test user");
      login("testuser").then(() => {
        console.log("AutoLogin: Login successful");
      }).catch(error => {
        console.error("AutoLogin: Login failed", error);
      });
    } else {
      console.log("AutoLogin: User already logged in", user);
    }
  }, [login, user]);
  
  return null; // This component doesn't render anything
}

function App() {
  // Global state for selected user (if needed across components)
  const [selectedUser, setSelectedUser] = useState("");
  const { user, loading } = useContext(AuthContext);

  function ProtectedRoute({ children }) {
    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;
    return children;
  }

  return (
      <Router>
        <div>
          {/* Auto Login Component - Disabled to allow manual login after logout */}
          {/* <AutoLogin /> */}
          
          {/* Application Routes */}
          <Routes>
            {/* Default to Login first */}
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<LandingPage selectedUser={selectedUser} setSelectedUser={setSelectedUser} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mystery-pet" element={<MysteryPetGenerator />} />
            <Route path="/entities" element={<ProtectedRoute><EntityList /></ProtectedRoute>} />
            <Route path="/entities/:userId" element={<ProtectedRoute><EntityList /></ProtectedRoute>} /> {/* Filtered list */}
            <Route path="/add-entity" element={<ProtectedRoute><AddEntity /></ProtectedRoute>} />
            <Route path="/update-entity/:id" element={<ProtectedRoute><UpdateEntity /></ProtectedRoute>} />
            
            {/* New feature routes */}
            <Route path="/pet-quiz" element={<ProtectedRoute><PetQuiz /></ProtectedRoute>} />
            <Route path="/pet-gallery" element={<ProtectedRoute><PetGallery /></ProtectedRoute>} />
            <Route path="/virtual-pet" element={<ProtectedRoute><VirtualPet /></ProtectedRoute>} />
            <Route path="/ar-mode" element={<ProtectedRoute><ARMode /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
            <Route path="/adoption" element={<ProtectedRoute><Adoption /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Marketplace routes */}
            <Route path="/marketplace" element={<ProtectedRoute><PetMarketplace /></ProtectedRoute>} />
            <Route path="/pet-listing" element={<ProtectedRoute><PetListing /></ProtectedRoute>} />
            <Route path="/pet-details/:id" element={<ProtectedRoute><PetDetails /></ProtectedRoute>} />
            <Route path="/seller-dashboard" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
            <Route path="/buyer-dashboard" element={<ProtectedRoute><BuyerDashboard /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} /> {/* 404 Page */}
          </Routes>

          {/* Additional Component (removed from root to show login first) */}
        </div>
      </Router>
  );
}

export default App;
