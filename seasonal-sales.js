// Your job is to build a web page that lists all of the products, the name of the
// department it's in, and the price. Additionally, put a <select> element at the
// top of the page that contains all possible values of the season_discount key in
// the categories file. As soon as you select one of the seasons, all prices on the
// page should immediately be discounted by the corresponding percentage.

// For example, when Spring is chosen, all products in the corresponding Household
// category should have their prices updated with a 15% discount off the base price.

// The two JSON representations above should be in two files: products.json, and
// categories.json. You should load both files via XHRs and store the contents in
// two different JavaScript variables in your code.

// Use JSON Lint to validate your JSON documents.

let products = null;
let categories = null;
let productWrapper = document.getElementById("print-products");

function changePriceOnPage() {

}

function hearSelectBox(cat) { //only needs to be a event listener that calls calcDiscount
	let select = document.getElementById("discount-menu");
	select.addEventListener("change", function() {
		calcDiscount(cat);
	})
}

function calcDiscount() { //compare selected index with category_id, also dynamically generate discount number
	let catArr = categories.map( function(category) {
		return category.discount;
	})
	let productArr = products.map( function(currentProduct) {
		if (currentProduct.category_id === 1 && document.getElementById("discount-menu").selectedIndex === 1) {
			let discountOne = +(currentProduct.price - currentProduct.price * catArr[0]).toFixed(2);
			console.log(discountOne);
		} else if (currentProduct.category_id === 2 && document.getElementById("discount-menu").selectedIndex === 2) {
			let discountTwo = +(currentProduct.price - currentProduct.price * catArr[1]).toFixed(2);
			console.log(discountTwo);
		} else if (currentProduct.category_id === 3 && document.getElementById("discount-menu").selectedIndex === 3) {
			let discountThree = +(currentProduct.price - currentProduct.price * catArr[2]).toFixed(2);
			console.log(discountThree);
		}
	})
	changePriceOnPage();
}

function populateSelectBox() {
	let box1 = document.getElementById("option1");
	let box2 = document.getElementById("option2");
	let box3 = document.getElementById("option3");
	let catArr = categories.map( function(category) {
		return category.season_discount;
	})
	box1.innerHTML = catArr[0];
	box2.innerHTML = catArr[1];
	box3.innerHTML = catArr[2];
}

function displayProducts(productArr) {
	let cardArr = productArr.map( function(product) {
		return buildCard(product);
	})
  cardArr.forEach( function(card) {
  let cardWrapper = document.createElement("article");
  cardWrapper.innerHTML = card;
  productWrapper.appendChild(cardWrapper);
	})
}

function buildDOMObj() {
	let productArr = products.map( function(currentProduct) {
		let categoryItem = categories.filter( function(category) {
			return category.id === currentProduct.category_id;
		})
		let prodObj = {
			dept: categoryItem[0].name,
			name: currentProduct.name,
      price: currentProduct.price,
      catId: currentProduct.category_id,
		}
		return prodObj
	})
	displayProducts(productArr)
}

function buildCard(prodObj) {
	let card = `<div class="prodCard">
								<h3>${prodObj.name}</h3>
								<p>${prodObj.department}</p>
								<h2 class="price">$${prodObj.price}</h2>
							</div>`
	return card;
}

function setProducts(productsJSON) {
	products = JSON.parse(event.target.responseText).products;
	getCategories();
}
function setCategories() {
	categories = JSON.parse(event.target.responseText).categories;
	buildDOMObj();
	populateSelectBox();
	hearSelectBox(categories);
}
function getCategories() {
	let reqCategories = new XMLHttpRequest();
	reqCategories.addEventListener("load", setCategories);
	reqCategories.open("GET", "data/categories.json");
	reqCategories.send();
}
function getProducts() {
	let reqProducts = new XMLHttpRequest();
	reqProducts.addEventListener("load", setProducts);
	reqProducts.open("GET", "data/products.json");
	reqProducts.send();
}
getProducts();













