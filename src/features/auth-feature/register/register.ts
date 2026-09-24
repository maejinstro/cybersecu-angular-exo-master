import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth-service/auth-service';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);

  form = { username: '', email: '', password: '' };
  error = signal('');

  submit() {
    this.auth.register(this.form).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => this.error.set(err.error?.message ?? "Erreur lors de l'inscription"),
    });
  }
}
