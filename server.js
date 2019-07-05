const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Product } = db.models;
app.use(express.json());

db.syncAndSeed();

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/products', async(req, res, next)=> {
  try{
    res.send(await Product.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/products', async(req, res, next)=>{
  console.log(req.body);
  try{
    const product = await Product.create(req.body);
    res.send(product);
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/products/:id', async(req, res, next)=>{

  try{
    await Product.destroy({where: {id: req.params.id}});
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});
