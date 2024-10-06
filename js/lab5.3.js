// Set the width and height of the SVG canvas
width = 500;
height = 300;

// Set padding around the chart
padding = 20;

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
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (height) + ")") // Position x-axis at the bottom of the chart
    .call(xAxis);

// Append the y-axis to the SVG
svg.append("g")
    .attr("transform", "translate(" + padding + ",0)") // Position y-axis with padding from the left
    .call(yAxis);

// Buttons for adding data
// Select the button and set up the click event to add new data
// .btn-l-5-1 is a class for the button that adds data to the chart
d3.select(".btn-l-5-1")
    .on("click", function () {
        let maxValue = 25; // Maximum value for the new random data point

        let newNumber = Math.floor(Math.random() * maxValue) + 1; // Generate a new random number
        dataSet.push(newNumber); // Add the new number to the dataset

        // Update the xScale domain to include the new data length
        xScale.domain(d3.range(dataSet.length));

        // Select all bars and bind the updated dataset
        let bars = svg.selectAll("rect")
            .data(dataSet);

        // Enter new bars for the added data
        bars.enter()
            .append("rect")
            .attr("x", function (d, i) {
                return width; // Start new bars at the right edge
            })
            .attr("y", function (d) {
                return yScale(d); // Set y-position based on data value
            })
            .attr("height", function (d) {
                return height - yScale(d); // Set bar height based on data value
            })
            .style("fill", "slategray") // Set initial color of new bars
            .merge(bars) // Merge new bars with existing bars
            .transition() // Apply a transition to animate the changes
            .duration(500)
            .attr("x", function (d, i) {
                return xScale(i); // Set new x-position for all bars
            })
            .attr("width", xScale.bandwidth()); // Set width for all bars

        // Update the x-axis to reflect changes in the dataset
        svg.select(".x-axis")
            .transition() // Apply a transition to animate the update
            .duration(500)
            .call(xAxis);
    });

// Buttons for removing data
// Select the button and set up the click event to remove data
// .btn-l-5-2 is a class for the button that removes data from the chart
d3.select(".btn-l-5-2")
    .on("click", function () {
        dataSet.pop(); // Remove the last data point from the dataset

        // Update the xScale domain to include the updated data length
        xScale.domain(d3.range(dataSet.length));

        // Select all bars and bind the updated dataset
        let bars = svg.selectAll("rect")
            .data(dataSet);

        // Remove the bar corresponding to the removed data point
        bars.exit()
            .filter(function(d, i) { return i === dataSet.length; }) // Select the last bar
            .transition() // Apply a transition to animate the removal
            .duration(500)
            .attr("x", width) // Move the bar out of view
            .remove(); // Remove the bar from the DOM

        // Update the existing bars
        bars.enter()
            .append("rect")
            .attr("x", function (d, i) {
                return width; // Start new bars at the right edge
            })
            .attr("y", function (d) {
                return height - yScale(d); // Set y-position for new bars
            })
            .merge(bars) // Merge new bars with existing bars
            .transition() // Apply a transition to adjust positions and heights
            .duration(500)
            .attr("x", function (d, i) {
                return xScale(i); // Set new x-position for all bars
            })
            .attr("y", function (d) {
                return yScale(d); // Set y-position based on data value
            })
            .attr("width", xScale.bandwidth()) // Set bar width based on scale bandwidth
            .attr("height", function (d) {
                return height - yScale(d); // Set bar height based on data value
            })
            .style("fill", "slategray"); // Set color for updated bars

        // Update the x-axis to reflect changes in the dataset
        svg.select(".x-axis")
            .transition() // Apply a transition to animate the update
            .duration(500)
            .call(xAxis);
    });