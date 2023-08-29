import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ErrorsApiService {

  constructor(private messageService: MessageService){}

  public showErrorMessage(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
}
