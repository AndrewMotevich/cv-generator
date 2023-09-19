import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app/app.module';
import { HeaderComponent } from '../app/core/components/header/header.component';
import { CoreModule } from '../app/core/core.module';
import { AuthFacade } from '../app/ngrx/auth/auth.facade';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ...new CoreModule(),
      declarations: [HeaderComponent],
      providers: [
        {
          provide: AuthFacade,
          useValue: {
            logOut: () => {
              return;
            },
          },
        },
      ],
      imports: [CoreModule, AppModule],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    cy.viewport(1200, 750);
  });

  it('should be created', () => {
    fixture.detectChanges();
    cy.get('cv-gen-language-button').should('exist');
    cy.get('cv-gen-theme-button').should('exist');
  });

  it('[show/hide directive] should hide translate and theme', () => {
    cy.viewport(550, 750);
    fixture.detectChanges();
    cy.get('cv-gen-translate-button').should('not.exist');
    cy.get('cv-gen-theme-button').should('not.exist');
  });

  it('[show/hide directive] should show settings and bar button', () => {
    cy.viewport(550, 750);
    fixture.detectChanges();
    cy.get('cv-gen-translate-button').should('not.exist');
    cy.get('cv-gen-theme-button').should('not.exist');
    cy.get('p-button[icon="pi pi-bars"]').should('exist');
    cy.get('p-button[icon="pi pi-cog"]').should('exist');
  });
});
