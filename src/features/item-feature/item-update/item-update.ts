import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../../../core/item-service/item-service';

@Component({
  imports: [FormsModule],
  selector: 'app-item-update',
  styleUrl: './item-update.css',
  templateUrl: './item-update.html',
})
export class ItemUpdate implements OnInit {
  private itemService = inject(ItemService);
  private router = inject(Router);

  id = input.required<string>();
  form = signal<{ title: string; description: string; imageUrl: string } | null>(null);

  ngOnInit() {
    this.itemService.findOne(+this.id()).subscribe((item) => {
      this.form.set({ title: item.title, description: item.description, imageUrl: item.imageUrl });
    });
  }

  submit() {
    this.itemService
      .update(+this.id(), this.form()!)
      .subscribe(() => this.router.navigate(['/item-details', this.id()]));
  }
}
