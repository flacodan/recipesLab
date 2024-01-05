import Sequelize, { DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize('postgresql:///recipe_app', { define: { underscored: true }});

class Ingredient extends Model {}

Ingredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        units: {
            type: DataTypes.STRING(60),
            allowNull: false,
        }
    },
    {
        modelName: 'ingredient',
        sequelize: sequelize,
        timestamps: false
    }
)

class Recipe extends Model {}
Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
        //author_id FK to author table
    },
    {
        modelName: 'recipe',
        sequelize: sequelize,
        timestamps: false
    }
);

class Author extends Model {}
Author.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        }
    },
    {
        modelName: 'author',
        sequelize: sequelize,
        timestamps: false
    }
);

class Recipe_ingredient extends Model {}
Recipe_ingredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.DECIMAL,
        }
    },
    {
        modelName: 'recipe_ingredient',
        sequelize: sequelize,
        timestamps: false
    }
);

//TABLE RELATIONSHIPS
Recipe.hasMany(Recipe_ingredient, { foreignKey: 'recipeId' });
Recipe_ingredient.belongsTo(Recipe, { foreignKey: 'recipeId' });

Ingredient.hasMany(Recipe_ingredient, { foreignKey: 'ingredientId' });
Recipe_ingredient.belongsTo(Ingredient, { foreignKey: 'ingredientId' });

Author.hasMany(Recipe, { foreignKey: 'authorId' });
Recipe.belongsTo(Author, { foreignKey: 'authorId' });


await sequelize.sync({ force: true });
await sequelize.close();