var lastRepTime = 0; //holds time of most recent reports

window.onload = init;

function init() {
	setInterval(handleRefresh, 3000);
	handleRefresh();
}

function handleRefresh() {
	var url = "http://gumball.wickedlysmart.com" + //jsonp link
				"?callback=updateSales" + //use funct updS. when web server JS generated
				"&lastreporttime=" + lastRepTime + //removes duplicates
				"&random=" + (new Date()).getTime(); //tricks browser with random #s by making browser think it is new url all the time
	var newScriptElement = document.createElement("script");
	newScriptElement.setAttribute("src", url);
	newScriptElement.setAttribute("id", "jsonp");
	var oldScriptElement = document.getElementById("jsonp");
	var head = document.getElementsByTagName("head")[0]; //gets first tag name named head
	if (oldScriptElement == null) { //if oSE is null append nSE
		head.appendChild(newScriptElement);
	} else { // else there is old script el. replace it and pass new
		head.replaceChild(newScriptElement, oldScriptElement);
	}
}

function updateSales(sales) { //re using this function from web server
	var salesDiv = document.getElementById("sales");
	for (var i = 0; i < sales.length; i++) { //for sales > 0 keep going
		var sale = sales[i]; //assigning array of sales to new var
		var div = document.createElement("div");
		div.setAttribute("class", "saleItem");
		div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
		if (salesDiv.childElementCount == 0) {
			salesDiv.appendChild(div);
		} else {
			salesDiv.insertBefore(div, salesDiv.firstChild);
		}
	}

	if (sales.length > 0) {
		lastRepTime = sales[sales.length-1].time;
	}
}

