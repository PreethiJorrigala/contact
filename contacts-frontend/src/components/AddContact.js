import React, { useState } from "react";
import API from "../services/api";

function AddContact({ userId }) {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        phoneNumbers: [{ phoneNumber: "" }]
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (index, value) => {
        const newPhones = [...form.phoneNumbers];
        newPhones[index].phoneNumber = value;
        setForm({ ...form, phoneNumbers: newPhones });
    };

    const addPhone = () => {
        setForm({
            ...form,
            phoneNumbers: [...form.phoneNumbers, { phoneNumber: "" }]
        });
    };

    const handleSubmit = async () => {
        await API.post("/contacts", {
            ...form,
            user: { id: userId }   // ✅ FIXED
        });

        alert("Contact Added");

        setForm({
            firstName: "",
            lastName: "",
            email: "",
            dob: "",
            phoneNumbers: [{ phoneNumber: "" }]
        });
    };

    return (
        <div style={styles.container}>

            <div style={styles.card}>
                <h2 style={styles.title}>Add New Contact</h2>

                {/* INPUT GRID */}
                <div style={styles.grid}>

                    <input
                        name="firstName"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        name="lastName"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        name="dob"
                        type="date"
                        value={form.dob}
                        onChange={handleChange}
                        style={styles.input}
                    />

                </div>

                {/* 📞 PHONE SECTION */}
                <div style={styles.phoneSection}>
                    <h4>Phone Numbers</h4>

                    {form.phoneNumbers.map((p, i) => (
                        <input
                            key={i}
                            placeholder={`Phone ${i + 1}`}
                            value={p.phoneNumber}
                            onChange={(e) => handlePhoneChange(i, e.target.value)}
                            style={styles.input}
                        />
                    ))}

                    <button onClick={addPhone} style={styles.addPhoneBtn}>
                        + Add Another Phone
                    </button>
                </div>

                {/* SAVE BUTTON */}
                <button onClick={handleSubmit} style={styles.saveBtn}>
                    Save Contact
                </button>
            </div>

        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "#f3f4f6",
        minHeight: "80vh"
    },

    card: {
        width: "100%",
        maxWidth: "600px",
        background: "#ffffff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
    },

    title: {
        marginBottom: "20px",
        color: "#111827"
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "15px",
        marginBottom: "20px"
    },

    input: {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        outline: "none",
        fontSize: "14px"
    },

    phoneSection: {
        marginBottom: "20px"
    },

    addPhoneBtn: {
        marginTop: "10px",
        padding: "8px 12px",
        background: "#e5e7eb",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
    },

    saveBtn: {
        width: "100%",
        padding: "12px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer"
    }
};

export default AddContact;