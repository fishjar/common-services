export default (sequelize, DataTypes) => {
  const Resource = sequelize.define(
    "Resource",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      pid: {
        type: DataTypes.UUID,
        allowNull: true,
        unique: false,
        validate: {},
      },
      resource_code: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: {},
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: false,
        validate: {},
      },
    },
    {
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: "resource", // 定义表的名称
    }
  );
  return Resource;
};
