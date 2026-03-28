package com.contacts.contacts_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.contacts.contacts_app.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}