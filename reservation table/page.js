// model

var room = function(data) {
	var temp = [];
	data.forEach(function(value, iter, array) {
		temp.push(value);
	});
	return temp;
}

var roomList = (function() {
	var temp = [];
	temp.push(room([{"type":"Standard"}, {"cost":10,}, {"cost":15,}]));
	temp.push(room([{"type":"Luxury"}, {"cost":20,}, {"cost":25,}]));
	temp.push(room([{"type":"Supreme"}, {"cost":30,}, {"cost":35,}]));
	temp.push(room([{"type":"Supreme deluxe"}, {"cost":40,}, {"cost":45,}]));
	return {"data": temp,
			"numOfRows": temp.length,
			"numOfCols": 2
	};
})();




// view

var renderTable = function() {
	var tempIter;
	var elem;
	var table = document.getElementById("reservation-table");
	for (tempIter = 0; tempIter< roomList.numOfRows;tempIter++){
		elem= document.createElement('tr');
		elem.innerHTML+= `<th> ${roomList.data[tempIter][0].type} </th>`;
		for (var i = 1; i <= roomList.numOfCols;i++) {
			elem.innerHTML += `<td><input type="text" id="${tempIter}col${i}"></td>`;
			elem.innerHTML += `<td>${roomList.data[tempIter][i].cost}</td>`;
		}
		elem.innerHTML += `<td id="${tempIter}total"> </td>`
		table.appendChild(elem)	;
	}
	elem = document.createElement('tr');
	elem.innerHTML += `<td colspan="4">Grand Total</td>`;
	elem.innerHTML += `<td colspan="2" id="grand-total"></td>`;
	table.appendChild(elem);
}

renderTable();

var updateTable = (rowTotals, totalCost) => {
	let temp;
	rowTotals.forEach((sum, iteration) => {
		temp = document.getElementById(`${iteration}total`);
		temp.innerHTML = "" + rowTotal;
	});
	temp = document.getElementById(`grand-total`);
	temp.innerHTML = totalCost;
}

// octopus
var calcCharges = function() {
	var cols = roomList.numOfCols;
	var rows = roomList.numOfRows;
	var temp;
	var rowTotal = [];
	var tempRowTotal;
	var totalCost = 0;
	console.log("hello");
	for(var rowIter = 0;rowIter<rows;rowIter++){
		temRowTotal = 0;
		for(var colIter = 1;colIter<=cols;colIter++){
			temp = document.getElementById(`${rowIter}col${colIter}`).value;
			if(temp === ""){
				temp+=0;
			}
			else {
				tempRowTotal+= roomList.data[rowIter][colIter].cost*parseInt(temp);
			}
		}
		rowTotal.push(tempRowTotal);
		totalCost += tempRowTotal;
	}
	updateTable(rowTotal, totalCost);
}