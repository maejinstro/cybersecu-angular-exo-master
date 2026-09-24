import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth-service/auth-service';
import { ItemService } from '../../../core/item-service/item-service';

@Component({
  imports: [FormsModule],
  selector: 'app-item-add',
  styleUrl: './item-add.css',
  templateUrl: './item-add.html',
})
export class ItemAdd {
  private itemService = inject(ItemService);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = { title: '', description: '', imageUrl: '' };

  submit() {
    const userId = this.auth.currentUser()?.id;
    this.itemService.create({ ...this.form, userId }).subscribe(() => this.router.navigate(['/item-list']));
  }
}
