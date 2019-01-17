export default (sequelize, DataTypes) => {
  const Wxacode = sequelize.define(
    "Wxacode",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      appid: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
        validate: {},
      },
      code_type: {
        type: DataTypes.STRING(1),
        allowNull: false,
        unique: false,
        validate: {
          isIn: [[A, B, C]],
        },
      },
      path: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {},
      },
      scene: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: true,
        validate: {},
      },
      width: {
        type: DataTypes.TINYINT,
        allowNull: false,
        unique: false,
        defaultValue: 430,
        validate: {
          min: 280,
          max: 1280,
        },
      },
      auto_color: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false,
        defaultValue: true,
        validate: {},
      },
      line_color: {
        type: DataTypes.JSON,
        allowNull: true,
        unique: false,
        validate: {},
      },
      is_hyaline: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: false,
        defaultValue: false,
        validate: {},
      },
      code_path: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false,
        validate: {},
      },
    },
    {
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: "wxacode", // 定义表的名称
    }
  );
  return Wxacode;
};
