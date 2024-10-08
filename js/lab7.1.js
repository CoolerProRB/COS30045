width = 600;
height = 300;

d3.csv("csv/lab_7.1.csv", function(data) {
    return{
        date: new Date(+data.year, +data.month - 1),
        number: +data.number
    };
}).then(function(data) {
    dataSet = data;

    lineChart(dataSet)
});

function lineChart(dataSet) {
    let padding = 55;

    // Setting up x and y scales
    let xScale = d3.scaleTime().domain([
        d3.min(dataSet, function (d) { return d.date; }),
        d3.max(dataSet, function (d) { return d.date; })
    ]).range([0, width - padding]);

    let yScale = d3.scaleLinear().domain([
        0,
        d3.max(dataSet, function (d) { return d.number; })
    ]).range([height, 0]);

    // Setting up axes
    let xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(10);

    let yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(10);

    // Define the area generator
    let area = d3.area()
        .x(function (d) { return xScale(d.date); })
        .y0(function () { return yScale.range()[0]; }) // Bottom of the area, which is at y = 0 of yScale
        .y1(function (d) { return yScale(d.number); }); // Top of the area, based on data

    // Create the SVG container
    let svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height + padding);

    // Append the area to the SVG
    svg.append("path")
        .datum(dataSet)
        .attr("class", "area")
        .attr("d", area)
        .attr("transform", "translate(" + padding + "," + padding / 2 + ")");

    // Append axes to the SVG
    svg.append("g")
        .attr("transform", "translate(" + padding + "," + (height + padding / 2) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("transform", "translate(" + padding + "," + padding / 2 + ")")
        .call(yAxis);

    // Append a horizontal line at 500,000 as a reference
    svg.append("line")
        .attr("class", "line halfMilMark")
        .attr("x1", padding)
        .attr("y1", yScale(500000) + padding / 2)
        .attr("x2", width)
        .attr("y2", yScale(500000) + padding / 2);

    svg.append("text")
        .attr("class", "halfMilMark")
        .attr("x", padding + 10)
        .attr("y", yScale(500000) + padding / 2 - 5)
        .text("Half a million unemployed");
}