<?php $thisPage="index"; 
include_once "php/view_temperature.php";
?>

<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>De Weather Pi</title>
  <link href="styles/main.css" rel="stylesheet" type="text/css"/>
  <link href="styles/thermometer.css" rel="stylesheet" type="text/css"/>
  <link rel="stylesheet" type="text/css" media="only screen and (min-width:50px) and (max-width:600px)"  href="includes/screen_small.css"/>
  <meta name="viewport" content="height= device-height,width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <meta name="HandheldFriendly" content="true">
  <script type="text/javascript" src="js/functions.js"></script> 
  <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><![endif]--> 
<!--[if lte IE 8]>

<script type="text/javascript" src="js/html5shiv.js"></script>

<![endif]--> 
<!--The following script tag downloads a font from the Adobe Edge Web Fonts server for use within the web page. We recommend that you do not modify it.-->
<script>var __adobewebfontsappname__="dreamweaver"</script>
</head>

<body>
  <div id="wrapper">
    <div id="temperature" class="panel">Huidige Temperatuur
      <div class="panel_content">
        <div class="de">
          <div class="den">
            <div class="dene">
              <div class="denem"> 
                <script type="text/javascript">
                  var datasets = <?php echo json_encode(getBuienradarData()); ?>;
                  var currentType = new Array();
                  for (var i = 0; i < datasets.length; i++) {
                    currentType[i] = new Array();
                    currentType[i][0] = datasets[i][0];
                    currentType[i][1] = datasets[i][1];
                  } </script>
                  <div class="deneme"><script type="text/javascript">document.write(Math.round(datasets[datasets.length-1][1]))</script><strong id="deg">&deg;</strong> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="weatherforecast" class="panel">Verwachting
        <div id="forecast_content" class="panel_content"></div>
      </div>
       <script type="text/javascript" src="js/date.js"></script> 
      <script type="text/javascript" src="js/jquery.js"></script> 
      <script type="text/javascript" src="js/jquery.flot.js"></script> 
      <script type="text/javascript" src="js/jquery.flot.crosshair.js"></script> 
      <script type="text/javascript" src="js/jquery.flot.time.js"></script> 
      <script type="text/javascript" src="js/jquery.flot.resize.js"></script>
      <script type="text/javascript" src="js/jquery.flot.resize.js"></script>
      <script type="text/javascript" src="js/graph.js"></script> 
      <div id="tempgraph" class="panel">
       <label class="switch">
         <input type="checkbox" class="switch-input" checked="true" onclick="switchGraphContent()">
         <span class="switch-label" data-on="~" data-off="&#8801"></span>
         <span class="switch-handle"></span>
       </label>
       <div id="graph_title">Temperatuur</div>
       <div>
         <label class="select_out">
          <select class="select" onchange="switchType(this.value)">
            <option value="1">Temperatuur</option>
            <option value="2">Luchtvochtigheid</option>
            <option value="3">Windsnelheid MS</option>
            <option value="4">Windsnelheid BF</option>
            <option value="5">Windrichting</option>
            <option value="6">Luchtdruk</option>
            <option value="7">Zicht</option>
            <option value="8">Windstoten</option>
            <option value="9">Regen</option>
          </select>
        </label>
      </div>
      <div id="graph_offset" class = "panel_content">
        <div id="graph_content"></div>
         <div id="table_content"><script type="text/javascript">arrayToTable();</script></div>
      </div>
    </div>
    <?php include_once 'navigation.php'; ?>
    <footer></footer>
  </div>
</body>
</html>
