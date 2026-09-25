import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth-service/auth-service';
import { ContactService } from '../../../core/contact-service/contact-service';

@Component({
  imports: [FormsModule],
  selector: 'app-contact-add',
  styleUrl: './contact-add.css',
  templateUrl: './contact-add.html',
})
export class ContactAdd {
  private contactService = inject(ContactService);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = { title: '', message: '', internalMessage: '' };

  submit() {
    const userId = this.auth.currentUser()?.id;

    if (!userId) return;

    this.contactService
      .create({ ...this.form, userId })
      .subscribe(() => this.router.navigate(['/contact']));
  }
}