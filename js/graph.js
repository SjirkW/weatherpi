$(function() {
    draw();
});

function draw(){
    var plot = $.plot($("#graph_content"), [{
        data: currentType,
        label:  currentType[currentType.length - 1][1] + " " + typeUnit
    }], {
        legend: {
            backgroundColor: "#F5F5F5"
        },
        xaxis: {
            mode: "time",
            timezone: "browser",
            tickLength: 0
        },
        lines: {
            fill: true
        },
        series: {
            lines: {
                show: true,
                lineWidth: 5
            },
            points: {
                show: false,
                radius: 5,
                lineWidth: 5
            },
            splines: {
                show: true,
                tension: 0.8, // float between 0 and 1, defaults to 0.5
                lineWidth: 6 // number, defaults to 2
            }
        },
        crosshair: {
            mode: "x"
        },
        grid: {
            hoverable: true,
            clickable: false,
            borderWidth: 0,
            tickColor: "#cccccc",
            labelMargin: 20,
            mouseActiveRadius: 50
        },
        shadowSize:15 
    });
//4B9483

    var legends = $("#graph_content .legendLabel");

    legends.each(function () {
        // fix the widths so they don't jump around
        $(this).css('width', $(this).width());
    });

    var updateLegendTimeout = null;
    var latestPosition = null;

    function updateLegend() {

        updateLegendTimeout = null;

        var pos = latestPosition;

        var axes = plot.getAxes();
        if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
            pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) {
                //make sure the latest value is added back to the legend when the cursor leaved the graph
                dataset = plot.getData();
                for (var i = 0; i < dataset.length; ++i) {
                         var series = dataset[i];
                    legends.eq(i).text(series.label.replace(/.*=.*/, typeName + " = " + currentType[currentType.length - 1][1] + " " + typeUnit));
                }
            return;
             }

    var i, j, dataset = plot.getData();
    for (i = 0; i < dataset.length; ++i) {

        var series = dataset[i];

            // Find the nearest points, x-wise

            for (j = 0; j < series.data.length; ++j) {
                if (series.data[j][0] > pos.x) {
                    break;
                }
            }

            // Now Interpolate

            var y,
            p1 = series.data[j - 1],
            p2 = series.data[j];

            if (p1 == null) {
                y = p2[1];
            } else if (p2 == null) {
                y = p1[1];
            } else {
                y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
            }


            legends.eq(i).text(series.label.replace(/.*/, y.toFixed(2) + " " + typeUnit));
        }
    }

    $("#graph_content").bind("plothover", function (event, pos, item) {
        latestPosition = pos;
        if (!updateLegendTimeout) {
            updateLegendTimeout = setTimeout(updateLegend, 50);
        }
    });



    function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css({
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 5,
            border: '1px solid #fdd',
            padding: '2px',
            'background-color': '#fee',
            opacity: 0.80
        }).appendTo("body").fadeIn(200);
    }

    var previousPoint = null;
    $("#graph_content").bind("plothover", function (event, pos, item) {
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));


        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

                $("#tooltip").remove();
                var x = item.datapoint[0].toFixed(2),
                y = item.datapoint[1].toFixed(2);

                var date = new Date(x * 1);


                showTooltip(item.pageX, item.pageY, date.toLocaleTimeString() + "<br>" + y + " " + typeUnit);
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }

    });

  $("#graph_content").bind("plotclick", function (event, pos, item) {
            if (item) {
                $("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
                plot.highlight(item.series, item.datapoint);
            }
        });
}

