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
let productArea = document.getElementById("print-products");

function buildDOMObj() {
	let productArr = products.map( function(currentProduct) {
		let categoryItem = categories.filter( function(category) {
			return category.id === currentProduct.category_id;
		})
		let prodObj = `${categoryItem[0].name}`;
		return prodObj
	})
	products.forEach( function(item, index) {
		products[index].department = productArr[index];
		productArea.innerHTML += buildCard(item);
	})
}
function buildCard(prodObj) {
	let card = `<div class="prodCard">
								<h3>${prodObj.name}</h3>
								<p>${prodObj.department}</p>
								<h2>${prodObj.price}</h2>
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










