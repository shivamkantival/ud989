
// model

var data = function(){
	return {
		"catName" : "cat",
		"counter": 0,
		"url": "cat.jpg"
	}
}

var model;
var modelInit = function(totalCats) {
	var cats = [];
	var totalCatNumber = totalCats;
	for (var i = 0; i < totalCats; i++) {
		cats.push(data());
	}
	return {
		catclick: function(catNum) {
			cats[catNum].counter++;
			return cats[catNum].counter;
		},
		getCat: function(catNum) {
			return cats[catNum];
		},
		updateCat: function(catNum, catObj) {
            cats[catNum] = catObj;
		},
		getAllCatNames: function() {
			return cats.map((obj)=> {
                return obj.catName;
            });
		}
	}
}

// view

var viewCat = (function() {
	return {
        renderList: function(catNamesList) {
			var elem = document.getElementById("cat-names");
			elem.innerHTML = "";
			catNamesList.forEach(function(ob, catNum, cats) {
				elem.innerHTML +=`<li>
						<a href="#" onclick="javascript:interface.handleListClick(${catNum})">${ob}</a>
					</li>`
			});//todo render optimized
        },
		renderCat: function(catObj) {
			var elem = document.getElementById("image-container");
			elem.innerHTML = "";
			var imageElem = document.createElement("IMG");
			imageElem.setAttribute("src",""+catObj.url);
			imageElem.setAttribute("id","display-image");
			var catName = document.createElement("DIV");
			catName.innerHTML = "<h3>"+ catObj.catName + "</h3>";
			var textNode = document.createElement("P");
			textNode.setAttribute("id","display-count");
			textNode.innerHTML = catObj.counter+"";
			elem.appendChild(catName);
			elem.appendChild(imageElem);
			elem.appendChild(textNode);
            viewCat.hideAdmin(); //todo move to octopus
            //tod why not to extract again
			handleCatClick.addEventListener("click", interface.handleCatClick); //todo how context comes into play here
		},
		hideAdmin: function(){
			var elem = document.getElementById("adminForm");
			elem.style.visibility = "hidden";
        },
        alterAdmin: function() {
            var elem = document.getElementById("adminForm");
            if(elem.style.visibility === "hidden"){
                elem.style.visibility = "visible";
            }
            else {
                elem.style.visibility = "hidden";
            }
        },
		updateCounter: function(count) {
			var elem = document.getElementById("display-count");
			elem.innerHTML = ""+ count;
        },
        handleFormSave: function() {
            var catName = document.getElementById("formCatName").value;
            var counter = document.getElementById("formCatCounter").value;
            interface.saveAdminForm(catName, counter);
        },
        resetForm: function(catName, counter) {
            document.getElementById("formCatName").value = catName;
            document.getElementById("formCatCounter").value = counter;
        }
	}
})();

// interface
var interface;
var interfaceInit = function() {
    let currentCat = null;
    model = modelInit(5);
    viewCat.renderList(model.getAllCatNames());
    return {
        handleListClick: function(catNum) {
            currentCat = catNum;
            const catObj = model.getCat(catNum);
            viewCat.renderCat(catObj);
        },
		handleCatClick:function(catNum) {
            const counter = model.catclick(currentCat);
            viewCat.updateCounter(counter);
            viewCat.hideAdmin();
            this.a = true;
		},
		saveAdminForm: function(catName, count) {
            //todo create cat function
            const presentUrl = model.getCat(currentCat).url;
            const catObj = {
                "catName": catName,
                "counter":count,
                "url": presentUrl,
            };
        
			model.updateCat(currentCat, catObj);
            viewCat.renderCat(catObj);
            viewCat.renderList(model.getAllCatNames());
            viewCat.hideAdmin();
		},
        alterAdmin: function() {
            const catObj = model.getCat(currentCat);
            viewCat.resetForm(catObj.catName, catObj.counter);
            viewCat.alterAdmin(); 
        }
	}
};

window.onload = function() {
    interface = interfaceInit();
}