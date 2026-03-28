package com.contacts.contacts_app.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "contacts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String firstName;
    private String lastName;
    private String email;
    private String dob;

    // private Integer userId;

    private Integer categoryId;

    @Column(name = "is_favorite")
    private Boolean isFavorite = false;

    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<PhoneNumber> phoneNumbers;
    @ManyToOne
    private User user;
}