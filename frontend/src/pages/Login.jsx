import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/authContext";

function Login() {
    const { login, signup } = useContext(AuthContext);
    const navigate = useNavigate();
    const [mode, setMode] = useState("login");
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            if (mode === "login") {
                const res = await login(form.email, form.password);
                if (!res.success) setError(res.error || "Login failed");
                else navigate("/adoption", { replace: true });
            } else {
                const payload = {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    phone: form.phone,
                    address: {
                        line1: form.line1,
                        city: form.city,
                        state: form.state,
                        zip: form.zip
                    }
                };
                const res = await signup(payload.name, payload.email, payload.password, payload);
                if (!res.success) setError(res.error || "Signup failed");
                else navigate("/adoption", { replace: true });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const pawPrints = [
        { x: "10%", y: "20%", delay: 0, rotate: 15 },
        { x: "25%", y: "35%", delay: 0.2, rotate: -10 },
        { x: "15%", y: "65%", delay: 0.5, rotate: 20 },
        { x: "85%", y: "15%", delay: 0.3, rotate: -15 },
        { x: "75%", y: "45%", delay: 0.7, rotate: 10 },
        { x: "80%", y: "75%", delay: 0.1, rotate: -5 }
    ];

    return (
        <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", background: "radial-gradient(1200px 600px at 10% -10%, #fce4ec, transparent), radial-gradient(1000px 500px at 110% 10%, #ede7f6, transparent), linear-gradient(180deg, #ffffff, #fff8fb)" }}>
            
            {/* Paw Print Decorations */}
            {pawPrints.map((paw, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                        opacity: [0, 1, 0], 
                        scale: [0, 1, 0.8] 
                    }}
                    transition={{ 
                        duration: 4,
                        delay: paw.delay,
                        repeat: Infinity,
                        repeatDelay: 3
                    }}
                    style={{
                        position: "absolute",
                        left: paw.x,
                        top: paw.y,
                        transform: `rotate(${paw.rotate}deg)`,
                        zIndex: 0
                    }}
                >
                    <div style={{ fontSize: "2.5rem", color: "rgba(255, 255, 255, 0.3)" }}>
                        🐾
                    </div>
                </motion.div>
            ))}
            
            {/* Ambient floating paws */}
            {Array.from({ length: 10 }).map((_, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: [0.2, 0.6, 0.2], y: [0, -20, 0] }} transition={{ duration: 6 + i, repeat: Infinity }} style={{ position: "absolute", left: `${(i*9)%100}%`, top: `${(i*13)%100}%`, fontSize: "24px", color: "#f48fb1" }}>🐾</motion.div>
            ))}
            
            {/* Login Form */}
            <div style={{ 
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "calc(100vh - 100px)",
                zIndex: 1
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "20px",
                        padding: "28px",
                        width: "90%",
                        maxWidth: "440px",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                        textAlign: "center"
                    }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 260, 
                            damping: 20,
                            delay: 0.2
                        }}
                        style={{ 
                            margin: "0 auto 18px",
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #ff7ab6, #b388ff)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "3rem"
                        }}
                    >
                        🐶
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={{ 
                            color: "#6a1b9a",
                            marginBottom: "30px",
                            fontSize: "2rem"
                        }}
                    >
                        {mode === "login" ? "Welcome Back!" : "Create your account"}
                    </motion.h1>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '8px', background: '#fce4ec', borderRadius: '999px', padding: '6px', marginBottom: '16px' }}>
                        <button onClick={() => setMode('login')} style={{ flex: 1, border: 'none', borderRadius: '999px', padding: '10px 14px', fontWeight: 700, background: mode==='login' ? '#fff' : 'transparent', color: '#6a1b9a', cursor: 'pointer' }}>Login</button>
                        <button onClick={() => setMode('signup')} style={{ flex: 1, border: 'none', borderRadius: '999px', padding: '10px 14px', fontWeight: 700, background: mode==='signup' ? '#fff' : 'transparent', color: '#6a1b9a', cursor: 'pointer' }}>Sign up</button>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {mode === 'signup' && (
                                <>
                                <motion.div key="name" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} style={{ marginBottom: "12px" }}>
                                    <div style={{ width: '100%', borderRadius: '14px', border: '2px solid #f3e5f5', background: '#fff', overflow: 'hidden' }}>
                                        <input type="text" placeholder="Full name" value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} required style={{ width: '100%', padding: '14px 18px', border: 'none', outline: 'none', boxSizing: 'border-box' }} />
                                    </div>
                                </motion.div>
                                <motion.div key="phone" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} style={{ marginBottom: "12px" }}>
                                    <div style={{ width: '100%', borderRadius: '14px', border: '2px solid #f3e5f5', background: '#fff', overflow: 'hidden' }}>
                                        <input type="tel" placeholder="Phone number" value={form.phone || ''} onChange={(e)=>setForm({ ...form, phone: e.target.value })} style={{ width: '100%', padding: '14px 18px', border: 'none', outline: 'none', boxSizing: 'border-box' }} />
                                    </div>
                                </motion.div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                                    <div style={{ width: '100%', borderRadius: '14px', border: '2px solid #f3e5f5', background: '#fff', overflow: 'hidden' }}>
                                        <input type="text" placeholder="City" value={form.city || ''} onChange={(e)=>setForm({ ...form, city: e.target.value })} style={{ width: '100%', padding: '14px 18px', border: 'none', outline: 'none', boxSizing: 'border-box' }} />
                                    </div>
                                    <div style={{ width: '100%', borderRadius: '14px', border: '2px solid #f3e5f5', background: '#fff', overflow: 'hidden' }}>
                                        <input type="text" placeholder="State" value={form.state || ''} onChange={(e)=>setForm({ ...form, state: e.target.value })} style={{ width: '100%', padding: '14px 18px', border: 'none', outline: 'none', boxSizing: 'border-box' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px', marginBottom: '12px' }}>
                                    <div style={{ width: '100%', borderRadius: '14px', border: '2px solid #f3e5f5', background: '#fff', overflow: 'hidden' }}>
                                        <input type="text" placeholder="Address line" value={form.line1 || ''} onChange={(e)=>setForm({ ...form, line1: e.target.value })} style={{ width: '100%', padding: '14px 18px', border: 'none', outline: 'none', boxSizing: 'border-box' }} />
                                    </div>
                                    <div style={{ width: '100%', borderRadius: '14px', border: '2px solid #f3e5f5', background: '#fff', overflow: 'hidden' }}>
                                        <input type="text" placeholder="ZIP" value={form.zip || ''} onChange={(e)=>setForm({ ...form, zip: e.target.value })} style={{ width: '100%', padding: '14px 18px', border: 'none', outline: 'none', boxSizing: 'border-box' }} />
                                    </div>
                                </div>
                                </>
                            )}
                        </AnimatePresence>
                        <div style={{ marginBottom: "12px" }}>
                            <div style={{ width: '100%', borderRadius: '14px', border: '2px solid #f3e5f5', background: '#fff', overflow: 'hidden' }}>
                                <input type="email" placeholder="Email address" value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} required style={{ width: '100%', padding: '14px 18px', border: 'none', outline: 'none', boxSizing: 'border-box' }} />
                            </div>
                        </div>
                        <div style={{ marginBottom: "16px" }}>
                            <div style={{ width: '100%', borderRadius: '14px', border: '2px solid #f3e5f5', background: '#fff', overflow: 'hidden' }}>
                                <input type="password" placeholder="Password" value={form.password} onChange={(e)=>setForm({ ...form, password: e.target.value })} required style={{ width: '100%', padding: '14px 18px', border: 'none', outline: 'none', boxSizing: 'border-box' }} />
                            </div>
                        </div>

                        {error && (
                            <div style={{ color: '#d32f2f', marginBottom: '8px', fontSize: '0.9rem' }}>{error}</div>
                        )}
                        
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isLoading}
                            style={{
                                width: "100%",
                                padding: "14px 18px",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: "white",
                                background: "linear-gradient(135deg, #ff7ab6, #b388ff)",
                                border: "none",
                                borderRadius: "30px",
                                cursor: "pointer",
                                boxShadow: "0 4px 10px rgba(179, 136, 255, 0.4)",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            {isLoading ? (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                            border: "3px solid rgba(255, 255, 255, 0.3)",
                                            borderTopColor: "white",
                                            marginRight: "10px"
                                        }}
                                    />
                            {mode === 'login' ? 'Logging in...' : 'Creating account...'}
                                </div>
                            ) : (
                                mode === 'login' ? 'Login' : 'Create Account'
                            )}
                        </motion.button>
                    </form>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        style={{ 
                            marginTop: "16px",
                            color: "#666",
                            fontSize: "0.9rem"
                        }}
                    >
                        {mode === 'login' ? (
                            <>
                                Don&apos;t have an account? {" "}
                                <button onClick={()=>setMode('signup')} style={{ background: 'none', border: 'none', color: '#6a1b9a', fontWeight: 700, cursor: 'pointer' }}>Sign up</button>
                            </>
                        ) : (
                            <>
                                Already have an account? {" "}
                                <button onClick={()=>setMode('login')} style={{ background: 'none', border: 'none', color: '#6a1b9a', fontWeight: 700, cursor: 'pointer' }}>Login</button>
                            </>
                        )}
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}

export default Login;