import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../core/user/user.model';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  @Input() user?: User;
  @Output() save = new EventEmitter<Omit<User, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private langService = inject(LanguageService);
  t = (key: string) => this.langService.t(key);

  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
  });

  ngOnInit() {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.save.emit(this.userForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
