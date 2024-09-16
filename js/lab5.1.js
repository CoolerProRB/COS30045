width = 500;
height = 300;

padding = 20;

dataSet = [14, 5, 26, 23, 9, 21, 7, 19, 22, 16, 2, 10];

xScale = d3.scaleBand().domain(d3.range(dataSet.length)).rangeRound([padding, width - padding]).paddingInner(0.05);
yScale = d3.scaleLinear().domain([d3.max(dataSet), 0]).rangeRound([padding, height]);

xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(dataSet.length);

yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10);

svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height + padding);

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

svg.append("g")
    .attr("transform", "translate(0," + (height) + ")")
    .call(xAxis);

svg.append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

d3.select(".btn-l-5-1")
    .on("click", function () {
        let length = dataSet.length;
        let maxValue = 25;
        dataSet = [];

        for (let i = 0; i < length; i++) {
            dataSet.push(Math.floor(Math.random() * maxValue) + 1);
        }

        svg.selectAll("rect")
            .data(dataSet)
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("height", function (d) {
                return height - yScale(d);
            });
    });