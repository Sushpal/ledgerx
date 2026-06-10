export const generateRequestId = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "txn_";
  for (let i = 0; i < 20; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};