import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { API_PATH } from '../../../environments/environment.development';
import { Language } from '../interfaces/language.interface';
import { IShared, ISharedAll } from '../interfaces/shared.interfaces';

@Injectable({ providedIn: 'root' })
export class SharedApiService {
  constructor(private http: HttpClient) {}

  public getAllSharedCollections(): Observable<ISharedAll> {
    return combineLatest([
      this.getSpecializations(),
      this.getDepartments(),
      this.getSkills(),
      this.getTeamRoles(),
      this.getResponsibilities(),
      this.getLanguages(),
    ]).pipe(
      map((array) =>
        array.reduce((prevObj, currObj) => ({ ...prevObj, ...currObj }), {})
      )
    );
  }

  public getSpecializations() {
    return this.http
      .get<IShared[]>(`${API_PATH}/specializations`)
      .pipe(map((array) => ({ specializations: array })));
  }

  public getDepartments() {
    return this.http
      .get<IShared[]>(`${API_PATH}/departments`)
      .pipe(map((array) => ({ departments: array })));
  }

  public getSkills() {
    return this.http
      .get<IShared[]>(`${API_PATH}/skills`)
      .pipe(map((array) => ({ skills: array })));
  }

  public getTeamRoles() {
    return this.http
      .get<IShared[]>(`${API_PATH}/team-roles`)
      .pipe(map((array) => ({ teamRoles: array })));
  }

  public getResponsibilities() {
    return this.http
      .get<IShared[]>(`${API_PATH}/responsibilities`)
      .pipe(map((array) => ({ responsibilities: array })));
  }

  public getLanguages() {
    return this.http
      .get<Language[]>(`${API_PATH}/languages`)
      .pipe(map((array) => ({ languages: array })));
  }

  // private transformAllValues(
  //   array: {un}[]
  // ): ISharedAll {
  //   const [
  //     specializations,
  //     departments,
  //     skills,
  //     teamRoles,
  //     responsibilities,
  //     languages,
  //   ] = array;

  //   return {
  //     specializations,
  //     departments,
  //     skills,
  //     teamRoles,
  //     responsibilities,
  //     languages,
  //   };
  // }
}
