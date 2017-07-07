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

window.onload = function() {
	var counters = (function() {
		var counter1 = createCounter();
		var counter2 = createCounter();
		var count = []
		count.push(counter1);
		count.push(counter2);
		return count;
	})();
	document.getElementById("counter-1").innerHTML = "0";
	document.getElementById("counter-2").innerHTML = "0";
	document.getElementById("cat-image-1").addEventListener("click", function() {
		counters[0].incCount();
		document.getElementById("counter-1").innerHTML = "" + counters[0].getCount();
	});

	document.getElementById("cat-image-2").addEventListener("click", function() {
		counters[1].incCount();
		document.getElementById("counter-2").innerHTML = "" + counters[1].getCount();
	});
}

console.log(counters);