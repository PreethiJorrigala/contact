import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            await API.post("/register", form);
            alert("Registered Successfully!");
            navigate("/login");
        } catch {
            alert("Error registering");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create Account</h2>

                <input
                    name="name"
                    placeholder="Name"
                    style={styles.input}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    style={styles.input}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    style={styles.input}
                    onChange={handleChange}
                />

                <button style={styles.button} onClick={handleRegister}>
                    Register
                </button>

                <p style={styles.text}>
                    Already have an account?{" "}
                    <Link to="/login" style={styles.link}>Login</Link>
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
        background: "#f9fafb",
        outline: "none"
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

export default Register;