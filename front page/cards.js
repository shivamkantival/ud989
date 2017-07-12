function updateCards() {
	var form = new FormData(document.getElementById("number-form"));
	var inputValue = form.get("number-of-cards");
	var html  =`<span class="label">
					<form id="number-form">
						<input type="text" name="number-of-cards">
						<button type="button" onclick="updateCards()" style="background: #5fba7d; color: white;">Update cards</button>
					</form>
				</span>` ;
	for (i=0;i<inputValue;i++) {
		html +=`<div class="card">
					<img src="img_avatar.png" alt="Avatar" style="width:100%">
					<div>
					    <h4><b>John Doe</b></h4> 
					    <p>Architect & Engineer</p>
					</div>
				</div>`;
	}
	document.getElementById("card-holder").innerHTML = html;
}