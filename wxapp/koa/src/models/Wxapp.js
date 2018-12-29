export default (sequelize, DataTypes) => {
  const Wxapp = sequelize.define(
    "Wxapp",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      appType: {
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
      accessToken: {
        type: DataTypes.STRING(512),
        allowNull: true,
        unique: false,
        validate: {}
      },
      expiresIn: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
        validate: {}
      }
    },
    {
      underscored: false,
      tableName: "Wxapp",
      paranoid: true
    }
  )
  return Wxapp
}
