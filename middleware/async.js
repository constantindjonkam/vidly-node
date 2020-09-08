function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      handler(req, res, next);
    } catch (ex) {
      next(ex);
    }
  };
}

exports.asyncMiddleware = asyncMiddleware;
