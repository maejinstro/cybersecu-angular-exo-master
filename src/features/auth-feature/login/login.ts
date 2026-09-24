import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth-service/auth-service';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  form = { email: '', password: '' };
  error = signal('');

  submit() {
    this.auth.login(this.form).subscribe({
      next: () => this.router.navigate(['/item-list']),
      error: (err) => this.error.set(err.error?.message ?? 'Erreur de connexion'),
    });
  }
}
