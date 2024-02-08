const express = require('express');
const bodyParser = require('body-parser');
const {v4: uuidv4} = require('uuid');
const cors = require('cors');

const app = express();
const port = '8001';

const db = new Array();

// middlewares 
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/todo', (req, res) => {
    console.log('fetching todos', req.url);
    const items = db;
    return res.json({'status': 'success', data: items})
});

app.post('/todo/mark-complete', (req, res) => {
    const {id} = req.body;
    const itemIndex = db.findIndex((e)=> e.id === id);

    if(itemIndex === -1) {
        return res.json({'status': 'error', error: 'invalid Id'})
    }

    db[itemIndex].isCompleted = true;

    return res.json({'status': 'success'})
});

app.post('/todo/create', (req,res) => {
    console.log('creating a new todo: ', req.url, req.body);
    const {title} = req.body;
    console.log('title: ', title, req.body);
    const id = uuidv4();
    const item = { id, title, isCompleted: false, createAt: new Date()};
    console.log('item: ', item);
    db.push(item);

    return res.json({'status': 'success test', data: item});
})

app.listen(port, ()=>console.log(`react query todo app is listening on port ${port}`));

