width = 600; // Width of the SVG
height = 600; // Height of the SVG
padding = 50; // Padding of the SVG

// Data set
dataSet = [
    [2,8],
    [3,5],
    [5,17],
    [6,6],
    [6,12],
    [7,20],
    [8,22],
    [10,11],
    [5,12],
    [6,16]
];

// Scales
xScale = d3.scaleLinear()
    .domain([0, d3.max(dataSet, function(d) { return d[0]; })])
    .range([padding, width - padding]);

yScale = d3.scaleLinear()
    .domain([d3.max(dataSet, function(d) { return d[1]; }), d3.min(dataSet, function(d) { return d[1]; })])
    .range([padding, height - padding]);

// Axes
xAxis = d3.axisBottom()
    .ticks(10)
    .scale(xScale);

yAxis = d3.axisLeft()
    .ticks(20)
    .scale(yScale);

// SVG
svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Scatter plot
svg.selectAll("circle")
    .data(dataSet)
    .enter()
    .append("circle")
    .attr("cx", function (d, i) {
        return xScale(d[0]) ;
    })
    .attr("cy", function (d, i) {
        return yScale(d[1]);
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

// Labels of the points
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
        return yScale(d[1]) - 10;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");

// X and Y axes
svg.append("g")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);

svg.append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

// Labels Y
svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", 20)
    .attr("x", -height/3 - 50)
    .text("Tree Height (m)")
    .attr("fill", "white");

// Labels X
svg.append("text")
    .attr("text-anchor", "end")
    .attr("y", width - 10)
    .attr("x", width/2 + 40)
    .text("Tree Age (year)")
    .attr("fill", "white");