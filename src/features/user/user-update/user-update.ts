import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/user-service/user-service';

@Component({
  imports: [FormsModule],
  selector: 'app-user-update',
  styleUrl: './user-update.css',
  templateUrl: './user-update.html',
})
export class UserUpdate implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  id = input.required<string>();
  form = signal<{ username: string; email: string; password: string } | null>(null);

  ngOnInit() {
    this.userService.findOne(+this.id()).subscribe((user) => {
      this.form.set({ username: user.username, email: user.email, password: user.password });
    });
  }

  submit() {
    this.userService
      .update(+this.id(), this.form()!)
      .subscribe(() => this.router.navigate(['/user-details', this.id()]));
  }
}
