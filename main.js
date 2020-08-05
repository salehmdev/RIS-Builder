
//Global variables
var idCounter = 1;
var numberOfTables = 0;
var editMode = false;
var oldElm;

var riskIdsList = new Array();

var tableExport = [];   // Global variable to store each table's html


// input Values variables
var oldRiskIdValue = ""
var riskIDValue = "";
var dateValue = "";
var ProbabilityValue = "";
var ImpactValue = "";
var descriptionValue = "";
var Refinement_contextValue = "";
var Mitigation_monitoringValue = "";
var Management_contingencyValue = "";
var TriggerValue = "";
var Current_statusValue = "";
var Current_status_dateValue = "";
var OriginatorValue = "";
var Assigned_byValue = "";


// elements
var riskIDTopElem;
var riskIDElem;
var dateElem;
var ProbabilityElem;
var ImpactElem;
var descriptionElem;
var Refinement_contextElem;
var Mitigation_monitoringElem;
var Management_contingencyElem;
var TriggerElem;
var Current_statusElem;
var Current_status_dateElem;
var OriginatorElem;
var Assigned_byElem;

/*
// id of each input
var riskIdId;
var dateId;
var ProbabilityId;
var ImpactId;
var descriptionId;
var Refinement_contextId;
var Mitigation_monitoringId;
var Management_contingencyId;
var TriggerId;
var Current_statusId;
var Current_status_dateId;
var OriginatorId;
var Assigned_byId;
*/



$(document).ready(function(){
	$("#note-warning").hide();

    // Export project button clicked
    // submit project button clicked
	
	
	
	
	//_____________________________________________
	// Get the modal
	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal 
	btn.onclick = function() {
		
		if(numberOfTables >= 20){
			alert("Number of tables exceeded the limit 20 tables");
		} else {
			modal.style.display = "block";
		}
		
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
		resetFormValues();
		editMode = false;
	}
	
	
	// when the user clicks on cancel, close the model
	$("#cancelBTN").click(function(){
        //location.href='sheet.html';
        modal.style.display = "none";
		resetFormValues();
		editMode = false;
    });

	//End of the model code
	//__________________________________
	
	
	//
	
	$("#riskID").change(function(){
		
		if(checkForDuplicates($("#riskID").val())){
			//$("#submitBTN").disable(true);
			$('#submitBTN').prop('disabled', true);
		} else {
			//$("#submitBTN").disable(false);
			$('#submitBTN').prop('disabled', false);
		}
	});
	
	
	
	// code for grabbing info for adding new RIS
	// to get values from the modal box
	$('.modal-content form').on('submit', function(){
		
		if(editMode == false){
			var riskID = $('input[name=riskID]');
			var riskDate = $('input[name=date]');
			var probability = $('input[name=Probability]');
			//var impact = $('input[name=Impact]');
			var impact = $('select[name="Impact"]');
			var description = $('textarea[name=description]');
			var refinementContext = $('textarea[name=Refinement-context]');
			var mitigationMonitoring = $('textarea[name=Mitigation-monitoring]');
			var managementContingency = $('textarea[name=Management-contingency]');
			var trigger = $('input[name=Trigger]');
			var currentStatus = $('input[name=Current-status]');
			var currentStatusDate = $('input[name=Current-status-date]');
			var originator = $('input[name=Originator]');
			var assignedBy = $('input[name=Assigned-by]');

			//$('ul').append('<li>'+ riskID.val() + '</li>');


			// try code
			$( function() {
				$( "#accordion" ).accordion({
					header: "> div > h3",
					collapsible: true
				})
				.sortable({
					axis: "y",
					handle: "h3",
					stop: function( event, ui ) {
					  // IE doesn't register the blur when sorting
					  // so trigger focusout handlers to remove .ui-state-focus
					  ui.item.children( "h3" ).triggerHandler( "focusout" );

					  // Refresh accordion to handle new order
					  $( this ).accordion( "refresh" );
					}
				  });
			} );
			// end of try code
			
			
			// tables code
			var insertTable = '<div class="RIS-group" id="RIS-group-' + idCounter +  '">' + 
							'<h3  id="riskIDTop-' + idCounter + '"><b>Risk ID:</b> ' + riskID.val() + '</h3>' + 
							'<div class="table-container">' + 
								   '<button class="edit-delete-btn delete-btn" value="' + idCounter + '" onclick="deleteThisRIS(this);">Delete</button>' +
								   '<button class="edit-delete-btn edit-btn" value="' + idCounter + '" onclick="editThisRIS(this);">Edit</button>' + 
							'<table class="RIS-table">' +
								'<col width=25%>' +
								'<col width=25%>' +
								'<col width=25%>' +
								'<col width=25%>' +
								'<tr>' +
									'<td id="riskID-' + idCounter + '"><b>Risk ID:</b> ' + riskID.val() + '</td>' +
									'<td id="riskDate-' + idCounter + '"><b>Date:</b> ' + riskDate.val() + '</td>' +
									'<td id="probability-' + idCounter + '"><b>Probability:</b> ' + probability.val() + '</td>' +
									'<td id="impact-' + idCounter + '"><b>Impact:</b> ' + impact.val() + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td id="description-' + idCounter + '" colspan="4"><b>Description:</b> ' + description.val() + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td  id="refinementContext-' + idCounter + '" colspan="4"><b>Refinement/Context:</b> ' + refinementContext.val() + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td id="mitigationMonitoring-' + idCounter + '" colspan="4"><b>Mitigation/Monitoring:</b> ' + mitigationMonitoring.val() + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td  id="managementContingency-' + idCounter + '" colspan="2"><b>Management/Contingency:</b> ' + managementContingency.val() + '</td>' +
								   '<td  id="trigger-' + idCounter + '" colspan="2"><b>Trigger:</b> ' + trigger.val() + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td id="currentStatus-' + idCounter + '" colspan="2"><b>Current Status:</b> ' + currentStatus.val() + '</td>' +
								   '<td id="currentStatusDate-' + idCounter + '" colspan="2"><b>Current Status Date:</b> ' + currentStatusDate.val() + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td id="originator-' + idCounter + '" colspan="2"><b>Originator:</b> ' + originator.val() + '</td>' +
									'<td id="assignedBy-' + idCounter + '" colspan="2"><b>Assigned By:</b> ' + assignedBy.val() + '</td>' +
								'</tr>' +
							'</table>' +
						'</div>';// end of append code
			
			//To export table without buttons
			var insertTableNoButtons = '<div class="RIS-group" id="RIS-group-' + idCounter +  '">' + 
							'<div class="table-container">' +
							'<table class="RIS-table">' +
								'<col width=25%>' +
								'<col width=25%>' +
								'<col width=25%>' +
								'<col width=25%>' +
								'<br><br><br>' +
								'<tr>' +
									'<td id="riskID-' + idCounter + '"><b>Risk ID:</b> ' + riskID.val() + '</td>' +
									'<td id="riskDate-' + idCounter + '"><b>Date:</b> ' + riskDate.val() + '</td>' +
									'<td id="probability-' + idCounter + '"><b>Probability:</b> ' + probability.val() + '</td>' +
									'<td id="impact-' + idCounter + '"><b>Impact:</b> ' + impact.val() + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td id="description-' + idCounter + '" colspan="4"><b>Description:</b> ' + description.val() + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td  id="refinementContext-' + idCounter + '" colspan="4"><b>Refinement/Context:</b> ' + refinementContext.val() + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td id="mitigationMonitoring-' + idCounter + '" colspan="4"><b>Mitigation/Monitoring:</b> ' + mitigationMonitoring.val() + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td  id="managementContingency-' + idCounter + '" colspan="2"><b>Management/Contingency:</b> ' + managementContingency.val() + '</td>' +
								   '<td  id="trigger-' + idCounter + '" colspan="2"><b>Trigger:</b> ' + trigger.val() + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td id="currentStatus-' + idCounter + '" colspan="2"><b>Current Status:</b> ' + currentStatus.val() + '</td>' +
								   '<td id="currentStatusDate-' + idCounter + '" colspan="2"><b>Current Status Date:</b> ' + currentStatusDate.val() + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td id="originator-' + idCounter + '" colspan="2"><b>Originator:</b> ' + originator.val() + '</td>' +
									'<td id="assignedBy-' + idCounter + '" colspan="2"><b>Assigned By:</b> ' + assignedBy.val() + '</td>' +
								'</tr>' +
							'</table>' +
						'</div>';// end of append code
			
			// Append the construced tables
			if(numberOfTables == 0){
				tableExport[idCounter] = insertTableNoButtons;   // JS arrays will make a new index for a value if the index doesn't already exist
			}else{
				tableExport[idCounter] = insertTableNoButtons;
			};
        
        	$('#accordion').append(insertTable);

			// add the risk ID to the array of the risk Id's
			riskIdsList.push(riskID.val());
			
			// to count ID number
			idCounter++;
			// to count number of added tables
			numberOfTables++;


			riskID.val('');
			riskDate.val('');
			probability.val('');
			impact.val('');
			description.val('');
			refinementContext.val('');
			mitigationMonitoring.val('');
			managementContingency.val('');
			trigger.val('');
			currentStatus.val('');
			currentStatusDate.val('');
			originator.val('');
			assignedBy.val('');
			// end of tables code


			// refresh the accordion
        	$("#accordion").accordion( "refresh" );
        	// end of refreshing

			// to make the modal box disappear
			//$(this).parent().hide();
			
			resetFormValues();
			modal.style.display = "none";
			return false;
			}
			else
			{
				// it is on edit mode
				// put code in here for updating data
				updateValues();
				editTableInExport();
				editMode = false;

				riskIdsList.pop(oldRiskIdValue);
				riskIdsList.push(riskIDValue);


				resetFormValues();
				modal.style.display = "none";
				return false;
		}
		
		
	});
	// End of code for grabbing info for adding new RIS
	

    $( function() {
        $( ".date" ).datepicker();
    });
	
	// to delete an RIS
	/*
	function deleteThisRIS(elt){
		var elem = document.getElementById(elt);
    	return elem.parentNode.removeChild(elem);
	};
	*/
	
	
	
	
	
	// Export to pdf function
    $("#exportProject-btn").click(function(){
        
        if(numberOfTables != 0)
            {
                localStorage.setItem("_tables", JSON.stringify(tableExport)); // temp storage to deliver variable to next page, stores tableExport into tables_

                window.open(
                  'export.html',
                  '_blank' // <- This is what makes it open in a new window.
                );
            }else{
                alert("Error: There must be at least 1 RIS before exporting.");
            }
        
    });
	

    
}); // end of doc ready



//________________________________________________________________________________________
// functions


// delete RIS function
function deleteThisRIS(elt) {
	
	//alert("Number of tables are: " + numberOfTables);
	var divID = elt.value;
	
	var ElemOfRiskID = document.getElementById("riskID-" + divID);
	
	var riskIdDigit = (ElemOfRiskID.innerHTML).substring(16);
	
	
	
	
	var message = "Are you sure you want to delete Risk ID: " + riskIdDigit + "?";
	
	// check for confirmation, if yes then delete risk id, otherwise do nothing
	if (confirm(message)){
		
		// delete this digit from the riskIds list
		riskIdsList.pop(riskIdDigit);
		var elem = document.getElementById("RIS-group-" + divID);
		numberOfTables--;
		//alert("Number of tables are: " + numberOfTables);
		hideOrShowGreeting();
		delete tableExport[divID];  // This will leave 'undefined' in the index that was deleted
		return elem.parentNode.removeChild(elem); 
	}
	

	      
};


// edit RIS function
function editThisRIS(elt) {
	editMode = true;

	openModelBox();
	
	var divID = elt.value;
	oldElm = elt;
	
	// get the elements of the table
	riskIDTopElem = document.getElementById("riskIDTop-" + divID);
	riskIDElem = document.getElementById("riskID-" + divID);
	dateElem = document.getElementById("riskDate-" + divID);
	ProbabilityElem = document.getElementById("probability-" + divID);
	ImpactElem = document.getElementById("impact-" + divID);
	descriptionElem = document.getElementById("description-" + divID);
	Refinement_contextElem = document.getElementById("refinementContext-" + divID);
	Mitigation_monitoringElem = document.getElementById("mitigationMonitoring-" + divID);
	Management_contingencyElem = document.getElementById("managementContingency-" + divID);
	TriggerElem = document.getElementById("trigger-" + divID);
	Current_statusElem = document.getElementById("currentStatus-" + divID);
	Current_status_dateElem = document.getElementById("currentStatusDate-" + divID);
	OriginatorElem = document.getElementById("originator-" + divID);
	Assigned_byElem = document.getElementById("assignedBy-" + divID);
	
	
	// get the values of the elements of the table
	riskIDValue = (riskIDElem.innerHTML).substring(16);
	oldRiskIdValue = riskIDValue;
	dateValue = (dateElem.innerHTML).substring(13);
	ProbabilityValue = (ProbabilityElem.innerHTML).substring(20);
	ImpactValue = (ImpactElem.innerHTML).substring(15);
	descriptionValue = (descriptionElem.innerHTML).substring(20);
	Refinement_contextValue = (Refinement_contextElem.innerHTML).substring(27);
	Mitigation_monitoringValue = (Mitigation_monitoringElem.innerHTML).substring(30);
	Management_contingencyValue = (Management_contingencyElem.innerHTML).substring(31);
	TriggerValue = (TriggerElem.innerHTML).substring(16);
	Current_statusValue = (Current_statusElem.innerHTML).substring(23);
	Current_status_dateValue = (Current_status_dateElem.innerHTML).substring(28);
	OriginatorValue = (OriginatorElem.innerHTML).substring(19);
	Assigned_byValue = (Assigned_byElem.innerHTML).substring(20);
	
	
	// // set the values on the input to the values we got from the table
	$("#riskID").val(riskIDValue);
	$("#date").val(dateValue);
	$("#Probability").val(ProbabilityValue);
	$("#Impact").val("Low");
	$("#description").val(descriptionValue);
	$("#Refinement-context").val(Refinement_contextValue);
	$("#Mitigation-monitoring").val(Mitigation_monitoringValue);
	$("#Management-contingency").val(Management_contingencyValue);
	$("#Trigger").val(TriggerValue);
	$("#Current-status").val(Current_statusValue);
	$("#Current-status-date").val(Current_status_dateValue);
	$("#Originator").val(OriginatorValue);
	$("#Assigned-by").val(Assigned_byValue);
	

	
	/*
	alert("id counter is: " + idCounter);
	var divID = elt.value;
	var elem = document.getElementById("probability-" + divID);
	alert(divID);
	
	myProbId = elem;
	
	$("#riskID").val();
	$("#date").val();
	$("#Probability").val();
	$("#Impact").val();
	$("#description").val();
	$("#Refinement-context").val();
	$("#Mitigation-monitoring").val();
	$("#Management-contingency").val();
	$("#Trigger").val();
	$("#Current-status").val();
	$("#Current-status-date").val();
	$("#Originator").val();
	$("#Assigned-by").val();
	
	
	/*
	$("#Probability").val("17");
	
	var tempProb = $("#Probability").val();
	
	alert("Probability value is: "+tempProb);
	
	//var probabilityVal = $('input[name=Probability]');
	
	myProbId = elem;
	
	//elem.innerHTML = "Probability: " + tempProb;
	*/
	
	// if anything changes assign it to the input variables
	$("#RISForm").change(function(){
		//var x = document.getElementById("Probability").value;
		//alert("on onchange function, probablity value is: " + x);
		riskIDValue = document.getElementById("riskID").value;
		dateValue = document.getElementById("date").value;
		ProbabilityValue = document.getElementById("Probability").value;
		ImpactValue = document.getElementById("Impact").value;
		descriptionValue = document.getElementById("description").value;
		Refinement_contextValue = document.getElementById("Refinement-context").value;
		Mitigation_monitoringValue = document.getElementById("Mitigation-monitoring").value;
		Management_contingencyValue = document.getElementById("Management-contingency").value;
		TriggerValue = document.getElementById("Trigger").value;
		Current_statusValue = document.getElementById("Current-status").value;
		Current_status_dateValue = document.getElementById("Current-status-date").value;
		OriginatorValue = document.getElementById("Originator").value;
		Assigned_byValue = document.getElementById("Assigned-by").value;
	});
	
	
	
};

//to update values of selected RIS when the user hits save
function updateValues(){
	var triangleSpan = '<span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>';
	riskIDTopElem.innerHTML = triangleSpan + "<b>Risk ID:</b> " + riskIDValue;
	riskIDElem.innerHTML = "<b>Risk ID:</b> " + riskIDValue;
	dateElem.innerHTML = "<b>Date:</b> " + dateValue;
	ProbabilityElem.innerHTML = "<b>Probability:</b> " + ProbabilityValue;
	ImpactElem.innerHTML = "<b>Impact:</b> " + ImpactValue;
	descriptionElem.innerHTML = "<b>Description:</b> " + descriptionValue;
	Refinement_contextElem.innerHTML = "<b>Refinement/Context:</b> " + Refinement_contextValue;
	Mitigation_monitoringElem.innerHTML = "<b>Mitigation/Monitoring:</b> " + Mitigation_monitoringValue;
	Management_contingencyElem.innerHTML = "<b>Management/Contingency:</b> " + Management_contingencyValue;
	TriggerElem.innerHTML = "<b>Trigger:</b> " + TriggerValue;
	Current_statusElem.innerHTML = "<b>Current Status:</b> " + Current_statusValue;
	Current_status_dateElem.innerHTML = "<b>Current Status Date:</b> " + Current_status_dateValue;
	OriginatorElem.innerHTML = "<b>Originator:</b> " + OriginatorValue;
	Assigned_byElem.innerHTML = "<b>Assigned By:</b> " + Assigned_byValue;
};



// open the model box
function openModelBox(){
	var modal = document.getElementById('myModal');
	modal.style.display = "block";
};


// check for duplicates
function checkForDuplicates(item){
	var x = riskIdsList.indexOf(item);
	if(x == -1){
		return false;
	} else {
		alert("Can't use duplicate risk Id's");
		return true;
	}
};


// reset form values
function resetFormValues(){
	$("#riskID").val('');
	$("#date").val('');
	$("#Probability").val('');
	$("#Impact").val("Low");
	$("#description").val('');
	$("#Refinement-context").val('');
	$("#Mitigation-monitoring").val('');
	$("#Management-contingency").val('');
	$("#Trigger").val('');
	$("#Current-status").val('');
	$("#Current-status-date").val('');
	$("#Originator").val('');
	$("#Assigned-by").val('');
	hideOrShowGreeting();
};

function hideOrShowGreeting(){
	
	if(numberOfTables > 0){
		$("#welcomeMessage").hide();
		$("#note-warning").show();
	} else {
		$("#welcomeMessage").show();
		$("#note-warning").hide();
	}
};


function editTableInExport(){
	var oldDivID = oldElm.value;
	
	
	var newTable = '<div class="RIS-group" id="RIS-group-' + oldDivID +  '">' +
							'<div class="table-container">' +
							'<table class="RIS-table">' +
								'<col width=25%>' +
								'<col width=25%>' +
								'<col width=25%>' +
								'<col width=25%>' + 
								'<br><br><br>' +
								'<tr>' +
									'<td id="riskID-' + oldDivID + '"><b>Risk ID:</b> ' + riskIDValue + '</td>' +
									'<td id="riskDate-' + oldDivID + '"><b>Date:</b> ' + dateValue + '</td>' +
									'<td id="probability-' + oldDivID + '"><b>Probability:</b> ' + ProbabilityValue + '</td>' +
									'<td id="impact-' + oldDivID + '"><b>Impact:</b> ' + ImpactValue + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td id="description-' + oldDivID + '" colspan="4"><b>Description:</b> ' + descriptionValue + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td  id="refinementContext-' + oldDivID + '" colspan="4"><b>Refinement/Context:</b> ' + Refinement_contextValue + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td id="mitigationMonitoring-' + oldDivID + '" colspan="4"><b>Mitigation/Monitoring:</b> ' + Mitigation_monitoringValue + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td  id="managementContingency-' + oldDivID + '" colspan="2"><b>Management/Contingency:</b> ' + Management_contingencyValue + '</td>' +
								   '<td  id="trigger-' + oldDivID + '" colspan="2"><b>Trigger:</b> ' + TriggerValue + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td id="currentStatus-' + oldDivID + '" colspan="2"><b>Current Status:</b> ' + Current_statusValue + '</td>' +
								   '<td id="currentStatusDate-' + oldDivID + '" colspan="2"><b>Current Status Date:</b> ' + Current_status_dateValue + '</td>' +
								'</tr>' +
								'<tr>' +
									'<td id="originator-' + oldDivID + '" colspan="2"><b>Originator:</b> ' + OriginatorValue + '</td>' +
									'<td id="assignedBy-' + oldDivID + '" colspan="2"><b>Assigned By:</b> ' + Assigned_byValue + '</td>' +
								'</tr>' +
							'</table>' +
						'</div>';// end of append code
	
	//delete tableExport[divID];  // This will leave 'undefined' in the index that was deleted
	tableExport[oldDivID] = newTable;
	
};


