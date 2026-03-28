import React from "react";

function Sidebar({ setView, loadFavorites, isOpen, toggleSidebar }) {

    const handleLogout = () => {
        localStorage.removeItem("userId");
        window.location.href = "/login";
    };

    return (
        <div style={styles.container}>

            {/* ☰ MENU */}
            <div style={styles.top}>
                {isOpen && <span style={styles.title}>ContactVault</span>}

                <button onClick={toggleSidebar} style={styles.menuBtn}>
                    ☰
                </button>
            </div>

            {/* MAIN MENU */}
            <div style={styles.menu}>

                {/* CONTACTS */}
                <div style={styles.item} onClick={() => setView("contacts")}>
                    <span style={styles.icon}>📋</span>
                    {isOpen && <span>Contacts</span>}
                </div>

                {/* ADD */}
                <div style={styles.item} onClick={() => setView("add")}>
                    <span style={styles.icon}>➕</span>
                    {isOpen && <span>Add Contact</span>}
                </div>

                {/* FAVORITES */}
                <div style={styles.item} onClick={loadFavorites}>
                    <span style={styles.icon}>⭐</span>
                    {isOpen && <span>Favorites</span>}
                </div>

                {/* NOTES */}
                <div style={styles.item} onClick={() => setView("notes")}>
                    <span style={styles.icon}>📝</span>
                    {isOpen && <span>Notes</span>}
                </div>

            </div>

            {/* LOGOUT */}
            <div style={styles.bottom}>
                <button onClick={handleLogout} style={styles.logout}>
                    🚪 {isOpen && "Logout"}
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "15px 10px"
    },

    top: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "25px"
    },

    menuBtn: {
        background: "transparent",
        border: "none",
        color: "white",
        fontSize: "20px",
        cursor: "pointer"
    },

    menu: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },

    item: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    icon: {
        fontSize: "18px",
        minWidth: "24px",
        textAlign: "center"
    },

    bottom: {
        marginTop: "auto"
    },

    title: {
        color: "white",
        fontSize: "18px",
        fontWeight: "bold",
        marginRight: "auto" // pushes menu button to the right
    },

    logout: {
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        background: "#ef4444",
        color: "white",
        cursor: "pointer",
        fontWeight: "600"
    }
};

export default Sidebar;