import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductListItemComponent {
  @Input() product: any;

  constructor(private router: Router) {}

  viewDetails(): void {
    this.router.navigate(['/product-details', this.product.id]);
  }
}
