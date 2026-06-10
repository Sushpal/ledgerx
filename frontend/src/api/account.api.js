import api from "./axios";

export const createAccountAPI = () =>
  api.post("/api/accounts", {});

export const getAccountsAPI = () =>
  api.get("/api/accounts");

export const getBalanceAPI = (accountId) =>
  api.get(`/api/accounts/balance/${accountId}`);