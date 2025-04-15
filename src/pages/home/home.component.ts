import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../core/user/user.service';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./home.component.html`,
  styleUrls: [`./home.component.scss`],
})
export class HomeComponent {
  private userService = inject(UserService);
  private langService = inject(LanguageService);
  private router = inject(Router);

  users = this.userService.users;
  t = this.langService.t;
  lang = this.langService.lang;

  ngOnInit() {
    this.userService.fetchUsers();
  }

  switchLanguage(lang: 'en' | 'vi') {
    this.langService.setLanguage(lang);
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }
}
