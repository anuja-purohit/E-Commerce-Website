import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockBackendService } from 'src/app/services/mock-backend.service';
import { CartItem } from 'src/app/models/cart-item.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  grandTotal: number = 0;
  discount: number = 0;
  promoCode: string = '';

  constructor(private mockBackendService: MockBackendService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.mockBackendService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateGrandTotal();
    });
  }

  calculateGrandTotal(): void {
    this.grandTotal = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeFromCart(cartItemId: string): void {
    this.mockBackendService.removeFromCart(cartItemId).subscribe(() => {
      this.loadCartItems();
    });
  }

  updateQuantity(cartItem: CartItem, quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(cartItem.id);
    } else if (quantity !== cartItem.quantity) {
      cartItem.quantity = quantity;
      this.mockBackendService.updateCartItem(cartItem).subscribe(() => {
        this.calculateGrandTotal();
      });
    }
  }

  applyPromoCode(): void {
    this.discount = 0;
    this.calculateGrandTotal();
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }

  navigateToProductListing(): void {
    this.router.navigate(['/product-listing']);
  }
}