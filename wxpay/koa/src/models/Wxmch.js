export default (sequelize, DataTypes) => {
  const Wxmch = sequelize.define(
    "Wxmch",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: false,
        validate: {},
      },
      mchid: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: false,
        validate: {},
      },
      secret: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: false,
        validate: {},
      },
    },
    {
      underscored: false,
      tableName: "Wxmch",
      paranoid: true,
    }
  );
  return Wxmch;
};
