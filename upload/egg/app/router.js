'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/upload', controller.upload.multiple);
  router.get('/download', app.controller.download.download);
  router.resources('media', '/medias', controller.media);
};
