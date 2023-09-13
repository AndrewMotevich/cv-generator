import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, concatMap, delay, map, of } from 'rxjs';
import { API_PATH } from '../../../environments/environment.development';
import { CvDto, ICv } from '../../employees/models/cvs.model';
import { ProjectsAdapter } from './projects-adapter.service';

@Injectable({ providedIn: 'root' })
export class CvApiService {
  constructor(
    private http: HttpClient,
    private projectsAdapter: ProjectsAdapter
  ) {}

  public getCvs() {
    return this.http
      .get<ICv[]>(`${API_PATH}/cvs`)
      .pipe(map((cvs) => cvs.map((cv) => this.transformICvToCvDto(cv))));
  }

  public getCvById(id: number) {
    return this.http
      .get<ICv>(`${API_PATH}/cvs/${id}`)
      .pipe(map((cv) => this.transformICvToCvDto(cv)));
  }

  public addCvs(cvDtoArray: CvDto[]) {
    const observersArray = cvDtoArray.map((cv) =>
      this.http.post<ICv>(`${API_PATH}/cvs`, this.transformLanguageInDto(cv))
    );

    return combineLatest(observersArray);
  }

  public updateCvs(cvDtoArray: CvDto[]) {
    // const observersArray = cvDtoArray.map((cv) => {
    //   return  this.http.put<ICv>(
    //         `${API_PATH}/cvs/${cv.id}`,
    //         this.transformLanguageInDto(cv)
    //       )
    //     )
    //   );
    // });

    // return combineLatest(observersArray);

    return combineLatest(
      cvDtoArray.map((cv, index) =>
        of(cv).pipe(
          delay(index * 300),
          concatMap((cvItem) =>
            this.http.put<ICv>(`${API_PATH}/cvs/${cv.id}`, this.transformLanguageInDto(cvItem))
          )
        )
      )
    );
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
        name: lang.name.name,
        level: lang.level.name,
      })),
      projects: cv.cvsProjects.map((project) =>
        this.projectsAdapter.transformIProjectToProjectDto(project)
      ),
    };
    delete cvDto.cvsProjects;
    return cvDto;
  }

  private transformLanguageInDto(cvDto: CvDto) {
    const dto = { ...cvDto };
    delete dto.id;
    delete dto.isInvalid;
    return {
      ...dto,
      language: cvDto.language.map((lang) => ({
        name: { name: lang.name },
        level: { name: lang.level },
      })),
    };
  }
}
