'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, UUIDV1 } = app.Sequelize;

  const Media = app.model.define('Media', {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      primaryKey: true
    },
    mime: STRING(64),
    filename: STRING(128),
    title: STRING(128),
    hashname: STRING(64),
    ext: STRING(4),
    path: STRING(128),
    url: STRING(255),
    description: STRING(255),
    size: INTEGER,
    width: INTEGER,
    height: INTEGER,
  }, {
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: 'media', // 定义表的名称
    });

  return Media;
};
