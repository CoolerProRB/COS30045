d3.csv("csv/lab_2.4_exercise.csv").then(function (data) {
    barChart(data, 2019, "#container");
    barChart(data, 2021, "#container2");
});

function barChart(data, year, container) {
    let width = 800;
    let height = 400;

    let svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function (d, i) {
            let barWidth = width / data.length;
            let textLength = d["Pet Type"].length;
            let textWidthEstimate = textLength * 6;  // Estimating width assuming each character is ~6px wide
            return (i * barWidth) + (barWidth / 2) - (textWidthEstimate / 2);
        })
        .attr("y", function (d) {
            return height - 5;
        })
        .text(function (d) {
            return d["Pet Type"];
        })
        .style("fill", "white")
        .attr("font-size", "12px");

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return i * (width / data.length) + 1;
        })
        .attr("y", function (d) {
            return height - d[year] * 3 - 20;
        })
        .attr("width", width / data.length - 2)
        .attr("height", function (d) {
            return d[year] * 3;
        })
        .style("fill", "#1f3473");
}