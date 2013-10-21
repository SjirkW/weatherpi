var typeName="Temperatuur";
var typeUnit = "°C";

//switch between sensor types
function switchType(index){
	var array = parseInt(index);
	for (var i = 0; i < datasets.length; i++) {
		currentType[i] = new Array();
		currentType[i][0] = datasets[i][0];
		currentType[i][1] = datasets[i][array];
	}
	setTypeName(array);
	setTypeUnit(array);
	$("div#graph_title").text(typeName);
	draw();
}

//get the name of the current sensor type
function setTypeName(index){
	switch(index)
	{
		case 1:
		typeName = "Temperatuur"
		break;
		case 2:
		typeName = "Luchtvochtigheid"
		break;
		case 3:
		typeName = "Windsnelheid"
		break;
		case 4:
		typeName = "Windsnelheid"
		break;
		case 5:
		typeName = "Windrichting"
		break;
		case 6:
		typeName = "Luchtdruk"
		break;
		case 7:
		typeName = "Zicht"
		break;
		case 8:
		typeName = "Windstoten"
		break;
		case 9:
		typeName = "Regen"
		break;
		default:
		typeName = "fout" 
	}
}

//get the unit of the current sensor type
function setTypeUnit(index){
	switch(index)
	{
		case 1:
		typeUnit = "°C"
		break;
		case 2:
		typeUnit = "%"
		break;
		case 3:
		typeUnit = "M/S"
		break;
		case 4:
		typeUnit = "BF"
		break;
		case 5:
		typeUnit = "°"
		break;
		case 6:
		typeUnit = "hPa"
		break;
		case 7:
		typeUnit = "Meter"
		break;
		case 8:
		typeUnit = "M/S"
		break;
		case 9:
		typeUnit = "MM/U"
		break;
		default:
		typeUnit = "fout" 
	}

}

//checkbox to switch between graph and table view
function switchGraphContent() {
	$('.switch-input').change(function () {                
		$('#graph_content').toggle(this.checked);
		$('.select_out').toggle(this.checked);
		$('#table_content').toggle(!this.checked);
	}).change(); 
};

function arrayToTable(){
	var $table = $( '<table class="table"></table>' );
	$table.append('<tr><th>Tijd van opname</th><th>°C</th><th>LV%</th><th>Wind (ms)</th><th>Wind (bft)</th><th>Wind</th><th>Druk</th><th>Zicht</th><th>Stoten (km/u)</th><th>Regen (mm/u)</th></tr>');

	for ( var i = 0; i < 10; i++ ) {
		var emp = datasets[i];
		var $line = $( "<tr></tr>" );
		for (var j = 0; j < datasets[i].length; j++){
			if (j === 0){
				var date = new Date(datasets[i][j]).toString("d-MMM   HH:mm");
				$line.append( $( "<td></td>" ).html(date));
			}
			else
			{
				$line.append( $( "<td></td>" ).html(datasets[i][j]) );
			}
		}
		$table.append( $line );
	}

$table.appendTo( $( "#table_content" ) );

}