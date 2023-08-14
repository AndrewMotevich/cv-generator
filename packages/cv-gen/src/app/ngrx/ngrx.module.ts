import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import * as fromEmployees from './reducers/employees.reducer';
import { EmployeesEffects } from './effects/employees.effects';
import { EmployeesFacade } from './facades/employees.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(
      fromEmployees.EMPLOYEES_FEATURE_KEY,
      fromEmployees.employeesReducer
    ),
    EffectsModule.forFeature([EmployeesEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
  ],
  providers: [EmployeesFacade],
})
export class NgrxModule {}
