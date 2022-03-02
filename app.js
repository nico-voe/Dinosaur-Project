// Get JSON

async function getDinos() {
  const dinoJson = await fetch("./dino.json");
  const data = await dinoJson.json();

  return data.Dinos;
}


// Create Dino Constructor
class Dino {
  constructor(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
  }
}


// Create Human Object
class Human {
  constructor(species, height, weight, diet) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.fact = 'This is you!';
  }
}


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight(dinoWeight, humanWeight) {
  let ratio = dinoWeight / parseInt(humanWeight);

  if (ratio > 1) {
    return `This dino is ${ratio.toFixed(1)} heavier than you!`;
  }
  else if (ratio < 1) {
    return `You are ${ratio.toFixed(1)} times heavier than the dino!`;
  }
  else {
    return "Enter your weight to compare with that Dino!";
  }
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

function compareHeight(dinoHeight, humanHeight) {

  let ratio = dinoHeight / parseInt(humanHeight);

  if (ratio > 1) {
    return `This dino is ${ratio.toFixed(1)} times taller than you!`;
  } else if (ratio < 1) {
    return `You are ${ratio.toFixed(1)} times heavier than the dino!`;
  } else {
    return "You have the same height!";
  }
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDiet(dinoDiet, humanDiet) {
  if (dinoDiet !== humanDiet) {
    return "You don't eat the same stuff.";
  } else {
    return "You share the same diet.";
  }
}


// Generate Tiles for each Dino in Array

const button = document.getElementById("btn");

button.addEventListener("click", function generateTiles() {

  // Use IIFE to get human data from form
  const humanObject = (function createHuman() {
    const hName = document.getElementById("name").value;
    const hWeight = document.getElementById("weight").value;
    const hDiet = document.getElementById("diet").value;
    const hHeight =
      document.getElementById("feet").value * 12 +
      document.getElementById("inches").value;

    return new Human(hName, hHeight, hWeight, hDiet);
  })()

  //Create Dino

  getDinos().then((res) => {
    let dinos = res.map(
      (dino) =>
        new Dino(
          dino.species,
          dino.weight,
          dino.height,
          dino.diet,
          dino.where,
          dino.when,
          dino.fact
        )
    );


    //Add humanObject in Array
    dinos.splice(4, 0, humanObject);


    // hide Form  after click
    document.getElementById("dino-compare").style.display = "none"


    //generate a random Number
    let generateRandomNum = () => { return Math.floor(Math.random() * 4) + 1 };


    //RANDOM FACT
    dinos.forEach((el, i) => {

      function randomFact() {

        switch (generateRandomNum()) {
          case 1:
            return compareWeight(el.weight, humanObject.weight);
          case 2:
            return compareHeight(el.height, humanObject.height);
          case 3:
            return compareDiet(el.diet, humanObject.diet);
          case 4:
            return `This dino was alive at ${el.when}`;
        }
      }
      randomFact();


      // Create HTML Elements for Tiles
      const grid = document.getElementById("grid");
      const card = document.createElement("div");
      const header = document.createElement("h4");
      const picture = document.createElement("img");
      const fact = document.createElement("p");

      header.innerHTML = el.species;
      fact.innerHTML = randomFact();


      if (i === 4) {
        picture.setAttribute("src", `/images/human.png`)
        fact.innerHTML = el.fact;
      }
      else { picture.setAttribute("src", `./images/${el.species}.png`) };


      if (el.species === "Pigeon") { fact.innerHTML = el.fact };

      // Add tiles to DOM
      card.appendChild(header);
      card.appendChild(picture);
      card.appendChild(fact);
      card.classList.add("grid-item");
      grid.appendChild(card);
    });
  });
});


