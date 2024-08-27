width = 510;
height = 110;

dataSet = [
    [5, 20, 3],
    [480, 90, 2],
    [250, 50, 3],
    [100, 33, 4],
    [330, 95, 5],
    [410, 12, 6],
    [475, 44, 7],
    [25, 67, 8],
    [85, 21, 9],
    [220, 88, 10],
];

svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("circle")
    .data(dataSet)
    .enter()
    .append("circle")
    .attr("cx", function (d,i) {
        return d[0] + 5;
    })
    .attr("cy", function (d,i) {
        return d[1] + 5;
    })
    .attr("r", function (d,i) {
        return d[2];
    })
    .attr("fill", "blue");

svg.selectAll("text")
    .data(dataSet)
    .enter()
    .append("text")
    .attr("x", function (d) {
        return d[0] - 5;
    })
    .attr("y", function (d) {
        return d[1];
    })
    .style("font-size", "10px")
    .style("fill", "white")
    .text(function (d) {
        return d[0] + "," + d[1];
    })