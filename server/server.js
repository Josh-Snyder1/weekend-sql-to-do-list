const express = require('express');
const bodyParser = require('body-parser');
const toDoRouter = require('./routes/toDo.router');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use('/toDo', toDoRouter);

app.use(express.static('server/public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on PORT', PORT);
});