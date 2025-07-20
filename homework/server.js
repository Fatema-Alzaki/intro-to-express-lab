const express = require('express') // bring in express
const app = express() // set up the server application

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];

app.get('/greetings/:usernameParameter', (req,res) => {
   console.log(req)
   const username=req.params.usernameParameter
   res.send(`<h1>What a delight it is to see you once more, Hello sweetpie ${username} :> <h1>`)
})

app.get('/roll/:numberParameter', (req, res) => {
    console.log(req.params.numberParameter);
    req.params.numberParameter = parseInt(req.params.numberParameter, 10);

    if (req.params.numberParameter === req.params.numberParameter) {
        console.log('i got a number yippeee');
        const randomRoll = Math.floor(Math.random() * (req.params.numberParameter + 1));
        res.send(`<h1>You rolled a ${randomRoll}</h1>`);
    } else {
        res.send('You must specify a number >:(');
    }
});


app.get('/collectibles/:indexParameter', (req, res) => {
  const index = parseInt(req.params.indexParameter);

  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    res.send("This item is not yet in stock. Check back soon!");
  } else {
    const item = collectibles[index];
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours my handsome broooo!`);
  }
});

app.get('/shoes', (req, res) => {
    // Extract query parameters
    const minPrice = parseFloat(req.query['min-price']);
    const maxPrice = parseFloat(req.query['max-price']);
    const type = req.query.type;

    let filteredShoes = shoes;

    // Apply filters only if query parameters are present
    if (!isNaN(minPrice)) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }

    if (!isNaN(maxPrice)) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }

    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }

    res.send(filteredShoes);
});

app.listen(3001, () => {
    console.log('Everything is gravy on hot mashed potatoes')
})