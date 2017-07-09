//model

var cat = function(name) {
	var self = this;
	self.name = ko.observable(name);
	self.counter = ko.observable(0);
	self.src = ko.observable('cat.jpg');
}

var myView = function() {
	var self = this;
	self.tempCatName = ko.observable("");
	self.tempCounter = ko.observable(0);
	self.cats = ko.observableArray([]);

	self.cats.push(new cat("cat1"));
	self.cats.push(new cat("cat2"));
	self.cats.push(new cat("cat3"));
	self.cats.push(new cat("cat4"));

	self.currentCat = ko.observable(self.cats()[0]);

	self.showCat = function(clickedCat) {
		self.currentCat(clickedCat);
		self.tempCatName(self.currentCat().name());
		self.tempCounter(self.currentCat().counter());
	}

	self.incCounter = function() {
		self.currentCat().counter(self.currentCat().counter() + 1);
		self.tempCounter(self.currentCat().counter());
	};

	self.hideAdmin = ko.observable(false);

	self.alterHideAdmin = function() {
		if(self.hideAdmin()){
			self.hideAdmin(false);
		}
		else{
			self.hideAdmin(true);
		}
	}

	self.resetAdmin = function() {
		self.tempCatName(self.currentCat().name());
		self.tempCounter(self.currentCat().counter());
		self.hideAdmin(false);
	}

	self.saveAdmin = function(obj) {
		console.log(obj);
		self.currentCat().name(self.tempCatName());
		self.currentCat().counter(self.tempCounter());
		self.resetAdmin();
	}
}

ko.applyBindings(new myView());