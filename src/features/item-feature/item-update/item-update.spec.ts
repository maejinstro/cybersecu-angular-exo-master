import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemUpdate } from './item-update';

describe('ItemUpdate', () => {
  let component: ItemUpdate;
  let fixture: ComponentFixture<ItemUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemUpdate],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
