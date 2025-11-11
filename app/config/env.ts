import Constants from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "http://localhost:8000/api/v1",
  },
  staging: {
    apiUrl: Constants.expoConfig?.extra?.stagingApiUrl,
  },
  prod: {
    apiUrl: Constants.expoConfig?.extra?.apiUrl,
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export default getEnvVars();
