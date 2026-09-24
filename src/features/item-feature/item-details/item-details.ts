import { Component, OnInit, inject, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ItemService } from '../../../core/item-service/item-service';
import { Item } from '../../../core/models';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-item-details',
  styleUrl: './item-details.css',
  templateUrl: './item-details.html',
})
export class ItemDetails implements OnInit {
  private itemService = inject(ItemService);
  private router = inject(Router);

  id = input.required<string>();
  item = signal<Item | null>(null);

  ngOnInit() {
    this.itemService.findOne(+this.id()).subscribe((item) => this.item.set(item));
  }

  remove() {
    this.itemService.remove(+this.id()).subscribe(() => this.router.navigate(['/item-list']));
  }
}
