import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LanguageService } from '../core/i18n/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: `./app.component.html`,
  styleUrls: [`./app.component.scss`],
})
export class AppComponent {
  private langService = inject(LanguageService);
  
  lang = this.langService.lang;

  switchLanguage(lang: 'en' | 'vi') {
    this.langService.setLanguage(lang);
  }
}
