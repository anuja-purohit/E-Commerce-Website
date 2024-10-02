import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockBackendService } from 'src/app/services/mock-backend.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private mockBackendService: MockBackendService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.mockBackendService.getProductById(productId).subscribe(product => {
        this.product = product;
      });
    }
  }

  addToCart(): void {
    if (this.product) {
      this.mockBackendService.addToCart(this.product).subscribe({
        next: () => {
          this.router.navigate(['/cart']);
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
        }
      });
    }
  }
}
