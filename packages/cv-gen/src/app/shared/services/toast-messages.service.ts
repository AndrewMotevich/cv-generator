import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastMessageService {
  constructor(
    private messageService: MessageService,
    private translateService: TranslateService
  ) {}

  public showErrorMessage(message: string) {
    const summary = this.translateService.instant('MESSAGES.ERROR');
    const translatedMessage = this.translateService.instant(message);
    this.messageService.add({
      severity: 'error',
      summary,
      detail: translatedMessage,
    });
  }

  public showSuccessMessage(message: string) {
    const summary = this.translateService.instant('MESSAGES.SUCCESS');
    const translatedMessage = this.translateService.instant(message);
    this.messageService.add({
      severity: 'success',
      summary,
      detail: translatedMessage,
    });
  }

  public showWarningMessage(message: string) {
    const summary = this.translateService.instant('MESSAGES.WARNING');
    const translatedMessage = this.translateService.instant(message);
    this.messageService.add({
      severity: 'warn',
      summary,
      detail: translatedMessage,
    });
  }

  public showInfoMessage(message: string) {
    const summary = this.translateService.instant('MESSAGES.INFO');
    const translatedMessage = this.translateService.instant(message);
    this.messageService.add({
      severity: 'info',
      summary,
      detail: translatedMessage,
    });
  }
}
