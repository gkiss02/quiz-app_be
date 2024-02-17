const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser')

app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

const swaggerDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const sequelize = require('./config/database');

const userModel = require('./models/user');
const gameModel = require('./models/game');

userModel.hasMany(gameModel.Game, { foreignKey: 'userId' });
gameModel.Game.belongsTo(userModel, { foreignKey: 'userId' });

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/game', require('./routes/game'));
app.use('/ranking', require('./routes/ranking'));

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Quiz App API',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ]
    },
    apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

sequelize.sync()
    .then(() => {
        server.listen(8080, () => {
            console.log('Server is running on port 8080');
        });
    })
    .catch(err => {
        console.log(err);
    });
