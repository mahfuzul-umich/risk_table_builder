let risk = document.querySelector('#risk');
let riskCategory = document.querySelector('#risk-category');
let riskProbability = document.querySelector('#risk-probability');
let riskImpact = document.querySelector('#risk-impact');
let riskForm = document.querySelector('.risk-form');
let riskTable = document.querySelector('.risk-table');
let riskTableBody = riskTable.querySelector('tbody');

riskForm.addEventListener('submit', (e) => {
	e.preventDefault();
	let riskRow = riskTableBody.insertRow(0);
	let riskCell = riskRow.insertCell(0);
	riskCell.style = 'max-width: 200px';
	let riskCategoryCell = riskRow.insertCell(1);
	let riskProbabilityCell = riskRow.insertCell(2);
	let riskImpactCell = riskRow.insertCell(3);
	let riskActions = riskRow.insertCell(4);
	
	riskCell.innerText = risk.value;
	riskCategoryCell.innerText = riskCategory.value;
	riskProbabilityCell.innerText = `${riskProbability.value}%`;
	riskImpactCell.innerText = riskImpact.value;
	riskActions.insertAdjacentHTML('afterbegin',  
		'<div class="btn-group">' +
			'<button type="button" class="btn btn-danger"><i class="fas fa-trash"></i></button><button type="button" class="btn btn-primary"><i class="fas fa-pen"></i></button>' + 
		'</div>'
 	);
	riskForm.reset();
})