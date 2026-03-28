package com.contacts.contacts_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.contacts.contacts_app.model.Contact;
import com.contacts.contacts_app.model.PhoneNumber;
import com.contacts.contacts_app.repository.ContactRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/contacts")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    // ✅ GET ALL CONTACTS
    @GetMapping("/{userId}")
    public List<Contact> getContacts(@PathVariable Integer userId) {
        return contactRepository.findByUserId(userId);
    }

    // ✅ GET CONTACTS BY CATEGORY 👇 ADD HERE
    @GetMapping("/category/{categoryId}")
    public List<Contact> getByCategory(@PathVariable Integer categoryId) {
        return contactRepository.findByCategoryId(categoryId);
    }

    // GET FAVORITES
    @GetMapping("/favorites/{userId}")
    public List<Contact> getFavorites(@PathVariable Integer userId) {

        return contactRepository.findByUserId(userId)
                .stream()
                .filter(c -> Boolean.TRUE.equals(c.getIsFavorite()))
                .toList();
    }

    // ✅ ADD CONTACT
    @PostMapping
    public String addContact(@RequestBody Contact contact) {

        // 🔥 Duplicate check (same name)
        Contact existing = contactRepository
                .findByFirstNameAndLastNameAndUserId(
                        contact.getFirstName(),
                        contact.getLastName(),
                        contact.getUser().getId());

        if (existing != null) {
            return "Contact already exists! Choose update or merge.";
        }

        // 🔗 Set contact reference in phone numbers
        if (contact.getPhoneNumbers() != null) {
            for (PhoneNumber pn : contact.getPhoneNumbers()) {
                pn.setContact(contact);
            }
        }

        contactRepository.save(contact);
        return "Contact saved successfully!";
    }

    @PutMapping("/favorite/{id}")
    public String toggleFavorite(@PathVariable Integer id) {

        Contact contact = contactRepository.findById(id).orElse(null);

        if (contact == null) {
            return "Contact not found";
        }
        // ✅ HANDLE NULL SAFELY
        Boolean fav = contact.getIsFavorite();

        if (fav == null) {
            contact.setIsFavorite(true);
        } else {
            contact.setIsFavorite(!fav);
        }

        contactRepository.save(contact);

        return "Favorite updated";
    }

    @PutMapping("/{id}")
    public Contact updateContact(@PathVariable Integer id, @RequestBody Contact updated) {

        Contact contact = contactRepository.findById(id).orElseThrow();

        contact.setFirstName(updated.getFirstName());
        contact.setLastName(updated.getLastName());
        contact.setEmail(updated.getEmail());
        contact.setDob(updated.getDob());

        return contactRepository.save(contact);
    }

    @DeleteMapping("/{id}")
    public String deleteContact(@PathVariable Integer id) {

        contactRepository.deleteById(id);
        return "Contact deleted successfully";
    }
}