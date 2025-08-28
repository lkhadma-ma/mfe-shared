const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'shared',

  exposes: {
    './footer': './projects/shared/src/app/components/footer/footer.component.ts',
    './navbar': './projects/shared/src/app/components/navbar/navbar.component.ts',
    './section': './projects/shared/src/app/components/section/section.component.ts',
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
