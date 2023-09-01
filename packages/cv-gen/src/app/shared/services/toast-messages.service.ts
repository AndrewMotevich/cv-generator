import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastMessageService {

  constructor(private messageService: MessageService){}

  public showErrorMessage(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  public showSuccessMessage(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  public showWarningMessage(message: string) {
    this.messageService.add({ severity: 'warning', summary: 'Warning', detail: message });
  }
}
