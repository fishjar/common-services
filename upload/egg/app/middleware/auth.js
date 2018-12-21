'use strict';

module.exports = () => {
  return async function(ctx, next) {
    // if (ctx.ip !== '127.0.0.1') {
    //   ctx.logger.info(`Client IP: ${ctx.ip}`);
    //   ctx.throw(401, 'not safe ip!');
    // }
    await next();
  };
};
