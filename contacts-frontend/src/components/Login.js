import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post("/login", { email, password });

            if (res.data && res.data.id) {
                localStorage.setItem("userId", res.data.id);
                navigate("/dashboard");
            } else {
                alert("Invalid credentials");
            }
        } catch {
            alert("Login failed");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back</h2>

                <input
                    type="email"
                    placeholder="Email"
                    style={styles.input}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button style={styles.button} onClick={handleLogin}>
                    Login
                </button>

                <p style={styles.text}>
                    Don't have an account?{" "}
                    <Link to="/register" style={styles.link}>Register</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e5e7eb, #d1d5db)"
    },

    card: {
        width: "350px",
        padding: "30px",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },

    title: {
        textAlign: "center",
        color: "#111827"
    },

    input: {
        padding: "12px",
        borderRadius: "6px",
        border: "1px solid #d1d5db",
        outline: "none",
        background: "#f9fafb"
    },

    button: {
        padding: "12px",
        background: "#374151",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold"
    },

    text: {
        textAlign: "center",
        color: "#4b5563"
    },

    link: {
        color: "#2563eb",
        textDecoration: "none",
        fontWeight: "600"
    }
};

export default Login;