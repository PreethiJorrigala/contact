import React from "react";
import { Link } from "react-router-dom";
import heroBg from "../assets/hero-bg.jpg";

function Home() {
    return (
        <div style={styles.container}>

            {/* 🔝 NAVBAR */}
            <div style={styles.navbar}>
                <h2 style={styles.logo}>📇 ContactVault</h2>

                <div style={styles.navLinks}>
                    <Link to="/login" style={styles.link}>Login</Link>
                    <Link to="/register" style={styles.signup}>Sign Up</Link>
                </div>
            </div>

            {/* 🌄 HERO SECTION */}
            <div
                style={{
                    ...styles.hero,
                    backgroundImage: `url(${heroBg})`
                }}
            >

                {/* DARK OVERLAY */}
                <div style={styles.overlay}></div>

                {/* CONTENT */}
                <div style={styles.content}>
                    <h1 style={styles.heading}>
                        Smart Contact <br /> Management
                    </h1>

                    <p style={styles.subText}>
                        Organize, manage and access your contacts anywhere.
                    </p>

                    <div style={styles.inputBox}>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            style={styles.input}
                        />
                        <button style={styles.button}>Get Started</button>
                    </div>

                    <p style={styles.smallText}>
                        ✓ Free to use &nbsp;&nbsp; ✓ No credit card required
                    </p>
                </div>

            </div>
        </div>
    );
}

const styles = {
    container: {
        width: "100%",
        height: "100vh",
    },


    /* 🔝 NAVBAR */
    navbar: {
        position: "absolute",   // ✅ sit on image
        top: 0,
        left: 0,
        width: "100%",          // ✅ full width
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 50px",
        alignItems: "center",
        zIndex: 2
    },

    logo: {
        color: "white",
        fontWeight: "bold",
        fontSize: "22px"
    },

    navLinks: {
        display: "flex",
        gap: "20px",
        alignItems: "center"
    },

    link: {
        textDecoration: "none",
        color: "white",
        fontWeight: "500"
    },

    signup: {
        textDecoration: "none",
        padding: "10px 20px",
        borderRadius: "25px",
        background: "linear-gradient(135deg, #0ea5e9, #2563eb)",
        color: "#fff",
        fontWeight: "600",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
    },

    /* 🌄 HERO */
    hero: {
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center right", // 👈 keeps image person visible
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        padding: "0 60px",
        position: "relative"
    },

    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.55)"
    },

    content: {
        position: "relative",
        zIndex: 1,
        maxWidth: "550px",
        color: "white",
        marginTop: "40px"
    },

    heading: {
        fontSize: "clamp(28px, 5vw, 52px)",
        fontWeight: "700",
        lineHeight: "1.2"
    },

    subText: {
        fontSize: "clamp(14px, 2vw, 18px)",
        marginTop: "15px",
        color: "#e5e7eb"
    },

    inputBox: {
        marginTop: "25px",
        display: "flex",
        flexWrap: "wrap"
    },

    input: {
        padding: "12px",
        flex: "1",
        minWidth: "200px",
        border: "none",
        borderRadius: "6px 0 0 6px",
        outline: "none"
    },

    button: {
        padding: "12px 20px",
        background: "#0ea5e9",
        color: "white",
        border: "none",
        borderRadius: "0 6px 6px 0",
        cursor: "pointer",
        fontWeight: "bold"
    },

    smallText: {
        marginTop: "15px",
        fontSize: "14px",
        color: "#d1d5db"
    }
};

export default Home;