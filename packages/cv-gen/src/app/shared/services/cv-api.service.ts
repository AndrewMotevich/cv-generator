import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class CvApiService {
  constructor(private http: HttpClient) {}

  public getCvs() {
    return this.http.get(`${API_PATH}/cvs`);
  }
}
