export default (sequelize, DataTypes) => {
  const PwdAuth = sequelize.define(
    "PwdAuth",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        validate: {},
      },
      username: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: {},
        validate: {
          len: [4, 64],
        },
      },
      mobile: {
        type: DataTypes.STRING(11),
        allowNull: true,
        unique: true,
        validate: {},
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: false,
        validate: {},
      },
      expire_time: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
        validate: {},
      },
      verify_time: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
        validate: {},
      },
    },
    {
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: "pwdauth", // 定义表的名称
    }
  );
  return PwdAuth;
};
