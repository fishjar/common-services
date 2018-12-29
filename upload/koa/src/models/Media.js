export default (sequelize, DataTypes) => {
  const Media = sequelize.define(
    "Media",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      mime: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: false,
        validate: {}
      },
      filename: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: false,
        validate: {}
      },
      title: {
        type: DataTypes.STRING(128),
        allowNull: true,
        unique: false,
        validate: {}
      },
      hashname: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: false,
        validate: {}
      },
      ext: {
        type: DataTypes.STRING(4),
        allowNull: true,
        unique: false,
        validate: {}
      },
      path: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: false,
        validate: {}
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: false,
        validate: {}
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: false,
        validate: {}
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        validate: {}
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
        validate: {}
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
        validate: {}
      }
    },
    {
      underscored: false,
      tableName: "Media",
      paranoid: true
    }
  )
  return Media
}
