let accessToken = null;

export const TokenService = {
  getAccessToken() {
    return accessToken;
  },

  setAccessToken(token) {
    accessToken = token;
  },

  clear() {
    accessToken = null;
  },
};
