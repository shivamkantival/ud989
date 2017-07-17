(function() {

	window.addEventListener("resize", resizeThrottler, false);

	var resizeTimeout;
	function resizeThrottler() {
		// ignore resize events as long as an actualResizeHandler execution is in the queue
		if ( !resizeTimeout ) {
			resizeTimeout = setTimeout(function() {
				resizeTimeout = null;
				actualResizeHandler();
		 
			 // The actualResizeHandler will execute at a rate of 15fps
			 }, 66);
		}
	}

	function actualResizeHandler() {
		var elem = document.getElementById("page").style.height = window.innerHeight;
	}

}());

// model

var data = function(){
	return {
		"catName" : "cat",
		"counter": 0,
		"url": "cat.jpg"
	}
}
var modelInit;
var model = function(totalCats) {
	var cats = [];
	var currentCat = null;
	var totalCatNumber = totalCats;
	for (var i = 0; i < totalCats; i++) {
		cats.push(data());
	}
	return {
		catclick: function() {
			cats[currentCat].counter++;
			return cats[currentCat].counter;
		},
		getCat: function() {
			return cats[currentCat];
		},
		updateCurrentCatPointer: function(catNum){
			currentCat = catNum;
		},
		updateCurrentCat: function(name, counter) {
			var temp = data();
			temp.catName = name;
			temp.counter = counter;
			temp.url = cats[currentCat].url;
			cats[currentCat] = temp;
		},
		getPointerValue: function() {
			return currentCat;
		},
		getAllCats: function() {
			return cats;
		}
	}
}

// view

var viewList = (function() {
	return {
		updateList: function() {
			var temp = interface.getAllCats();
			var elem = document.getElementById("cat-names");
			elem.innerHTML = "";
			temp.forEach(function(ob, catNum, cats) {
				elem.innerHTML +=`<li>
						<a href="#" onclick="javascript:viewCat.showCat(` + catNum + `)">`+ ob.catName +`</a>
					</li>`
			});
		}
	}
})();

var viewCat = (function() {
	return {
		showCat: function(catNum) {
			catToDisplay = interface.getCat(catNum);
			var elem = document.getElementById("image-container");
			elem.innerHTML = "";
			var imageElem = document.createElement("IMG");
			imageElem.setAttribute("src",""+catToDisplay.url);
			imageElem.setAttribute("id","display-image");
			var catName = document.createElement("DIV");
			catName.innerHTML = "<h3>"+ catToDisplay.catName + "</h3>";
			var textNode = document.createElement("P");
			textNode.setAttribute("id","display-count");
			textNode.innerHTML = catToDisplay.counter+"";
			elem.appendChild(catName);
			elem.appendChild(imageElem);
			elem.appendChild(textNode);
			viewCat.hideAdmin();
			document.getElementById("display-image").addEventListener("click",function(){
				interface.incCounter();
			});
		},
		showAdmin: function(){
			interface.readyForm();
			var elem = document.getElementById("adminForm");
			elem.style.visibility = "visible";
		},
		hideAdmin: function(){
			var elem = document.getElementById("adminForm");
			elem.style.visibility = "hidden";
		},
		updateCounter: function(count) {
			var elem = document.getElementById("display-count");
			elem.innerHTML = ""+ count;
		}
	}
})();

// interface

var interface = (function() {
	return {
		getAllCats: function() {
			return modelInit.getAllCats();
		},
		incCounter: function() {
			var temp = modelInit.catclick();
			viewCat.updateCounter(temp);
		},
		getCat:function(catNum) {
			modelInit.updateCurrentCatPointer(catNum);
			return modelInit.getCat();
		},
		readyForm: function() {
			var currentCat = modelInit.getCat();
			document.getElementById("formCatName").value = currentCat.catName + "";
			document.getElementById("formCatCounter").value = currentCat.counter + "";
		},
		updateCurrentCat: function() {
			var catName = document.getElementById("formCatName").value;
			var counter = document.getElementById("formCatCounter").value;
			modelInit.updateCurrentCat(catName,counter);
			viewList.updateList();
			viewCat.showCat(modelInit.getPointerValue());
		}
	}
})();

window.onload = function() {
	modelInit = model(5);
	viewList.updateList();
}