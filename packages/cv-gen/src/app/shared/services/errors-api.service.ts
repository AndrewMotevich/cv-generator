import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorsApiService {

  public showErrorMessage(message: string) {
    alert(message)
  }
}
