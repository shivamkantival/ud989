function createCounter(){
	var count = 0;
	return {
		getCount: function(){
			return count;
		},
		incCount: function(){
			count++;
		}
	}
}

showCat = (function() {
	var counter = [];
	for (var i = 0; i < 5; i++) {
		counter.push(createCounter());
	}
	return function(catNum) {
		var imageElement = document.getElementById("display-image");
		imageElement.setAttribute("src","cat"+catNum+".jpg");
		var textPart = document.getElementById("display-count")
		counter[catNum-1].incCount();
		textPart.innerHTML = counter[catNum-1].getCount() + "";
		console.log(counter[catNum-1].getCount());
	}
})();