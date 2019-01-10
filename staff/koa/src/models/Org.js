export default (sequelize, DataTypes) => {
  const Org = sequelize.define(
    "Org",
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
      corp_code: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
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
      tableName: "org", // 定义表的名称
    }
  );
  return Org;
};
