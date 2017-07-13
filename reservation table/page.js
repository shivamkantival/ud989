// model
let model;
const modelInit = function(){
	const room = (data) => {
		var temp = [];
		data.forEach(function(value, iter, array) {
			temp.push(value);
		});
		return temp;
	};
	let roomList = (() =>{
		var temp = [];
		temp.push(room([{"type":"Standard"}, {"cost":10,}, {"cost":15,}]));
		temp.push(room([{"type":"Luxury"}, {"cost":20,}, {"cost":25,}]));
		temp.push(room([{"type":"Supreme"}, {"cost":30,}, {"cost":35,}]));
		temp.push(room([{"type":"Supreme deluxe"}, {"cost":40,}, {"cost":45,}]));
		return {"data": temp,
		};
	})();
	const LocalValueCopy = [[0,0,0],
						[0,0,0],
						[0,0,0],
						[0,0,0]];
	let grandTotal = 0;

	return {
		"numOfRows": LocalValueCopy.length,
		"numOfCols": LocalValueCopy[0].length -1,
		"getLocalValueCopy": (rowNum) => {
			return LocalValueCopy[rowNum];
		},
		"updateRow": (rowNum, rowData) => {
			LocalValueCopy[rowNum] = rowData;
		},
		"getGlabalSum": (() => grandTotal),
		"updateGrandTotal": (newValue) => {
			grandTotal = newValue;
		},
		"getRoomList": (rowNum) => {
			return roomList.data[rowNum];
		}
	}
}

// interface
const interface = {
	"that": this,
	"getTotalRows": ()=> model.numOfRows,
	"getTotalCols": ()=> model.numOfCols,
	"getRowValues": (rowNum)=>model.getLocalValueCopy(rowNum),
	"getRowCosts": (rowNum) => model.getRoomList(rowNum),
	"getGrandSum": ()=> {return model.getGlabalSum()},
	"debounce":(() => {
	    let blockCall = false;
	    let timeoutEvent = null;
	    let latestTimeoutTime = null;
	    return (timeout, args = []) => {
	        timeout = timeout || 1000;
	        if(!blockCall) {
	            blockCall = true;
	            latestTimeoutTime = timeout;
	        }
	        else{
	        	clearTimeout(timeoutEvent);
	        }
	        timeoutEvent = setTimeout(function() {
	            blockCall = false;
	            interface.updateRowData(args);
	        }, timeout);
	    }
	})(),
	"updateRowData": (args)=> {
		const totalRows = model.numOfRows;
		const totalCols = model.numOfCols;
		const rowNum = args[0];
		const colNum = args[1];
		const newValue = view.getnewValue(rowNum, colNum);
		const oldRowValue = model.getLocalValueCopy(rowNum);
		const rowCosts = model.getRoomList(rowNum);
		const newRoomCost = rowCosts[colNum].cost * newValue;
		const aggregateRowCost = oldRowValue[totalCols] + (newRoomCost - oldRowValue[colNum-1]);
		let newRowValue= oldRowValue.map(x=> x);
		newRowValue[colNum-1] = newRoomCost;
		newRowValue[totalCols] = aggregateRowCost;
		model.updateRow(rowNum, newRowValue);
		const newGrandTotal = model.getGlabalSum() + (newRoomCost - oldRowValue[colNum-1]);
		model.updateGrandTotal(newGrandTotal);
		view.updateRowTotal(rowNum, aggregateRowCost);
		view.updateGrandTotal(newGrandTotal);
	}
}


// view
const view = {
	"renderTable": ()=> {
		const totalRows = interface.getTotalRows();
		const totalCols = interface.getTotalCols();
		const table = document.getElementById("reservation-table");
		let tempRowIter;
		let tempColIter;
		let temp;
		let rowValues;
		let rowCosts;
		const grandSum = interface.getGrandSum();
		for(tempRowIter=0;tempRowIter < totalRows;tempRowIter++) {
			rowCosts = interface.getRowCosts(tempRowIter);
			rowValues = interface.getRowValues(tempRowIter);
			elem= document.createElement('tr');
			elem.innerHTML+= `<th> ${rowCosts[0].type} </th>`;
			for (tempColIter = 1; tempColIter <= totalCols;tempColIter++) {
				elem.innerHTML += `<td><input type="number" min="0" id="${tempRowIter}col${tempColIter}" value="${rowValues[tempColIter-1]}" oninput="javascript:interface.debounce(400, [${tempRowIter}, ${tempColIter}])"></td>`;
				elem.innerHTML += `<td>${rowCosts[tempColIter].cost}</td>`;
			}
			elem.innerHTML += `<td id="${tempRowIter}total">${rowValues[tempColIter-1]}</td>`
			table.appendChild(elem)	;
		}
		elem = document.createElement('tr');
		elem.innerHTML += `<td colspan="4">Grand Total</td>`;
		elem.innerHTML += `<td colspan="2" id="grand-total">${grandSum}</td>`;
		table.appendChild(elem);
	},
	"getnewValue": (rowNum, colNum) => document.getElementById(`${rowNum}col${colNum}`).value,
	"updateRowTotal":(rowNum, newValue)=>{
		const elem = document.getElementById(`${rowNum}total`);
		elem.innerHTML = newValue + "";
	},
	"updateGrandTotal": (newValue)=> {
		const elem = document.getElementById('grand-total');
		elem.innerHTML = newValue + "";
	},
}

// initialise

window.onload = function() {
	model = modelInit();
	view.renderTable();
}
