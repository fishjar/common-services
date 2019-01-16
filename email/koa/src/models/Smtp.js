export default (sequelize, DataTypes) => {
  const Smtp = sequelize.define(
    "Smtp",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      sender: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {},
      },
      host: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: false,
        validate: {},
      },
      port: {
        type: DataTypes.TINYINT,
        allowNull: false,
        unique: false,
        validate: {},
      },
      secure: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: true,
        validate: {},
      },
      user: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: false,
        validate: {},
      },
      pass: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: false,
        validate: {},
      },
    },
    {
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: "smtp", // 定义表的名称
    }
  );
  return Smtp;
};
