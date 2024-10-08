function init() {
    let dataset = [
        { apples: 5, oranges: 10, grapes: 22 },
        { apples: 4, oranges: 12, grapes: 28 },
        { apples: 2, oranges: 19, grapes: 32 },
        { apples: 7, oranges: 23, grapes: 35 },
        { apples: 23, oranges: 17, grapes: 43 }
    ];

    let width = 700;
    let height = 400;
    let padding = 50;

    let color = d3.scaleOrdinal(d3.schemeCategory10);

    // Sort the keys based on their total values to get the larger values at the bottom
    let keys = ["apples", "oranges", "grapes"].sort((a, b) => {
        let totalA = d3.sum(dataset, d => d[a]);
        let totalB = d3.sum(dataset, d => d[b]);
        return totalB - totalA; // Sort in descending order
    });

    let series = d3.stack()
        .keys(keys)(dataset);

    let xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([padding, width - padding])
        .paddingInner(0.05);

    let yScale = d3.scaleLinear()
        .domain([
            0,
            d3.max(series[series.length - 1], function(d) { return d[1]; })
        ])
        .range([height - padding, padding]);

    let svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    let groups = svg.selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .attr("fill", function(d, i) {
            return color(i);
        });

    let rects = groups.selectAll("rect")
        .data(function(d) {
            return d;
        })
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return yScale(d[1]);
        })
        .attr("height", function(d) {
            return yScale(d[0]) - yScale(d[1]);
        })
        .attr("width", xScale.bandwidth());
}

init();