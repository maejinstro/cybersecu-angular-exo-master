import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItemService } from '../../../core/item-service/item-service';
import { Item } from '../../../core/models';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-item-list',
  styleUrl: './item-list.css',
  templateUrl: './item-list.html',
})
export class ItemList implements OnInit {
  private itemService = inject(ItemService);

  items = signal<Item[]>([]);

  ngOnInit() {
    this.load();
  }

  load() {
    this.itemService.findAll().subscribe((items) => this.items.set(items));
  }

  remove(id: number) {
    this.itemService.remove(id).subscribe(() => this.load());
  }
}
