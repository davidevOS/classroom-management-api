const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv/config');

// Settings
app.set('port', process.env.PORT || 3500);

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use(require('./routes/routes'));

// Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});


