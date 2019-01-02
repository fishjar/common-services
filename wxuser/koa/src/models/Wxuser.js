export default (sequelize, DataTypes) => {
  const Wxuser = sequelize.define(
    "Wxuser",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      appid: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: false,
        validate: {}
      },
      unionid: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: false,
        validate: {}
      },
      openid: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: false,
        validate: {}
      },
      sessionKey: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {}
      },
      expiresIn: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
        validate: {}
      },
      nickname: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {}
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: false,
        validate: {}
      },
      gender: {
        type: DataTypes.TINYINT,
        allowNull: true,
        unique: false,
        defaultValue: 1,
        validate: {
          isIn: [[1, 2, 3]]
        }
      },
      city: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: false,
        validate: {}
      },
      province: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: false,
        validate: {}
      },
      country: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: false,
        validate: {}
      }
    },
    {
      underscored: false,
      tableName: "Wxuser",
      paranoid: true
    }
  )
  return Wxuser
}
