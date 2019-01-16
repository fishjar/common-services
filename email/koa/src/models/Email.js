export default (sequelize, DataTypes) => {
  const Email = sequelize.define(
    "Email",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      sender: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: false,
        validate: {},
      },
      receivers: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false,
        validate: {},
      },
      subject: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false,
        validate: {},
      },
      text_body: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
        validate: {},
      },
      html_body: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
        validate: {},
      },
      send_time: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
        validate: {},
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        unique: false,
        defaultValue: 1,
        validate: {
          isIn: [[1, 2, 3]],
        },
      },
    },
    {
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: "email", // 定义表的名称
    }
  );
  return Email;
};
