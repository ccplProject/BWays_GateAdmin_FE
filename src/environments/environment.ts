// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,

  /*******************************************************/
  appName: "BWaysGate",
  showBrand: true,
  baseUrl: "http://localhost:5001/",
  token: "token",
  key: "key",
  userData: "userData",

  about: {
    COMPANY_NAME: "Compserv Consultants Pvt Ltd.",
    COMPANY_SHORT_NAME: "Compserv",
    RELEASE_DATE: "23/06/2025",
    VERSION: "B 1.0.1",
    LAST_UPDATE: "01/11/2025"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
