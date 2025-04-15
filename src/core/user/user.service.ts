import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal, computed } from '@angular/core';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSignal = signal<User[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
  private searchTermSignal = signal<string>('');
  private API_URL = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  // Computed Signals
  users = computed(() => {
    const searchTerm = this.searchTermSignal().toLowerCase();
    return this.usersSignal().filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
  });
  loading = computed(() => this.loadingSignal());
  error = computed(() => this.errorSignal());

  // Actions
  setSearchTerm(term: string) {
    this.searchTermSignal.set(term);
  }

  fetchUsers(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<User[]>(this.API_URL).subscribe({
      next: (users) => {
        this.usersSignal.set(users);
        this.loadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set(error.message);
        this.loadingSignal.set(false);
      },
    });
  }

  getUserById(id: number) {
    return computed(() => this.usersSignal().find((user) => user.id === id));
  }

  addUser(user: Omit<User, 'id'>) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.post<User>(this.API_URL, user).subscribe({
      next: (newUser) => {
        this.usersSignal.update((users) => [...users, newUser]);
        this.loadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set(error.message);
        this.loadingSignal.set(false);
      },
    });
  }

  updateUser(user: User) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.put<User>(`${this.API_URL}/${user.id}`, user).subscribe({
      next: (updatedUser) => {
        this.usersSignal.update((users) =>
          users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
        this.loadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set(error.message);
        this.loadingSignal.set(false);
      },
    });
  }

  deleteUser(id: number) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.delete(`${this.API_URL}/${id}`).subscribe({
      next: () => {
        this.usersSignal.update((users) => users.filter((u) => u.id !== id));
        this.loadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set(error.message);
        this.loadingSignal.set(false);
      },
    });
  }
}
