package com.contacts.contacts_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.contacts.contacts_app.repository")
public class ContactsAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContactsAppApplication.class, args);
	}

}
