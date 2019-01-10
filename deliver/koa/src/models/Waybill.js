export default (sequelize, DataTypes) => {
  const Waybill = sequelize.define(
    "Waybill",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      waybill_no: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      order_no: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: false,
        validate: {},
      },
      express_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        validate: {},
      },
      staff_id: {
        type: DataTypes.UUID,
        allowNull: true,
        unique: false,
        validate: {},
      },
      from_id: {
        type: DataTypes.UUID,
        allowNull: true,
        unique: false,
        validate: {},
      },
      from_name: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      from_phone: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      from_addr: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: false,
        validate: {},
      },
      from_code: {
        type: DataTypes.STRING(8),
        allowNull: true,
        unique: false,
        validate: {},
      },
      to_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        validate: {},
      },
      to_name: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      to_phone: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      to_addr: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: false,
        validate: {},
      },
      to_code: {
        type: DataTypes.STRING(8),
        allowNull: true,
        unique: false,
        validate: {},
      },
    },
    {
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: "waybill", // 定义表的名称
    }
  );
  return Waybill;
};
