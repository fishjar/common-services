export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      nickname: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      gender: {
        type: DataTypes.TINYINT,
        allowNull: true,
        unique: false,
        defaultValue: 0,
        validate: {
          isIn: [[0, 1, 2]],
        },
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: false,
        validate: {},
      },
      mobile: {
        type: DataTypes.STRING(11),
        allowNull: true,
        unique: false,
        validate: {},
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        validate: {
          isEmail: true,
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        unique: false,
        validate: {},
      },
    },
    {
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: "user", // 定义表的名称
    }
  );
  return User;
};
