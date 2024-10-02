import { Component, OnInit } from '@angular/core';
import { MockBackendService } from 'src/app/services/mock-backend.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductListItemComponent } from '../product-list-item/product-list-item.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProductListItemComponent,RouterModule]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private mockBackendService: MockBackendService) {}

  ngOnInit(): void {
    this.mockBackendService.getProducts().subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }
}
