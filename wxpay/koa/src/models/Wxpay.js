export default (sequelize, DataTypes) => {
  const Wxpay = sequelize.define(
    "Wxpay",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      appid: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: false,
        validate: {},
      },
      mch_id: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: false,
        validate: {},
      },
      device_info: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: false,
        validate: {},
      },
      body: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: false,
        validate: {},
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
        validate: {},
      },
      attach: {
        type: DataTypes.STRING(127),
        allowNull: true,
        unique: false,
        validate: {},
      },
      out_trade_no: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: false,
        validate: {},
      },
      fee_type: {
        type: DataTypes.STRING(16),
        allowNull: true,
        unique: false,
        validate: {},
      },
      total_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        validate: {},
      },
      spbill_create_ip: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: false,
        validate: {},
      },
      time_start: {
        type: DataTypes.STRING(14),
        allowNull: true,
        unique: false,
        validate: {},
      },
      time_expire: {
        type: DataTypes.STRING(14),
        allowNull: true,
        unique: false,
        validate: {},
      },
      goods_tag: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: false,
        validate: {},
      },
      trade_type: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: false,
        validate: {},
      },
      product_id: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: false,
        validate: {},
      },
      limit_pay: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: false,
        validate: {},
      },
      openid: {
        type: DataTypes.STRING(128),
        allowNull: true,
        unique: false,
        validate: {},
      },
      receipt: {
        type: DataTypes.STRING(8),
        allowNull: true,
        unique: false,
        validate: {},
      },
      scene_info: {
        type: DataTypes.STRING(256),
        allowNull: true,
        unique: false,
        validate: {},
      },
      return_code: {
        type: DataTypes.STRING(16),
        allowNull: true,
        unique: false,
        validate: {},
      },
      return_msg: {
        type: DataTypes.STRING(128),
        allowNull: true,
        unique: false,
        validate: {},
      },
      result_code: {
        type: DataTypes.STRING(16),
        allowNull: true,
        unique: false,
        validate: {},
      },
      err_code: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: false,
        validate: {},
      },
      err_code_des: {
        type: DataTypes.STRING(128),
        allowNull: true,
        unique: false,
        validate: {},
      },
      prepay_id: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      code_url: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      is_subscribe: {
        type: DataTypes.STRING(1),
        allowNull: true,
        unique: false,
        validate: {},
      },
      trade_state: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: false,
        validate: {},
      },
      bank_type: {
        type: DataTypes.STRING(16),
        allowNull: true,
        unique: false,
        validate: {},
      },
      settlement_total_fee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
        validate: {},
      },
      cash_fee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
        validate: {},
      },
      cash_fee_type: {
        type: DataTypes.STRING(16),
        allowNull: true,
        unique: false,
        validate: {},
      },
      coupon_fee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
        validate: {},
      },
      coupon_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
        validate: {},
      },
      transaction_id: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: false,
        validate: {},
      },
      time_end: {
        type: DataTypes.STRING(14),
        allowNull: true,
        unique: false,
        validate: {},
      },
      trade_state_desc: {
        type: DataTypes.STRING(256),
        allowNull: true,
        unique: false,
        validate: {},
      },
    },
    {
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: 'wxpay', // 定义表的名称
    }
  );
  return Wxpay;
};
