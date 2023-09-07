export const sendErrorMessage = (res, code, message) => {
  res.statusCode = code;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(message);
};
