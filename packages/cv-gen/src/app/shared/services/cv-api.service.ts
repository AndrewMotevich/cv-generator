import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../../../environments/environment.development';
import { CvDto, ICv } from '../../employees/models/cvs.model';
import { map } from 'rxjs';
import { ProjectsAdapter } from './projects-adapter.service';

@Injectable({ providedIn: 'root' })
export class CvApiService {
  constructor(
    private http: HttpClient,
    private projectsAdapter: ProjectsAdapter
  ) {}

  public getCvs() {
    return this.http.get<ICv[]>(`${API_PATH}/cvs`);
  }

  public getCvById(id: number) {
    return this.http
      .get<ICv>(`${API_PATH}/cvs/${id}`)
      .pipe(map((cv) => this.transformICvToCvDto(cv)));
  }

  public addCv(body: CvDto) {
    return this.http.post<ICv>(`${API_PATH}/cvs`, body);
  }

  public updateCv(id: number, cvDto: CvDto) {
    return this.http.put<ICv>(`${API_PATH}/cvs/${id}`, cvDto);
  }

  public deleteCv(id: number) {
    return this.http.delete<ICv>(`${API_PATH}/cvs/${id}`);
  }

  public transformICvToCvDto(cv: ICv): CvDto {
    const cvDto = {
      ...cv,
      department: cv.department.name,
      specialization: cv.specialization.name,
      skills: cv.skills.map((skill) => skill.name),
      language: cv.language.map((lang) => ({
        name: lang.name,
        level: lang.level,
      })),
      projects: cv.cvsProjects.map((project) =>
        this.projectsAdapter.transformIProjectToProjectDto(project)
      ),
    };
    delete cvDto.cvsProjects;
    return cvDto;
  }
}
