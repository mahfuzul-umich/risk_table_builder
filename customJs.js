//risk form elements
let risk = document.querySelector('#risk');
let riskCategory = document.querySelector('#risk-category');
let riskProbability = document.querySelector('#risk-probability');
let riskImpact = document.querySelector('#risk-impact');
let riskForm = document.querySelector('.risk-form');

//risk table elements
let riskTable = document.querySelector('.risk-table');
let riskTableBody = riskTable.querySelector('tbody');

let riskId = 0;
let isUpdating = false;
let riskToEdit = null; //this will store the risk element of the risk that will be edited so when user submits again, it will edit the correct row

function clearForm() {
	riskForm.reset();
}

function exitEditMode() {
	isUpdating = false;
	riskToEdit.classList.toggle('alert-secondary');
	riskToEdit = null;
	document.querySelector('.update-warning').style = 'display: none';
	riskForm.reset();
}

function editMode(riskId) {
	if (isUpdating) return alert('Cannot remove or update risks while in update mode.');
	document.querySelector('.update-warning').style = 'display: block;margin-top: 15px';
	riskToEdit = riskTableBody.querySelector(`#${riskId}`);
	isUpdating = true;
	riskToEdit.classList.toggle('alert-secondary'); //highlight risk row so user knows what risk is being updated
	let riskRow = riskToEdit.children; //risk row to be updated
	risk.value = riskRow[0].innerText;
	riskCategory.value = riskRow[1].innerText;
	riskProbability.value = riskRow[2].innerText.replace(/\D/g, ""); //regex to replace the percent symbol at the end of the string
	riskImpact.value = riskRow[3].innerText;
}

function updateRisk() {
	let riskRow = riskToEdit.children;
	riskRow[0].innerText = risk.value;
	riskRow[1].innerText = riskCategory.value;
	riskRow[2].innerText = `${riskProbability.value}%`;
	riskRow[3].innerText = riskImpact.value;
	exitEditMode();
}

function removeRisk(riskId) {
	if (isUpdating) return alert('Cannot remove or update risks while in update mode.');
	riskTableBody.removeChild(riskTableBody.querySelector(`#${riskId}`));
}

riskForm.addEventListener('submit', (e) => {
	e.preventDefault();
	
	if (isUpdating) return updateRisk(); //if isUpdating flag is true, then we know user is in edit mode. therefore after he clicks submit, it should update the appropriate risk row
	
	//create risk row and insert cells
	let riskRow = riskTableBody.insertRow(0);
	riskRow.id = `row-${riskId}`; //assign each row a unique id so it can be updated/deleted
	let riskCell = riskRow.insertCell(0);
	riskCell.style = 'max-width: 200px';
	let riskCategoryCell = riskRow.insertCell(1);
	let riskProbabilityCell = riskRow.insertCell(2);
	let riskImpactCell = riskRow.insertCell(3);
	let riskActions = riskRow.insertCell(4);
	
	//change cell content to values taken from the risk form elements
	riskCell.innerText = risk.value;
	riskCategoryCell.innerText = riskCategory.value;
	riskProbabilityCell.innerText = `${riskProbability.value}%`;
	riskImpactCell.innerText = riskImpact.value;
	riskActions.insertAdjacentHTML('afterbegin',  
		'<div class="btn-group">' +
			`<button type="button" class="btn btn-danger" onclick="removeRisk('${riskRow.id}')"><i class="fas fa-trash"></i></button>` + 
			`<button type="button" class="btn btn-primary" onclick="editMode('${riskRow.id}')"><i class="fas fa-pen"></i></button>` + 
		'</div>'
 	);
	riskId++
	riskForm.reset();
})