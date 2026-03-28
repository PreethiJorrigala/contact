import React, { useEffect, useState, useCallback } from "react";
import API from "../services/api";

function ContactList({ userId }) {
    const [contacts, setContacts] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});

    // ✅ FIX: wrap in useCallback
    const loadContacts = useCallback(async () => {
        const res = await API.get(`/contacts/${userId}`);
        setContacts(res.data);
    }, [userId]);

    // ✅ FIX: use only loadContacts
    useEffect(() => {
        loadContacts();
    }, [loadContacts]);

    const toggleExpand = async (contact) => {
        if (expandedId === contact.id) {
            setExpandedId(null);
        } else {
            setExpandedId(contact.id);
            setEditForm(contact);
            setIsEditing(false);

            const res = await API.get(`/notes/${contact.id}`);
            setNotes(res.data);
        }
    };

    const toggleFavorite = async (id) => {
        await API.put(`/contacts/favorite/${id}`);
        loadContacts();
    };

    const deleteContact = async (id) => {
        await API.delete(`/contacts/${id}`);
        setExpandedId(null);
        loadContacts();
    };

    const addNote = async () => {
        if (!expandedId) return;

        await API.post("/notes", {
            note: newNote,
            contactId: expandedId
        });

        setNewNote("");
        const res = await API.get(`/notes/${expandedId}`);
        setNotes(res.data);
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const updateContact = async () => {
        await API.put(`/contacts/${expandedId}`, editForm);
        setIsEditing(false);
        loadContacts();
    };

    return (
        <div>

            <input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.search}
            />

            <h3 style={styles.title}>Contacts</h3>

            {contacts
                .filter(c =>
                    (c.firstName + " " + c.lastName)
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
                .map(c => (
                    <div key={c.id} style={styles.card}>

                        <div
                            style={styles.header}
                            onClick={() => toggleExpand(c)}
                        >
                            <span style={styles.avatar}>
                                {c.firstName?.[0]}
                            </span>

                            <span style={styles.name}>
                                {c.firstName} {c.lastName}
                            </span>

                            <span>{expandedId === c.id ? "▲" : "▼"}</span>
                        </div>

                        {expandedId === c.id && (
                            <div style={styles.details}>

                                {isEditing ? (
                                    <>
                                        <input
                                            name="firstName"
                                            value={editForm.firstName || ""}
                                            onChange={handleEditChange}
                                            style={styles.input}
                                        />
                                        <input
                                            name="lastName"
                                            value={editForm.lastName || ""}
                                            onChange={handleEditChange}
                                            style={styles.input}
                                        />
                                        <input
                                            name="email"
                                            value={editForm.email || ""}
                                            onChange={handleEditChange}
                                            style={styles.input}
                                        />

                                        <button onClick={updateContact}>Save</button>
                                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <p>Email: {c.email}</p>

                                        {c.phoneNumbers?.map((p, i) => (
                                            <p key={i}>📞 {p.phoneNumber}</p>
                                        ))}

                                        <div style={styles.actions}>
                                            <button onClick={() => toggleFavorite(c.id)}>
                                                {c.isFavorite ? "⭐" : "☆"}
                                            </button>

                                            <button onClick={() => deleteContact(c.id)}>
                                                🗑
                                            </button>

                                            <button onClick={() => setIsEditing(true)}>
                                                ✏️
                                            </button>
                                        </div>

                                        <h4>Notes</h4>

                                        {notes.map((n, i) => (
                                            <p key={i}>{n.note}</p>
                                        ))}

                                        <input
                                            placeholder="Add note"
                                            value={newNote}
                                            onChange={(e) => setNewNote(e.target.value)}
                                            style={styles.input}
                                        />

                                        <button onClick={addNote}>Add Note</button>
                                    </>
                                )}

                            </div>
                        )}

                    </div>
                ))}
        </div>
    );
}

const styles = {
    search: {
        padding: "10px",
        width: "100%",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc"
    },
    title: { marginBottom: "10px" },
    card: {
        background: "#fff",
        borderRadius: "10px",
        padding: "12px",
        marginBottom: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
    },
    header: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer"
    },
    avatar: {
        background: "#2563eb",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "50%",
        marginRight: "10px"
    },
    name: {
        flex: 1,
        fontWeight: "600"
    },
    details: {
        marginTop: "10px",
        padding: "10px",
        background: "#f9fafb",
        borderRadius: "8px"
    },
    actions: {
        display: "flex",
        gap: "10px",
        margin: "10px 0"
    },
    input: {
        display: "block",
        margin: "5px 0",
        padding: "8px",
        width: "100%",
        borderRadius: "6px",
        border: "1px solid #ccc"
    }
};

export default ContactList;