import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import API from "../services/api";
import NotesPage from "./NotesPage";

function Dashboard() {
    const [view, setView] = useState("contacts");
    const [favorites, setFavorites] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const userId = localStorage.getItem("userId");

    const loadFavorites = async () => {
        const res = await API.get(`/contacts/favorites/${userId}`);
        setFavorites(res.data);
        setView("favorites");
    };


    return (
        <div style={styles.container}>

            {/* 📂 SIDEBAR */}
            <div style={{
                ...styles.sidebar,
                width: isSidebarOpen ? "220px" : "70px"
            }}>
                <Sidebar
                    setView={setView}
                    loadFavorites={loadFavorites}
                    isOpen={isSidebarOpen}
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    userId={userId}
                />
            </div>

            {/* 📌 MAIN */}
            <div style={styles.main}>



                {/* 📄 CONTENT */}
                <div style={styles.card}>
                    {view === "contacts" && <ContactList userId={userId} />}
                    {view === "add" && <AddContact userId={userId} />}
                    {view === "notes" && <NotesPage userId={userId} />}
                    {typeof view === "object" && view.type === "category" && (
                        <ContactList userId={userId} categoryId={view.id} />
                    )}


                    {view === "favorites" && (
                        <div>
                            <h3 style={styles.sectionTitle}>⭐ Favorites</h3>

                            {favorites.length === 0 ? (
                                <p style={styles.empty}>No favorite contacts</p>
                            ) : (
                                favorites.map(c => (
                                    <div key={c.id} style={styles.contactItem}>
                                        {c.firstName} {c.lastName}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        height: "100vh",
        background: "#f3f4f6"
    },

    sidebar: {
        background: "#1f2937",
        color: "white",
        transition: "0.3s",
        overflow: "hidden"
    },

    main: {
        flex: 1,
        padding: "25px",
        display: "flex",
        flexDirection: "column"
    },

    topbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px"
    },

    actions: {
        display: "flex",
        gap: "15px"
    },

    addBtn: {
        padding: "10px 18px",
        borderRadius: "8px",
        border: "none",
        background: "#2563eb",
        color: "white",
        cursor: "pointer",
        fontWeight: "600"
    },



    card: {
        flex: 1,
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        overflowY: "auto"
    },

    sectionTitle: {
        marginBottom: "10px",
        color: "#374151"
    },

    empty: {
        color: "#6b7280"
    },

    left: {
        flex: 1
    },

    contactItem: {
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "8px",
        background: "#f9fafb",
        border: "1px solid #e5e7eb"
    }
};

export default Dashboard;