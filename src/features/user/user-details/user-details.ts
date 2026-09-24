import { Component, OnInit, inject, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/user-service/user-service';
import { User } from '../../../core/models';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-user-details',
  styleUrl: './user-details.css',
  templateUrl: './user-details.html',
})
export class UserDetails implements OnInit {
  private userService = inject(UserService);

  id = input.required<string>();
  user = signal<User | null>(null);

  ngOnInit() {
    this.userService.findOne(+this.id()).subscribe((user) => this.user.set(user));
  }
}
