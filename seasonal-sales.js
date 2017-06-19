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
let reqProducts = new XMLHttpRequest();
// let reqCategories = new XMLHttpRequest();

function displayProducts() {
	let prodArr = JSON.parse(event.target.responseText).products; //turns JSON into plain ol javascript object, .products returns an array based on what was in the object
	console.log("Products", prodArr)
}

reqProducts.addEventListener("load", displayProducts);

reqProducts.open("GET", "data/products.json");
reqProducts.send();