import express from 'express';
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.text());

app.use(express.static('.'));

app.post('/form', (req,res) => {
    console.log('Received POST:');
    console.log(req.body);

    if (Math.random() >= 0.5) {
        res.status(429);
        res.send('Too many requestes.');
    } else {
        res.send('Form accepted');
    }
});

app.listen(8080);