import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../../core/contact-service/contact-service';
import { Contact } from '../contact.model';
import { AuthService } from '../../../core/auth-service/auth-service';
import { ContactAdd } from '../contact-add/contact-add';

@Component({
  imports: [DatePipe, FormsModule, ContactAdd],
  selector: 'app-contact-list',
  styleUrl: './contact-list.css',
  templateUrl: './contact-list.html',
})
export class ContactList implements OnInit {
  private contactService = inject(ContactService);

  contacts = signal<Contact[]>([]);
  auth = inject(AuthService);

  isAdmin = this.auth.isAdmin;
  showAddForm = signal(false);

  ngOnInit() {
    this.load();
  }

  load() {
    const userId = this.auth.currentUser()?.id;

    this.contactService.findAll().subscribe((contacts) => {
      if (this.isAdmin()) {
        this.contacts.set(contacts);
      } else {
        this.contacts.set(
          contacts.filter((contact) => contact.userId === userId)
        );
      }
    });
  }

  validate(contact: Contact) {
    this.contactService
      .update(contact.id, contact.internalMessage)
      .subscribe(() => this.load());
  }

  toggleAddForm() {
    this.showAddForm.set(!this.showAddForm());
  }

  contactCreated() {
    this.showAddForm.set(false);
    this.load();
  }
}