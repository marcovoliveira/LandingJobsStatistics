
function generateCharts(mapSorted) {

    var p = new Pie(30, mapSorted, {
        legend: true
    });

    p.options.no_ansi = false;
    console.log(p.toString());
}

exports.generateCharts = generateCharts;