export default (sequelize, DataTypes) => {
  const Wxmch = sequelize.define(
    "Wxmch",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: false,
        validate: {},
      },
      mchid: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: false,
        validate: {},
      },
      secret: {
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
      tableName: 'wxmch', // 定义表的名称
    }
  );
  return Wxmch;
};
