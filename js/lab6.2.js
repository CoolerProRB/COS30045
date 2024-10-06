// Set up chart dimensions and padding
width = 500;
height = 300;
padding = 20;

// Data for the bar chart
dataSet = [14, 5, 26, 23, 9, 21, 7, 19, 22, 16, 2, 10];

// Set up scales for x and y axes
xScale = d3.scaleBand().domain(d3.range(dataSet.length)).rangeRound([padding, width - padding]).paddingInner(0.05);
yScale = d3.scaleLinear().domain([d3.max(dataSet, d => d), 0]).rangeRound([padding, height]);

// Set up axes generators
xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(dataSet.length);

yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10);

// Create SVG container for the bar chart
svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height + padding);

descending = true; // Boolean to toggle sorting order

// Create bars for the bar chart
svg.selectAll("rect")
    .data(dataSet)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        return xScale(i);
    })
    .attr("y", function (d) {
        return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
        return height - yScale(d);
    })
    .style("fill", "slategray")
    .on("mouseover", function (event, d) { // Mouseover event for highlighting the bar
        let xPosition = parseFloat(d3.select(this).attr("x"));
        let yPosition = parseFloat(d3.select(this).attr("y"));

        // Display tooltip with data value
        svg.append("text")
            .attr("id", "tooltip")
            .attr("x", d > 9 ? xPosition + xScale.bandwidth() / 3 - 3 : xPosition + xScale.bandwidth() / 3)
            .attr("y", yPosition + 15)
            .text(d);

        // Change bar color on hover
        d3.select(this)
            .transition()
            .duration(150)
            .style("fill", "orange");
    })
    .on("mouseout", function () { // Mouseout event for removing highlight
        d3.select("#tooltip").remove();

        d3.select(this)
            .transition()
            .duration(150)
            .style("fill", "slategray");
    });

// Append x-axis to the SVG
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (height) + ")")
    .call(xAxis);

// Append y-axis to the SVG
svg.append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

// Button to add a random data value to the dataset
d3.select(".btn-l-5-1")
    .on("click", function () {
        let maxValue = 25;

        // Generate a random value and add it to the dataset
        let newNumber = Math.floor(Math.random() * maxValue) + 1;
        dataSet.push(newNumber);

        // Update scales with new data
        xScale.domain(d3.range(dataSet.length));
        yScale.domain([d3.max(dataSet, d => d), 0]);

        // Update bars with new data
        let bars = svg.selectAll("rect")
            .data(dataSet);

        // Enter new bars
        bars.enter()
            .append("rect")
            .attr("x", width)
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return height - yScale(d);
            })
            .style("fill", "slategray")
            .on("mouseover", function (event, d) {
                let xPosition = parseFloat(d3.select(this).attr("x"));
                let yPosition = parseFloat(d3.select(this).attr("y"));

                svg.append("text")
                    .attr("id", "tooltip")
                    .attr("x", d > 9 ? xPosition + xScale.bandwidth() / 3 - 3 : xPosition + xScale.bandwidth() / 3)
                    .attr("y", yPosition + 15)
                    .text(d);

                d3.select(this)
                    .transition()
                    .duration(150)
                    .style("fill", "orange");
            })
            .on("mouseout", function () {
                d3.select("#tooltip").remove();

                d3.select(this)
                    .transition()
                    .duration(150)
                    .style("fill", "slategray");
            })
            .merge(bars) // Merge existing and new bars
            .transition()
            .duration(500)
            .attr("x", function (d, i) {
                return xScale(i);
            })
            .attr("width", xScale.bandwidth())
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("height", function (d) {
                return height - yScale(d);
            });

        // Update axes with new data
        svg.select(".x-axis")
            .transition()
            .duration(500)
            .call(xAxis);

        svg.select(".y-axis")
            .transition()
            .duration(500)
            .call(yAxis);
    });

// Button to remove a data value from the dataset
d3.select(".btn-l-5-2")
    .on("click", function () {
        // Remove the last element from the dataset
        dataSet.pop();

        // Update scales with new data
        xScale.domain(d3.range(dataSet.length));

        // Update bars with new data
        let bars = svg.selectAll("rect")
            .data(dataSet);

        // Remove exiting bars that are no longer in the dataset
        bars.exit()
            .filter(function(d, i) { return i === dataSet.length; })
            .transition()
            .duration(500)
            .attr("x", width)
            .remove();

        // Update existing bars
        bars.enter()
            .append("rect")
            .attr("x", function (d, i) {
                return width;
            })
            .attr("y", function (d) {
                return height - yScale(d);
            })
            .merge(bars) // Merge existing and new bars
            .transition()
            .duration(500)
            .attr("x", function (d, i) {
                return xScale(i);
            })
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return height - yScale(d);
            })
            .style("fill", "slategray");

        // Update x-axis with new data
        svg.select(".x-axis")
            .transition()
            .duration(500)
            .call(xAxis);
    });

// Button to sort the bars
d3.select("#sort")
    .on("click", function () {
        // Toggle the sorting order
        descending = !descending;

        // Sort the bars based on the current order
        svg.selectAll("rect")
            .sort(function (a, b) {
                if (!descending) {
                    return d3.ascending(a, b);
                } else {
                    return d3.descending(a, b);
                }
            })
            .transition()
            .duration(500)
            .attr("x", function (d, i) {
                return xScale(i);
            });
    });