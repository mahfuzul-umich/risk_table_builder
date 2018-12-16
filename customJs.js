// risk form elements
let risk = document.querySelector('#risk');
let riskCategory = document.querySelector('#risk-category');
let riskProbability = document.querySelector('#risk-probability');
let riskImpact = document.querySelector('#risk-impact');
let riskForm = document.querySelector('.risk-form');
var tableExist = false;
var rowscount = 0;

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
     sortTable(3);
}

function updateRisk() {
	let riskRow = riskToEdit.children;
	riskRow[0].innerText = risk.value;
	riskRow[1].innerText = riskCategory.value;
	riskRow[2].innerText = `${riskProbability.value}%`;
	riskRow[3].innerText = riskImpact.value;
     sortTable(3);
	exitEditMode();
}

function removeRisk(riskId) {
	if (isUpdating) return alert('Cannot remove or update risks while in update mode.');
	riskTableBody.removeChild(riskTableBody.querySelector(`#${riskId}`));
}

function sortTable(n) {
  var table,rows, switching, i, x, x2, y, y2, shouldSwitch, dir, switchcount = 0;
    
    

  table = document.getElementById("riskTable");
  switching = true;

    
    
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
     rows = table.rows;
    
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < rows.length -1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
        
      x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			
			x2 = rows[i].getElementsByTagName("TD")[n-1];
			y2 = rows[i + 1].getElementsByTagName("TD")[n-1];
     
        
    
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        } else if (x.innerHTML.toLowerCase() == y.innerHTML.toLowerCase()) {
					if (x2.innerHTML.toLowerCase() < y2.innerHTML.toLowerCase()) {
						//if so, mark as a switch and break the loop:
						shouldSwitch= true;
						break;
					}
				}
      } 
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } 
  }
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
     sortTable(3);
	riskForm.reset();
})