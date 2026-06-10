import api from "./axios";

export const getAccountHistoryAPI = (accountId) => {
  return api.get(`/api/ledger/history/${accountId}`);
};