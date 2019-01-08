export default (sequelize, DataTypes) => {
  const ThirdAuth = sequelize.define(
    "ThirdAuth",
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
      auth_type: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: false,
        validate: {},
      },
      auth_id: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: false,
        validate: {},
      },
      auth_code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        validate: {
          isEmail: true,
        },
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
      tableName: "thirdauth", // 定义表的名称
    }
  );
  return ThirdAuth;
};
