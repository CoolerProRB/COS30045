height = 200; // Height of the SVG
width = 500; // Width of the SVG

padding = 20; // Padding of the SVG

// Data set
dataSet = [
    [5, 20],
    [25, 67],
    [85, 21],
    [100, 33],
    [220, 88],
    [250, 50],
    [330, 95],
    [410, 12],
    [475, 44],
    [500, 90]
];

// Scales
xScale = d3.scaleLinear()
    .domain([d3.min(dataSet, function(d) { return d[0]; }), d3.max(dataSet, function(d) { return d[0]; })])
    .range([padding, width - padding]);

yScale = d3.scaleLinear()
    .domain([d3.min(dataSet, function(d) { return d[1]; }), d3.max(dataSet, function(d) { return d[1]; })])
    .range([padding, height - padding]);

// SVG
svg = d3.select("#container")
    .append("svg")
    .attr("width", width )
    .attr("height", height);

// Scatter plot
svg.selectAll("circle")
    .data(dataSet)
    .enter()
    .append("circle")
    .attr("cx", function (d, i) {
        return xScale(d[0]);
    })
    .attr("cy", function (d, i) {
        return height - yScale(d[1]);
    })
    .attr("r", function (d, i) {
        return 5;
    })
    .attr("fill", function (d, i) {
        if (d[0] == d3.max(dataSet, function(d) { return d[0]; })) {
            return "red";
        }
        return "lightgray";
    });

// Labels for the data points
svg.selectAll("text")
    .data(dataSet)
    .enter()
    .append("text")
    .text(function (d) {
        return d[0] + "," + d[1];
    })
    .attr("x", function (d) {
        return xScale(d[0]) - 15;
    })
    .attr("y", function (d) {
        return height - yScale(d[1]) - 10;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");