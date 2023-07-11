import { APP_ENV, BACKEND_BASE_LOCAL, BACKEND_BASE_URL } from "./constants";

export const config = {
  production: {
    endpointURL: BACKEND_BASE_URL,
  },
  development: {
    endpointURL: BACKEND_BASE_LOCAL,
  },
};

export const getAPIURL = () => {
  if (APP_ENV === "development") {
    return config.development.endpointURL;
  } else {
    return config.production.endpointURL;
  }
};
