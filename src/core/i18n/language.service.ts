import { Injectable, signal, computed } from '@angular/core';

type Language = 'en' | 'vi';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLangSignal = signal<Language>('en');

  lang = computed(() => this.currentLangSignal());

  private translations = {
    en: {
      users: {
        title: 'User Management',
        search: 'Search users...',
        add: 'Add User',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        actions: 'Actions',
        edit: 'Edit',
        delete: 'Delete',
        view: 'View Details',
      },
      form: {
        save: 'Save',
        cancel: 'Cancel',
        required: 'This field is required',
        invalidEmail: 'Invalid email address',
      },
    },
    vi: {
      users: {
        title: 'Quản lý người dùng',
        search: 'Tìm kiếm người dùng...',
        add: 'Thêm người dùng',
        name: 'Tên',
        email: 'Email',
        phone: 'Số điện thoại',
        actions: 'Thao tác',
        edit: 'Sửa',
        delete: 'Xóa',
        view: 'Xem chi tiết',
      },
      form: {
        save: 'Lưu',
        cancel: 'Hủy',
        required: 'Trường này là bắt buộc',
        invalidEmail: 'Địa chỉ email không hợp lệ',
      },
    },
  };

  // Convert t to a method that returns computed
  t = (key: string) =>
    computed(() => {
      const current = this.currentLangSignal();
      const keys = key.split('.');
      let value: any = this.translations[current];

      for (const k of keys) {
        value = value?.[k];
      }

      return value || key;
    });

  setLanguage(lang: Language) {
    this.currentLangSignal.set(lang);
  }
}
