// export const logger = (req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
//   next(); // Let the request move forward
// };


export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied: Requires one of [${roles.join(', ')}]`
      });
    }
    next();
  };
};
