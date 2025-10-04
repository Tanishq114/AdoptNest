import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Create the auth context
export const AuthContext = createContext();

// Create the auth provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("auth_token") || null);
    const [loading, setLoading] = useState(true);

    // Configure axios auth header when token changes
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("auth_token", token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("auth_token");
        }
    }, [token]);

    // Check current user on load if token exists
    useEffect(() => {
        const checkCurrentUser = async () => {
            try {
                if (!token) {
                    setLoading(false);
                    return;
                }
                const response = await axios.get("http://localhost:5000/api/auth/me");
                if (response.data?.user) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Credentials login
    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            if (response.data?.token) {
                setToken(response.data.token);
                setUser(response.data.user);
                return { success: true };
            }
            return { success: false, error: "Invalid response" };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || error.message };
        }
    };

    // Signup
    const signup = async (name, email, password, extra = {}) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", { name, email, password, phone: extra.phone, address: extra.address });
            if (response.data?.token) {
                setToken(response.data.token);
                setUser(response.data.user);
                return { success: true };
            }
            return { success: false, error: "Invalid response" };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || error.message };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        return true;
    };

    const value = { user, token, loading, login, signup, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// PropTypes validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthProvider;