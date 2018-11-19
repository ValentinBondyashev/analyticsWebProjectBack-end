const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const app = express();
const passport = require('passport');


const isProduction = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

//passport config
require('./config/passport');

//routes
app.use(require('./routes'));

if(!isProduction) {
    app.use(errorHandler());
}

if(!isProduction) {
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });

    });
}

app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });

});

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));
