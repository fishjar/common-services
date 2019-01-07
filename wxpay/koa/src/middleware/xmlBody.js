import contentType from 'content-type';
import getRawBody from 'raw-body';

export default () => async function xmlBody(ctx, next) {
  if (ctx.method === 'POST' && ctx.request.header["content-type"] === 'text/xml') {
    const xml = await getRawBody(ctx.req, {
      encoding: contentType.parse(ctx.req).parameters.charset || 'utf-8',
    });
    ctx.req.xml = xml;
  }
  await next();
}
