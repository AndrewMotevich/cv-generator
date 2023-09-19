import { nxComponentTestingPreset } from '@nx/angular/plugins/component-testing';
import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    ...nxComponentTestingPreset(__filename),
    indexHtmlFile: '/cypress/support/component-index.html',
  },
});

export const COMPONENT_CONFIG = {
  ...nxComponentTestingPreset(__filename),
  indexHtmlFile: '/cypress/support/component-index.html',
};
