export default (sequelize, DataTypes) => {
  const Wxrefund = sequelize.define(
    "Wxrefund",
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
      transaction_id: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: false,
        validate: {},
      },
      out_trade_no: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: false,
        validate: {},
      },
      out_refund_no: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: false,
        validate: {},
      },
      total_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        validate: {},
      },
      refund_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        validate: {},
      },
      refund_fee_type: {
        type: DataTypes.STRING(8),
        allowNull: true,
        unique: false,
        validate: {},
      },
      refund_desc: {
        type: DataTypes.STRING(80),
        allowNull: true,
        unique: false,
        validate: {},
      },
      refund_account: {
        type: DataTypes.STRING(30),
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
      refund_id: {
        type: DataTypes.STRING(32),
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
      fee_type: {
        type: DataTypes.STRING(8),
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
      cash_refund_fee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
        validate: {},
      },
      coupon_refund_fee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
        validate: {},
      },
      coupon_refund_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
        validate: {},
      },
      total_refund_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
        validate: {},
      },
      refund_status: {
        type: DataTypes.STRING(16),
        allowNull: true,
        unique: false,
        validate: {},
      },
      success_time: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: false,
        validate: {},
      },
      refund_recv_accout: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {},
      },
      refund_request_source: {
        type: DataTypes.STRING(30),
        allowNull: true,
        unique: false,
        validate: {},
      },
    },
    {
      underscored: false,
      tableName: "Wxrefund",
      paranoid: true,
    }
  );
  return Wxrefund;
};
