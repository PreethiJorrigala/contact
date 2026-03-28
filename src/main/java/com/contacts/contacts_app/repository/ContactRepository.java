package com.contacts.contacts_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.contacts.contacts_app.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer> {

    List<Contact> findByUserId(Integer userId);

    List<Contact> findByCategoryId(Integer categoryId);

    Contact findByFirstNameAndLastNameAndUserId(
            String firstName, String lastName, Integer userId);
}