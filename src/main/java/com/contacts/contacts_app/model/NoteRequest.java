package com.contacts.contacts_app.model;

import lombok.Data;

@Data
public class NoteRequest {
    private String note;
    private Integer contactId;
}