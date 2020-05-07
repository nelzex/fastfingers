const express = require('express');
const app = express();


const PORT = process.env.PORT || 3000;

//serve static files
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => console.log(PORT))
