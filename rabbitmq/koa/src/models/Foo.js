export default (sequelize, DataTypes) => {
  const Foo = sequelize.define(
    "Foo",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 20],
        },
      },
      age: {
        type: DataTypes.TINYINT,
        allowNull: true,
        unique: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
        unique: false,
        validate: {
          min: 0.01,
          max: 200,
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        unique: false,
        validate: {},
      },
      good_time: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
        validate: {},
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      homepage: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        validate: {
          isUrl: true,
        },
      },
      notice: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
        validate: {},
      },
      intro: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
        validate: {},
      },
      is_good: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: true,
        validate: {},
      },
      my_extra: {
        type: DataTypes.JSON,
        allowNull: true,
        unique: false,
        validate: {},
      },
      my_extra_array: {
        type: DataTypes.JSON,
        allowNull: true,
        unique: false,
        validate: {},
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
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
      tableName: "foo", // 定义表的名称
    }
  );
  return Foo;
};
