const ValidEnvironments = {
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
} as const;
type ValidEnvironments =
  (typeof ValidEnvironments)[keyof typeof ValidEnvironments];

/**
 * The type of the module configuration object for this module
 */
type TRootModuleConfig = () => {
  [ROOT_MODULE_CONFIG.ENVIRONMENT]: ValidEnvironments;
  [ROOT_MODULE_CONFIG.RUN_ON_FIREBASE_FUNCTIONS]: boolean;
  [ROOT_MODULE_CONFIG.MOCK_ISSA_SF_API]: boolean;
  [ROOT_MODULE_CONFIG.SWAGGER_SERVER_URL]: string;
  [ROOT_MODULE_CONFIG.UI_URL]: string;
};

/**
 * Returns the module configuration needed for this module to work
 * @returns {Object}                Configuration object for this module
 */
export const rootModuleConfig: TRootModuleConfig = () => ({
  [ROOT_MODULE_CONFIG.ENVIRONMENT]: process.env[
    ROOT_MODULE_CONFIG.ENVIRONMENT
  ] as ValidEnvironments,
  [ROOT_MODULE_CONFIG.RUN_ON_FIREBASE_FUNCTIONS]:
    process.env[ROOT_MODULE_CONFIG.RUN_ON_FIREBASE_FUNCTIONS] === 'true',
  [ROOT_MODULE_CONFIG.MOCK_ISSA_SF_API]:
    process.env[ROOT_MODULE_CONFIG.MOCK_ISSA_SF_API] === 'true',
  [ROOT_MODULE_CONFIG.SWAGGER_SERVER_URL]: process.env[
    ROOT_MODULE_CONFIG.SWAGGER_SERVER_URL
  ] as string,
  [ROOT_MODULE_CONFIG.UI_URL]: process.env[ROOT_MODULE_CONFIG.UI_URL] as string,
  // [ROOT_MODULE_CONFIG.UI_URL]: defineSecret(ROOT_MODULE_CONFIG.UI_URL) as string,
});

export enum ROOT_MODULE_CONFIG {
  ENVIRONMENT = 'API_ENVIRONMENT',
  RUN_ON_FIREBASE_FUNCTIONS = 'API_RUN_ON_FIREBASE_FUNCTIONS',
  MOCK_ISSA_SF_API = 'MOCK_ISSA_SF_API',
  SWAGGER_SERVER_URL = 'APP_SWAGGER_SERVER_URL',
  UI_URL = 'APP_UI_URL',
}
