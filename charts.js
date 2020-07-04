
function generateChart(mapSorted) {
    const Pie = require("cli-pie");

    var p = new Pie(30, mapSorted, {
        legend: true
    });

    p.options.no_ansi = false;
    console.log(p.toString());
}

exports.generateChart = generateChart;