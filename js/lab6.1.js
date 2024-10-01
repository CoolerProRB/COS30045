width = 500;
height = 300;

padding = 20;

dataSet = [14, 5, 26, 23, 9, 21, 7, 19, 22, 16, 2, 10];

// Scales
xScale = d3.scaleBand().domain(d3.range(dataSet.length)).rangeRound([padding, width - padding]).paddingInner(0.05);
yScale = d3.scaleLinear().domain([d3.max(dataSet), 0]).rangeRound([padding, height]);

// Axes
xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(dataSet.length);

yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10);

// SVG
svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height + padding);

// Bars
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
    .on("mouseover", function (event, d) {
        let xPosition = parseFloat(d3.select(this).attr("x"));
        let yPosition = parseFloat(d3.select(this).attr("y"));

        svg.append("text")
            .attr("id", "tooltip")
            .attr("x", d > 9 ? xPosition + xScale.bandwidth() / 3 - 3 : xPosition + xScale.bandwidth() / 3)
            .attr("y", yPosition + 15)
            .text(d)

        d3.select(this)
            .transition()
            .duration(150)
            .style("fill", "orange");
    })
    .on("mouseout", function (d) {
        d3.select("#tooltip").remove();

        d3.select(this)
            .transition()
            .duration(150)
            .style("fill", "slategray");
    });

// Axes
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (height) + ")")
    .call(xAxis);

svg.append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

// Buttons for adding data
d3.select(".btn-l-5-1")
    .on("click", function () {
        let maxValue = 25;

        let newNumber = Math.floor(Math.random() * maxValue) + 1;
        dataSet.push(newNumber);

        xScale.domain(d3.range(dataSet.length));
        let bars = svg.selectAll("rect")
            .data(dataSet);

        bars.enter()
            .append("rect")
            .attr("x", function (d, i) {
                return width;
            })
            .attr("y", function (d) {
                return yScale(d);
            })
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
                    .text(d)

                d3.select(this)
                    .transition()
                    .duration(150)
                    .style("fill", "orange");
            })
            .on("mouseout", function (d) {
                d3.select("#tooltip").remove();

                d3.select(this)
                    .transition()
                    .duration(150)
                    .style("fill", "slategray");
            })
            .merge(bars)
            .transition()
            .duration(500)
            .attr("x", function (d, i) {
                return xScale(i);
            })
            .attr("width", xScale.bandwidth());

        svg.select(".x-axis")
            .transition()
            .duration(500)
            .call(xAxis);
    });

// Buttons for removing data
d3.select(".btn-l-5-2")
    .on("click", function () {
        dataSet.pop();

        xScale.domain(d3.range(dataSet.length));

        let bars = svg.selectAll("rect")
            .data(dataSet);

        bars.exit()
            .filter(function(d, i) { return i === dataSet.length; })
            .transition()
            .duration(500)
            .attr("x", width)
            .remove();

        bars.enter()
            .append("rect")
            .attr("x", function (d, i) {
                return width;
            })
            .attr("y", function (d) {
                return height - yScale(d);
            })
            .merge(bars)
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
            });

        svg.select(".x-axis")
            .transition()
            .duration(500)
            .call(xAxis);
    });