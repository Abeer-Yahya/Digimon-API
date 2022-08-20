const Base_URL = "https://digimon-api.vercel.app/api/digimon";

// get search button from DOM
const searchButton = document.getElementById("searchButton");

// get search by name input from DOM
const searchFieldName = document.getElementById("searchFieldName");

// get search by level input from DOM
const searchFieldLevel = document.getElementById("searchFieldLevel");

class Digimon {
  constructor(name, level, image) {
    this.name = name;
    this.level = level;
    this.image = image;
  }
}

// fire event on click
searchButton.onclick = (event) => {
  // cancel default behavior (refresh page)
  event.preventDefault();

  // get search value
  const digimonName = searchFieldName.value;
  const digimonLevel = searchFieldLevel.value;

  if (digimonName && digimonLevel == "") {
    getDataByName(digimonName);
  } else if (digimonLevel && digimonName == "") {
    getDataByLevel(digimonLevel);
  } else {
    alert("You can search by one category at time!");
  }
};

// function to handle get data from server
function getDataByName(digimonName) {
  // fetch function take api URL as as parameter
  fetch(Base_URL + "/name/" + digimonName)
    // convert response to object by json() method
    .then((response) => response.json())
    // after we handle the response
    .then((data) => {
      // log the response as object
      console.log(data);

      // call function display and take data as parameter to represent the data by DOM Manipulation
      display(data[0]);
    });
}

// get div container to append child to it
let cardsDiv = document.getElementById("cardsDiv");

function display(data) {
  // create div container and set class name
  let divCol = document.createElement("div");
  divCol.className = "col-sm-3";
  cardsDiv.append(divCol);

  // create div container for the card
  let card = document.createElement("div");
  card.className = "card";
  divCol.append(card);

  let imgCard = document.createElement("img");
  imgCard.className = "card-img-top w-100";
  imgCard.style.width = "100px";
  imgCard.src = data.img;
  card.append(imgCard);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.append(cardBody);

  let cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = data.name;
  cardBody.append(cardTitle);

  let cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.setAttribute("style", "white-space: pre;");
  cardText.textContent = "- Level: " + data.level;
  cardBody.append(cardText);
}

async function getAllData() {
  const response = await fetch(Base_URL);
  if (response.status !== 200) {
    throw new Error("cannot fetch data");
  }

  let dataAsJson = response.json();
  return dataAsJson;
}
let digimonArray = [];
getAllData().then((data) => {
  for (let index = 20; index < 40; index++) {
    const element = data[index];
    let digimon = new Digimon(data.name, data.level, data.img);
    digimonArray.push(digimon);
    display(element);
  }
});

for (let index = 0; index < digimonArray.length; index++) {
  const element = digimonArray[index];
  display(element);
}
