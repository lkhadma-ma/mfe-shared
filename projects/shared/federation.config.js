const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'shared',

  exposes: {
    './ShellFooterComponent': './projects/shared/src/app/domains/footer/feature/shell-footer.component.ts',
    './ShellNavbarComponent': './projects/shared/src/app/domains/navbar/feature/shell-navbar.component.ts',
    './ShellNotFoundComponent': './projects/shared/src/app/domains/not-found/feature/shell-not-found.component.ts',
    './ShellSwitchAccountComponent': './projects/shared/src/app/domains/switch-account/feature/shell-switch-account.component.ts',
    './AlertService': './projects/shared/src/app/domains/alert/feature/alert.service.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',

  ],

  features: {
    ignoreUnusedDeps: true
  }
  
});
