import api from "./axios";

export const createTransactionAPI = (data) =>
  api.post("/api/transactions", data);

export const fundAccountAPI = (data) =>
  api.post("/api/transactions/system/initial-funds", data);