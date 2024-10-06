// Set the width and height of the SVG canvas
width = 500;
height = 300;

// Set padding around the chart
padding = 20;

// Define the transition easing function for animations
transition = d3.easeCubicInOut;

// Initial dataset containing values for the bars
dataSet = [14, 5, 26, 23, 9, 21, 7, 19, 22, 16, 2, 10];

// Scales
// xScale is a band scale that maps each data point to an x-position, with padding between bars
xScale = d3.scaleBand().domain(d3.range(dataSet.length)).rangeRound([padding, width - padding]).paddingInner(0.05);
// yScale is a linear scale that maps data values to y-positions, inverted to start from the top
yScale = d3.scaleLinear().domain([d3.max(dataSet), 0]).rangeRound([padding, height]);

// Axes
// xAxis represents the x-axis of the chart, positioned at the bottom
xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(dataSet.length);

// yAxis represents the y-axis of the chart, positioned on the left
yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10);

// SVG
// Create an SVG element to hold the bar chart
svg = d3.select("#container")
    .append("svg")
    .attr("width", width) // Set the width of the SVG canvas
    .attr("height", height + padding); // Set the height of the SVG canvas, adding padding for the x-axis

// Bars
// Bind the data to rectangle elements (bars) and create them
svg.selectAll("rect")
    .data(dataSet)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        return xScale(i); // Position each bar based on its index
    })
    .attr("y", function (d) {
        return yScale(d); // Set y-position based on data value
    })
    .attr("width", xScale.bandwidth()) // Set the width of each bar based on the scale bandwidth
    .attr("height", function (d) {
        return height - yScale(d); // Calculate the height from the data value
    })
    .style("fill", "slategray"); // Set the initial color of the bars

// Axes
// Append the x-axis to the SVG
svg.append("g")
    .attr("transform", "translate(0," + (height) + ")") // Position x-axis at the bottom of the chart
    .call(xAxis);

// Append the y-axis to the SVG
svg.append("g")
    .attr("transform", "translate(" + padding + ",0)") // Position y-axis with padding from the left
    .call(yAxis);

// Button for updating data
// Select the button and set up the click event to update the data
// .btn-l-5-1 is a class for the button that updates the data set
d3.select(".btn-l-5-1")
    .on("click", function () {
        let length = dataSet.length; // Get the current length of the data set
        let maxValue = 25; // Maximum value for the new random data points
        dataSet = []; // Clear the current data set

        // Generate a new data set with random values
        for (let i = 0; i < length; i++) {
            dataSet.push(Math.floor(Math.random() * maxValue) + 1);
        }

        // Update the bars with the new data
        svg.selectAll("rect")
            .data(dataSet)
            .transition() // Apply a transition to animate the changes
            .delay(function (d, i) {
                return i / dataSet.length * 100; // Stagger the transition for each bar
            })
            .duration(1000) // Set the duration of the transition
            .ease(transition) // Use the defined easing function for the transition
            .attr("y", function (d) {
                return yScale(d); // Set new y-position based on the updated data value
            })
            .attr("height", function (d) {
                return height - yScale(d); // Set new height based on the updated data value
            });
    });