export default (sequelize, DataTypes) => {
  const Pay = sequelize.define(
    "Pay",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      pay_no: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: false,
        validate: {},
      },
      order_no: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: false,
        validate: {},
      },
      pay_type: {
        type: DataTypes.TINYINT,
        allowNull: false,
        unique: false,
        validate: {
          isIn: [[0, 1, 2, 3]],
        },
      },
      pay_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        validate: {},
      },
      pay_result: {
        type: DataTypes.TINYINT,
        allowNull: false,
        unique: false,
        defaultValue: 1,
        validate: {
          isIn: [[0, 1, 2, 3]],
        },
      },
      pay_time: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
        validate: {},
      },
      is_locked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: false,
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
      tableName: "pays", // 定义表的名称
    }
  );
  return Pay;
};
