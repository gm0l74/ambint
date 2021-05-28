//---------------------------------
// AmbInt - Admin
// File : jest.config.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         06 05 2021
//---------------------------------
module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"]
};
