const express = require('express');
const app = express();
const cors = require('cors');

// Settings
app.set('port', process.env.PORT || 3500);

// Middlewares
app.use(express.json());
app.use(cors());

// Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});


