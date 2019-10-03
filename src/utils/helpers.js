export const getTokenFromRequestHeaders = req => {
  return req.headers.authorization.replace('Bearer ', '');
};
