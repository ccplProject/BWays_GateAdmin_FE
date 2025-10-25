import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,


  /*******************************************************/
  appName: "BWaysGate",
  showBrand: true,
  // baseUrl: "http://localhost:5001/",
  baseUrl: "https://bways.compservtech.com/bwaysgateadminapi/",
  token: "token",
  key: "key",
  userData: "userData",

  about: {
    COMPANY_NAME: "Compserv Consultants Pvt Ltd.",
    COMPANY_SHORT_NAME: "Compserv",
    RELEASE_DATE: "23/06/2025",
    VERSION: "B 1.0.0",
    LAST_UPDATE: "23/06/2025"
  }
};
