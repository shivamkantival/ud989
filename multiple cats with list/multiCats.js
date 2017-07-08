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
		imageElement.setAttribute("src","cat" + catNum + ".jpg");
		// var textPart = document.getElementById("display-count");
		var textPart = imageElement.nextElementSibling;
		counter[catNum-1].incCount();
		textPart.innerHTML = counter[catNum-1].getCount() + "";
		console.log(counter[catNum-1].getCount());
	}
})();

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
		console.log("hello");
	}

}());