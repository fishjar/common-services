export default (sequelize, DataTypes) => {
  const Wxapp = sequelize.define(
    "Wxapp",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      app_type: {
        type: DataTypes.TINYINT,
        allowNull: false,
        unique: false,
        defaultValue: 1,
        validate: {
          isIn: [[1, 2, 3]]
        }
      },
      mchid: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: false,
        validate: {}
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: false,
        validate: {}
      },
      appid: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: false,
        validate: {}
      },
      secret: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: false,
        validate: {}
      },
      access_token: {
        type: DataTypes.STRING(512),
        allowNull: true,
        unique: false,
        validate: {}
      },
      expires_time: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
        validate: {}
      }
    },
    {
      underscored: true, // 下划线字段
      paranoid: true, // 软删除
      freezeTableName: true, // 禁用修改表名
      tableName: 'wxapp', // 定义表的名称
    }
  )
  return Wxapp
}
