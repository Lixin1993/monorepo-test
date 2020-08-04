module.exports = (options) => {
  return async function jwtErr(ctx, next) {
    const token = ctx.request.header['x-auth-token'];
    let decode = '';
    if (token) {
      try {
        // 解码token
        decode = ctx.app.jwt.verify(token, options.secret);
        await next();
      } catch (error) {
        ctx.status = 401;
        ctx.body = { code: 401, message: error.message };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = { code: 401, message: '没有token' };
      return;
    }
  };
}