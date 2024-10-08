function init(){
    height = 300;
    width = 300;

    dataSet = [5, 10, 20, 45, 65];

    let outerRadius = width/2;
    let innerRadius = width / 3;

    let color = d3.scaleOrdinal(d3.schemeCategory10);

    let arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    let pie = d3.pie();

    svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    let arcs = svg.selectAll("g.arc")
        .data(pie(dataSet))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

    arcs.append("path")
        .attr("fill", function(d, i){
            return color(i);
        })
        .attr("d", function (d, i){
            return arc(d, i);
        });

    arcs.append("text")
        .text(function(d){
            return d.value;
        })
        .attr("transform", function(d){
            return "translate(" + arc.centroid(d) + ")";
        })
}

init();