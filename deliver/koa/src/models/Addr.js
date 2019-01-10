export default (sequelize, DataTypes) => {
  const Addr = sequelize.define(
    "Addr",
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
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: false,
        validate: {},
      },
      phone: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      country: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      province: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      city: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      region: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: false,
        validate: {},
      },
      region_code: {
        type: DataTypes.STRING(8),
        allowNull: true,
        unique: false,
        validate: {},
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        unique: false,
        validate: {},
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        unique: false,
        validate: {},
      },
    },
    {
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: "addr", // 定义表的名称
    }
  );
  return Addr;
};
