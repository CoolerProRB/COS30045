width = 500; // Width of the SVG canvas
height = 300; // Height of the SVG canvas

padding = 20; // Padding around the chart

// Data set containing the values for the bars
dataSet = [14, 5, 26, 23, 9, 21, 7, 19, 22, 16, 2, 10];

// Scales
// xScale is a band scale used to determine the position of each bar on the x-axis
xScale = d3.scaleBand().domain(d3.range(dataSet.length)).rangeRound([padding, width - padding]).paddingInner(0.05);
// yScale is a linear scale used to determine the height of each bar, inverted to start from the top
yScale = d3.scaleLinear().domain([d3.max(dataSet), 0]).rangeRound([padding, height]);

// Axes
// xAxis represents the x-axis of the chart, with ticks corresponding to each bar
xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(dataSet.length);

// yAxis represents the y-axis of the chart, with 10 evenly spaced ticks
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
// Bind the data to rectangle elements (bars)
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
    .attr("width", xScale.bandwidth()) // Set the width of each bar based on scale bandwidth
    .attr("height", function (d) {
        return height - yScale(d); // Calculate the height from the data value
    })
    .style("fill", "slategray"); // Set the initial color of the bars

// Labels
// Bind the data to text elements to display the value on each bar
svg.selectAll("text")
    .data(dataSet)
    .enter()
    .append("text")
    .attr("x", function (d, i) {
        return xScale(i) + xScale.bandwidth() / 3; // Position the label in the middle of the bar
    })
    .attr("y", function (d) {
        return yScale(d) + 15; // Position the label slightly below the top of the bar
    })
    .attr("font-size", "12px") // Set font size for the labels
    .attr("fill", "white") // Set text color for the labels
    .text(function (d) {
        return d; // Display the data value as the label
    });

// Axes
// Append the x-axis to the SVG
svg.append("g")
    .attr("transform", "translate(0," + (height) + ")") // Position x-axis at the bottom of the chart
    .call(xAxis);

// Append the y-axis to the SVG
svg.append("g")
    .attr("transform", "translate(" + padding + ",0)") // Position y-axis with padding from the left
    .call(yAxis);

// Buttons for updating data
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
            .attr("y", function (d) {
                return yScale(d); // Set new y-position based on the updated data value
            })
            .attr("height", function (d) {
                return height - yScale(d); // Set new height based on the updated data value
            });

        // Update the labels with the new data
        svg.selectAll("text")
            .data(dataSet)
            .attr("y", function (d) {
                return yScale(d) + 15; // Set new y-position for the labels
            })
            .attr("font-size", "12px") // Set font size for the labels
            .attr("fill", "white") // Set text color for the labels
            .text(function (d) {
                return d; // Display the updated data value as the label
            });
    });