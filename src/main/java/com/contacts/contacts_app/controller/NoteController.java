package com.contacts.contacts_app.controller;

import com.contacts.contacts_app.model.*;
import com.contacts.contacts_app.repository.*;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
// @CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*")
public class NoteController {

    private final NoteRepository noteRepo;
    private final ContactRepository contactRepo;

    public NoteController(NoteRepository noteRepo, ContactRepository contactRepo) {
        this.noteRepo = noteRepo;
        this.contactRepo = contactRepo;
    }

    // ✅ GET notes by contact
    @GetMapping("/{contactId}")
    public List<Note> getNotes(@PathVariable Integer contactId) {
        return noteRepo.findByContactId(contactId);
    }

    // ✅ GET notes by user
    @GetMapping("/user/{userId}")
    public List<Note> getNotesByUser(@PathVariable Integer userId) {
        return noteRepo.findByContactUserId(userId);
    }

    // ✅ ADD note
    @PostMapping
    public Note addNote(@RequestBody NoteRequest req) {

        Contact contact = contactRepo.findById(req.getContactId()).orElseThrow();

        Note note = new Note();
        note.setNote(req.getNote());
        note.setContact(contact);

        return noteRepo.save(note);
    }
}