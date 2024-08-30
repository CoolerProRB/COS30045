width = 510;
height = 110;
padding = 20

dataSet = [
    [5, 20, 2],
    [480, 90, 12],
    [250, 50, 8],
    [100, 33, 6],
    [330, 95, 9],
    [410, 12, 10],
    [475, 44, 11],
    [25, 67, 3],
    [85, 21, 5],
    [220, 88, 7],
];

svg = d3.select("#container")
    .append("svg")
    .attr("width", width + padding)
    .attr("height", height + padding);

svg.selectAll("circle")
    .data(dataSet)
    .enter()
    .append("circle")
    .attr("cx", function (d, i) {
        return d[0] + padding;
    })
    .attr("cy", function (d, i) {
        return d[1] + padding;
    })
    .attr("r", function (d, i) {
        return d[2];
    })
    .attr("fill", "#FF0000");

svg.selectAll("text")
    .data(dataSet)
    .enter()
    .append("text")
    .attr("x", function (d) {
        return d[0] + 5;
    })
    .attr("y", function (d) {
        return d[1] + 10;
    })
    .style("font-size", "10px")
    .style("fill", "white")
    .text(function (d) {
        return d[0] + "," + d[1];
    })