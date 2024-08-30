d3.csv("csv/lab_2.4.csv").then(function (data) {
    barChart(data);
});


/**
 *
 * @param dataSet an array of objects with a key of "wombats" containing a number
 * @returns {void}
 */
function barChart(dataSet) {
    let width = 800;
    let height = 400;

    let svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("rect")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return i * (width / dataSet.length) + 5;
        })
        .attr("y", function (d) {
            return height - d.wombats * 12;
        })
        .attr("width", width / dataSet.length - 10)
        .attr("height", function (d) {
            return d.wombats * 12;
        })
        .style("fill", function (d) {
            if (d.wombats <= 10) {
                return "yellow";
            } else if (d.wombats <= 20) {
                return "orange";
            } else {
                return "brown";
            }
        });

    svg.selectAll("text")
        .data(dataSet)
        .enter()
        .append("text")
        .text(function (d) {
            return d.wombats;
        })
        .attr("x", function (d, i) {
            let x = d.wombats < 10 ? 35 : 30;
            return i * (width / dataSet.length) + x;
        })
        .attr("y", function (d) {
            return height - d.wombats * 12 - 5;
        })
        .attr("font-size", "12px")
        .attr("fill", "white");
}