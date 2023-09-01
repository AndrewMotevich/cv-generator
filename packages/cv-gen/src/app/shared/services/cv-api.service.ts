import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../../../environments/environment.development';
import { ICv } from '../../employees/models/cvs.model';

@Injectable({ providedIn: 'root' })
export class CvApiService {
  constructor(private http: HttpClient) {}

  public getCvs() {
    return this.http.get<ICv[]>(`${API_PATH}/cvs`);
  }
}
