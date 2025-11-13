import Constants from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "https://micro-debt-settler.onrender.com/api/v1",
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
