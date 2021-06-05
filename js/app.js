/* eslint-disable new-cap */
'use strict';

//global variables
let allProducts = [];
let clicks = 0;
let clicksAllowed = 25;
let productValidation = [];
let renderLineUp = [];
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let imageOne = document.getElementById('imageOne');
let imageTwo = document.getElementById('imageTwo');
// eslint-disable-next-line no-unused-vars
let imageThree = document.getElementById('imageThree');



function makeProduct(product, fileExtension = 'jpg') {
  this.product = product;
  this.src = `img/${product}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}
let retrievedProducts = localStorage.getItem('products');
if(retrievedProducts){
  let parsedProducts = JSON.parse(retrievedProducts);
  allProducts = parsedProducts;
} else {
  new makeProduct('bag');
  new makeProduct('banana');
  new makeProduct('bathroom');
  new makeProduct('boots');
  new makeProduct('breakfast');
  new makeProduct('bubblegum');
  new makeProduct('chair');
  new makeProduct('cthulhu');
  new makeProduct('dog-duck');
  new makeProduct('dragon');
  new makeProduct('pen');
  new makeProduct('pet-sweep');
  new makeProduct('scissors');
  new makeProduct('shark');
  new makeProduct('sweep', 'png');
  new makeProduct('tauntaun');
  new makeProduct('unicorn');
  new makeProduct('water-can');
  new makeProduct('wine-glass');
}



function selectRandomProductIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderRandomProducts() {

  while (productValidation.length < 6) {
    let uniqueProduct = selectRandomProductIndex();
    while (!productValidation.includes(uniqueProduct)) {
      productValidation.push(uniqueProduct);
    }
  }
  let productOne = productValidation.shift();
  let productTwo = productValidation.shift();
  let productThree = productValidation.shift();

  // console.log(productValidation);

  imageOne.src = allProducts[productOne].src;
  imageOne.alt = allProducts[productOne].name;
  allProducts[productOne].views++;

  imageTwo.src = allProducts[productTwo].src;
  imageTwo.alt = allProducts[productTwo].name;
  allProducts[productTwo].views++;

  imageThree.src = allProducts[productThree].src;
  imageThree.alt = allProducts[productThree].name;
  allProducts[productThree].views++;
}

function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('click on an IMAGE please');
  }
  clicks++;
  let clickedProduct = event.target.alt;
  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }
  renderRandomProducts();
  // console.log('test');

  if (clicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleProductClick);
    renderChart();
    let stringifiedProducts = JSON.stringify(allProducts);
    localStorage.setItem('products', stringifiedProducts);
  }
}

function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times.`;
    ul.appendChild(li);
  }
}

function handleButtonClick(event) { //eslint-disable-line
  if (clicks === clicksAllowed) {
    renderResults();
  }
}

function renderChart() {
  let clicksArray = [];
  let viewsArray = [];
  let productsArray = [];
  for (let i = 0; i < allProducts.length; i++) {
    clicksArray.push(allProducts[i].clicks);
    viewsArray.push(allProducts[i].views);
    productsArray.push(allProducts[i].product);
  }
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productsArray,
      datasets: [{
        label: '# of Votes',
        data: clicksArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: viewsArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


// console.log('${clicksarray} 
// ${viewsArray} 
// ${productsArray}`);


renderRandomProducts();

myContainer.addEventListener('click', handleProductClick);
myButton.addEventListener('click', handleButtonClick);
// imageOne.addEventListener('click', handleProductClick);
// imageTwo.addEventListener('click', handleProductClick);
// imageThree.addEventListener('click', handleProductClick);

