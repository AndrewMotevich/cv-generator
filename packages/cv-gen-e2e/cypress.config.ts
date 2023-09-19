import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { COMPONENT_CONFIG } from '../cv-gen/cypress.config';

export default defineConfig({
  e2e: nxE2EPreset(__dirname),
  component: { ...COMPONENT_CONFIG, specPattern: '../cv-gen/**/*.cy.ts' },
  chromeWebSecurity: false,
  video: false,
});
