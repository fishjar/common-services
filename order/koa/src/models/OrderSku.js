export default (sequelize, DataTypes) => {
  const OrderSku = sequelize.define(
    "OrderSku",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      order_no: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: false,
        validate: {},
      },
      sku_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
        validate: {},
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        validate: {},
      },
      sku_name: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      sku_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
        validate: {},
      },
      sku_unit: {
        type: DataTypes.STRING(16),
        allowNull: true,
        unique: false,
        validate: {},
      },
      extra_info: {
        type: DataTypes.JSON,
        allowNull: true,
        unique: false,
        validate: {},
      },
      remark: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
        validate: {},
      },
    },
    {
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: "ordersku", // 定义表的名称
    }
  );
  return OrderSku;
};
