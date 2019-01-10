export default (sequelize, DataTypes) => {
  const RoleResource = sequelize.define(
    "RoleResource",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        validate: {},
      },
      resource_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        validate: {},
      },
      action: {
        type: DataTypes.TINYINT,
        allowNull: true,
        unique: false,
        defaultValue: 0,
        validate: {
          isIn: [[0, 1, 2, 3, 4]],
        },
      },
    },
    {
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: "roleresource", // 定义表的名称
    }
  );
  return RoleResource;
};
