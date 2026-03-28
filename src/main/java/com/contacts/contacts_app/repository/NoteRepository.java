package com.contacts.contacts_app.repository;

import com.contacts.contacts_app.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Integer> {

    List<Note> findByContactId(Integer contactId);

    // ✅ ADD THIS
    List<Note> findByContactUserId(Integer userId);

}