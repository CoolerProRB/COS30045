width = 600;
height = 300;

// Load the CSV file
// Convert year and month to a Date object, and number to a numeric value
d3.csv("csv/lab_7.1.csv", function(data) {
    return{
        date: new Date(+data.year, +data.month - 1), // Convert year and month into a Date object
        number: +data.number // Convert number to a numeric value
    };
}).then(function(data) {
    dataSet = data;

    // Call the lineChart function to draw the chart
    lineChart(dataSet)
});

function lineChart(dataSet) {
    let padding = 55;

    // Setting up x and y scales
    let xScale = d3.scaleTime().domain([
        d3.min(dataSet, function (d) { return d.date; }), // Set the minimum value for x-axis (earliest date)
        d3.max(dataSet, function (d) { return d.date; })  // Set the maximum value for x-axis (latest date)
    ]).range([0, width - padding]); // Map dates to the range of available width (excluding padding)

    let yScale = d3.scaleLinear().domain([
        0, // Start y-axis at 0
        d3.max(dataSet, function (d) { return d.number; }) // Set maximum value for y-axis based on data
    ]).range([height, 0]); // Map values to available height (y starts from the bottom)

    // Setting up axes
    let xAxis = d3.axisBottom()
        .scale(xScale) // Set scale for x-axis
        .ticks(10); // Set the number of ticks on the x-axis

    let yAxis = d3.axisLeft()
        .scale(yScale) // Set scale for y-axis
        .ticks(10); // Set the number of ticks on the y-axis

    // Define the area generator to create the filled area under the line
    let area = d3.area()
        .x(function (d) { return xScale(d.date); }) // Set x-coordinate for each data point
        .y0(function () { return yScale.range()[0]; }) // Bottom of the area, which is at y = 0 of yScale (height)
        .y1(function (d) { return yScale(d.number); }); // Top of the area, based on data (y-value)

    // Create the SVG container
    let svg = d3.select("#container")
        .append("svg")
        .attr("width", width) // Set width of SVG
        .attr("height", height + padding); // Set height of SVG (including padding for axis labels)

    // Append the area to the SVG
    svg.append("path")
        .datum(dataSet) // Bind data to the path element
        .attr("class", "area") // Assign class for styling
        .attr("d", area) // Generate the area path using data
        .attr("transform", "translate(" + padding + "," + padding / 2 + ")"); // Translate the area to provide space for padding

    // Append x-axis to the SVG
    svg.append("g")
        .attr("transform", "translate(" + padding + "," + (height + padding / 2) + ")") // Position x-axis at the bottom of the chart
        .call(xAxis); // Call the xAxis function to render the axis

    // Append y-axis to the SVG
    svg.append("g")
        .attr("transform", "translate(" + padding + "," + padding / 2 + ")") // Position y-axis on the left of the chart
        .call(yAxis); // Call the yAxis function to render the axis

    // Append a horizontal line at 500,000 as a reference line
    svg.append("line")
        .attr("class", "line halfMilMark") // Assign class for styling the reference line
        .attr("x1", padding) // Starting x-coordinate of the line (left side)
        .attr("y1", yScale(500000) + padding / 2) // y-coordinate for both ends of the line (based on 500,000 value)
        .attr("x2", width) // Ending x-coordinate of the line (right side)
        .attr("y2", yScale(500000) + padding / 2); // Same y-coordinate as y1 to make it horizontal

    // Append text label for the reference line
    svg.append("text")
        .attr("class", "halfMilMark") // Assign class for styling the text
        .attr("x", padding + 10) // x-coordinate for text placement
        .attr("y", yScale(500000) + padding / 2 - 5) // y-coordinate for text placement, slightly above the line
        .text("Half a million unemployed"); // Text label content
}