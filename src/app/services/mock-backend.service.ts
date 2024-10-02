import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of } from 'rxjs';
import { map, switchMap, catchError} from 'rxjs/operators';
import { CartItem } from 'src/app/models/cart-item.model';
import { Product } from '../models/product.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {
  private baseUrl = 'http://localhost:3000';
  private usersUrl = `${this.baseUrl}/users`;
  private productsUrl = `${this.baseUrl}/products`;
  private cartUrl = `${this.baseUrl}/cart`;

  constructor(private http: HttpClient) {}

  isUsernameTaken(username: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.usersUrl}?username=${username}`)
      .pipe(map(users => users.length > 0));
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

  validateUser(username: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.usersUrl}?username=${username}`).pipe(
      map(users => {
        const user = users.find(user => user.password === password);
        return user || null; 
      }),
      catchError((error) => {
        console.error('Validation error:', error);
        return of(null);
      })
    );
  }
  
  
  

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.cartUrl);
  }

  addToCart(product: Product): Observable<void> {
    return this.getCartItems().pipe(
      switchMap((cartItems: CartItem[]) => {
        const existingItem = cartItems.find((item: CartItem) => item.productId === product.id);
        if (existingItem) {
          existingItem.quantity += 1;
          return this.updateCartItem(existingItem);
        } else {
          const newItem: CartItem = {
            id: this.generateId(),
            productId: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            image: product.image
          };
          return this.http.post<void>(this.cartUrl, newItem);
        }
      })
    );
  }

  removeFromCart(cartItemId: string): Observable<void> {
    return this.http.delete<void>(`${this.cartUrl}/${cartItemId}`).pipe(
      catchError((error) => {
        console.error('Error removing from cart', error);
        return of(void 0);  // Return an empty observable
      })
    );
  }
  updateCartItem(cartItem: CartItem): Observable<void> {
    return this.http.put<void>(`${this.cartUrl}/${cartItem.id}`, cartItem);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 11);
  }
}
