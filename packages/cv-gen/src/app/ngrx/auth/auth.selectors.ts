import { createFeatureSelector } from '@ngrx/store';
import { ITokenData } from '../../shared/interfaces/token-data.interface';
import { TOKEN_FEATURE_KEY } from './auth.reducer';


export const selectTokenState = createFeatureSelector<ITokenData>(
  TOKEN_FEATURE_KEY
);

