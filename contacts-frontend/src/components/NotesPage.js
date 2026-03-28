import React, { useEffect, useState } from "react";
import API from "../services/api";

function NotesPage({ userId }) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        loadNotes();
    }, [loadNotes]);

    const loadNotes = async () => {
        try {
            const res = await API.get(`/notes/user/${userId}`);
            setNotes(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h3 style={styles.title}>📝 All Notes</h3>

            {notes.length === 0 ? (
                <p style={styles.empty}>No notes available</p>
            ) : (
                notes.map((n, i) => (
                    <div key={i} style={styles.card}>
                        <h4 style={styles.name}>
                            {n.contact?.firstName} {n.contact?.lastName}
                        </h4>

                        <p style={styles.noteText}>{n.note}</p>
                    </div>
                ))
            )}
        </div>
    );
}

const styles = {
    title: {
        marginBottom: "15px",
        color: "#374151"
    },

    card: {
        background: "#f9fafb",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "10px",
        border: "1px solid #e5e7eb"
    },

    name: {
        marginBottom: "5px",
        color: "#111827"
    },

    noteText: {
        color: "#4b5563"
    },

    empty: {
        color: "#6b7280"
    }
};

export default NotesPage;