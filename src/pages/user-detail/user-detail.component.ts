import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/user/user.service';
import { LanguageService } from '../../core/i18n/language.service';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { User } from '../../core/user/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private langService = inject(LanguageService);

  userValue = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.userService.getUserById(id)();
  });

  loading = this.userService.loading;
  error = this.userService.error;
  t = (key: string) => this.langService.t(key);
  isEditing = false;

  ngOnInit() {
    this.userService.fetchUsers();
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  onSave(userData: Omit<User, 'id'>) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.updateUser({ ...userData, id });
    this.isEditing = false;
  }
}
