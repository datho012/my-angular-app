import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/user/user.service';
import { LanguageService } from '../../core/i18n/language.service';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { User } from '../../core/user/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, UserCardComponent, UserFormComponent],
  templateUrl: `./user-list.component.html`,
  styleUrls: [`./user-list.component.scss`]
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  private langService = inject(LanguageService);
  private router = inject(Router);

  users = this.userService.users;
  loading = this.userService.loading;
  error = this.userService.error;
  t = this.langService.t;
  lang = this.langService.lang;

  showAddForm = false;

  ngOnInit(): void {
    this.userService.fetchUsers();
  }

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.userService.setSearchTerm(term);
  }

  switchLanguage(lang: 'en' | 'vi') {
    this.langService.setLanguage(lang);
  }

  onView(id: number) {
    this.router.navigate(['/users', id]);
  }

  onEdit(id: number) {
    // For now, just navigate to detail view
    this.router.navigate(['/users', id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id);
    }
  }

  onAddUser(userData: Omit<User, 'id'>) {
    this.userService.addUser(userData);
    this.showAddForm = false;
  }
}
