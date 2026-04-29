export function log(req, res, next) {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
}
