import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { of } from 'rxjs';

import * as ProjectsActions from '../projects.actions';
import { ProjectsEffects } from '../projects.effects';
import { ToastMessageService } from '../../../shared/services/toast-messages.service';
import { ProjectsApiService } from '../../../shared/services/projects-api.service';

describe('ProjectsEffects', () => {
  let actions$: Actions;
  let effects: ProjectsEffects;
  let projectsService: ProjectsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProjectsEffects,
        ProjectsApiService,
        provideMockActions(() => actions$),
        {
          provide: ToastMessageService,
          useValue: {
            showSuccessMessage: jest.fn(),
            showErrorMessage: jest.fn(),
          },
        },
      ],
    });

    effects = TestBed.inject(ProjectsEffects);
    projectsService = TestBed.inject(ProjectsApiService);
  });

  it('should load projects successfully from api', () => {
    const action = ProjectsActions.getProjects();
    const mockProject = {
      id: 1,
      projectName: 'Project',
      startDate: new Date(),
      endDate: new Date(),
      teamSize: 1,
      description: '',
      techStack: '',
      responsibilities: '',
      teamRoles: '',
    };

    projectsService.getProjects = jest.fn(() => of([mockProject]));

    actions$ = of(action);

    effects.get$.subscribe((result) => {
      expect(result).toEqual(
        ProjectsActions.loadProjectsSuccess({ projects: [mockProject] })
      );
    });
  });

  it('should handle load projects failure from api', () => {
    const error = 'Error'
    const action = ProjectsActions.getProjects();

    projectsService.getProjects = jest.fn(() => {throw new Error(error)})

    actions$ = of(action);

    effects.get$.subscribe((result) => {
      expect(result).toEqual(ProjectsActions.loadProjectsFailure({ error }));
    });
  });
});
