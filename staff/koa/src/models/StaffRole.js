export default (sequelize, DataTypes) => {
  const StaffRole = sequelize.define(
    "StaffRole",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      staff_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        validate: {},
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        validate: {},
      },
    },
    {
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: "staffrole", // 定义表的名称
    }
  );
  return StaffRole;
};
