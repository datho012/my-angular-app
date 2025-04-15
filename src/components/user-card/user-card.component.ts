import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../core/user/user.model';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input({ required: true }) user!: User;
  @Output() view = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  private langService = inject(LanguageService);
  t = (key: string) => this.langService.t(key);

  onView() {
    this.view.emit(this.user.id);
  }

  onEdit() {
    this.edit.emit(this.user.id);
  }

  onDelete() {
    this.delete.emit(this.user.id);
  }
}
