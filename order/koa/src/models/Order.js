export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      order_no: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: {},
      },
      order_type: {
        type: DataTypes.TINYINT,
        allowNull: false,
        unique: false,
        defaultValue: 0,
        validate: {
          isIn: [[0, 1]],
        },
      },
      deliver_type: {
        type: DataTypes.TINYINT,
        allowNull: true,
        unique: false,
        defaultValue: 1,
        validate: {
          isIn: [[1, 2, 3]],
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        unique: false,
        validate: {},
      },
      crop_id: {
        type: DataTypes.UUID,
        allowNull: true,
        unique: false,
        validate: {},
      },
      order_status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        unique: false,
        defaultValue: 1,
        validate: {
          isIn: [[0, 1, 2, 3, 4, 5, 6, 7]],
        },
      },
      pay_status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        unique: false,
        defaultValue: 1,
        validate: {
          isIn: [[0, 1, 2, 3, 4, 5, 6, 7]],
        },
      },
      bag_status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        unique: false,
        defaultValue: 1,
        validate: {
          isIn: [[0, 1, 2, 3, 4, 5, 6, 7, 8]],
        },
      },
      all_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        validate: {},
      },
      dis_fee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
        defaultValue: 0,
        validate: {},
      },
      exp_fee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
        validate: {},
      },
      need_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        validate: {},
      },
      real_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 0,
        validate: {},
      },
      pay_time: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
        validate: {},
      },
      sku_info: {
        type: DataTypes.JSON,
        allowNull: true,
        unique: false,
        validate: {},
      },
      deliver_info: {
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
      tableName: "order", // 定义表的名称
    }
  );
  return Order;
};
