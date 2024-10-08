// Function to initialize the stacked bar chart
function init() {
    // Sample dataset consisting of different fruit quantities over time
    let dataset = [
        { apples: 5, oranges: 10, grapes: 22 },
        { apples: 4, oranges: 12, grapes: 28 },
        { apples: 2, oranges: 19, grapes: 32 },
        { apples: 7, oranges: 23, grapes: 35 },
        { apples: 23, oranges: 17, grapes: 43 }
    ];

    // Define chart dimensions
    let width = 700;
    let height = 400;
    let padding = 50;

    // Set color scheme for the different categories of fruits
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    // Sort the keys (fruit types) based on their total values to get larger values at the bottom of the stack
    let keys = ["apples", "oranges", "grapes"].sort((a, b) => {
        let totalA = d3.sum(dataset, d => d[a]); // Sum all values for key 'a'
        let totalB = d3.sum(dataset, d => d[b]); // Sum all values for key 'b'
        return totalB - totalA; // Sort in descending order by total value
    });

    // Generate the series data for stacked bars using d3.stack
    let series = d3.stack()
        .keys(keys)(dataset); // Specify the keys (fruit types) to create stacked series

    // Set up x-scale (band scale for categorical data)
    let xScale = d3.scaleBand()
        .domain(d3.range(dataset.length)) // Create domain from 0 to the number of data points
        .rangeRound([padding, width - padding]) // Define the range for the x-axis, with padding on either side
        .paddingInner(0.05); // Set padding between bars

    // Set up y-scale (linear scale for numeric values)
    let yScale = d3.scaleLinear()
        .domain([
            0,
            d3.max(series[series.length - 1], function(d) { return d[1]; }) // Get the maximum value from the stacked series
        ])
        .range([height - padding, padding]); // Define the range for the y-axis (inverted for SVG)

    // Create an SVG container to hold the chart
    let svg = d3.select("#container")
        .append("svg")
        .attr("width", width) // Set the width of the SVG element
        .attr("height", height); // Set the height of the SVG element

    // Create a group element for each fruit type and set the color
    let groups = svg.selectAll("g")
        .data(series) // Bind the stacked data series to the group elements
        .enter() // Create a placeholder for each series
        .append("g") // Append a group element for each series
        .attr("fill", function(d, i) {
            return color(i); // Assign a different color to each group based on index
        });

    // Create the rectangles representing each stacked segment
    let rects = groups.selectAll("rect")
        .data(function(d) {
            return d; // Bind the individual segments within each series
        })
        .enter() // Create a placeholder for each segment
        .append("rect") // Append a rectangle for each segment
        .attr("x", function(d, i) {
            return xScale(i); // Set the x position based on index using xScale
        })
        .attr("y", function(d) {
            return yScale(d[1]); // Set the y position based on the top value of the segment
        })
        .attr("height", function(d) {
            return yScale(d[0]) - yScale(d[1]); // Calculate the height of the rectangle based on the difference between top and bottom values
        })
        .attr("width", xScale.bandwidth()); // Set the width of the rectangle based on xScale bandwidth
}

// Call the init function to render the stacked bar chart
init();