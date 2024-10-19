width = 500;
height = 300;

// SVG canvas setup
svg = d3.select('#container').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr("fill", "grey");

d3.csv("csv/VIC_LGA_unemployment.csv").then(data => {
    const color = d3.scaleQuantize(d3.schemeBlues[9]);

    d3.json('csv/LGA_VIC.json').then(json => {
        // Get bounds and adjust projection
        const bounds = d3.geoBounds(json);
        const center = [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2];

        const projection = d3.geoMercator()
            .center(center)
            .scale(2450)  // Adjust scale as needed
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        for (let i = 0; i < data.length; i++) {
            let dataState  = data[i].LGA;
            let dataValue = parseFloat(data[i].unemployed);

            // Draw paths for each LGA
            svg.selectAll('path')
                .data(json.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr("id", function (d, i) {
                    return d.properties.LGA_name.replaceAll(" ", "_");
                });

            for(let j = 0;j < json.features.length;j++){
                let jsonState = json.features[j].properties.LGA_name;

                if (dataState === jsonState){
                    json.features[j].properties.value = dataValue;

                    svg.select("#" + jsonState.replaceAll(" ", "_"))
                        .style('fill', function () {
                            if (dataValue < 1000){
                                return color(0.2);
                            }
                            else if (dataValue < 2500){
                                return color(0.4);
                            }
                            else if (dataValue < 5000){
                                return color(0.6);
                            }
                            else if (dataValue < 7500){
                                return color(0.7);
                            }
                            else if (dataValue < 10000){
                                return color(0.8);
                            }
                            else{
                                return color(1);
                            }
                        })
                        .on("mouseover", function (d) {
                            d3.select(this).style("fill", function () {
                                if (dataValue < 1000){
                                    return color(0.1);
                                }
                                else if (dataValue < 2500){
                                    return color(0.3);
                                }
                                else if (dataValue < 5000){
                                    return color(0.5);
                                }
                                else if (dataValue < 7500){
                                    return color(0.6);
                                }
                                else if (dataValue < 10000){
                                    return color(0.7);
                                }
                                else{
                                    return color(0.9);
                                }
                            });
                        })
                        .on("mouseout", function (d) {
                            d3.select(this).style("fill", function () {
                                if (dataValue < 1000){
                                    return color(0.2);
                                }
                                else if (dataValue < 2500){
                                    return color(0.4);
                                }
                                else if (dataValue < 5000){
                                    return color(0.6);
                                }
                                else if (dataValue < 7500){
                                    return color(0.7);
                                }
                                else if (dataValue < 10000){
                                    return color(0.8);
                                }
                                else{
                                    return color(1);
                                }
                            });
                        });
                    break;
                }
            }
        }

        d3.csv("csv/VIC_city.csv").then(cityData => {

            // Add circles to represent the cities/towns on the map
            svg.selectAll("circle")
                .data(cityData)
                .enter()
                .append("circle")
                .attr("cx", d => projection([d.lon, +d.lat])[0]) // Use projection to get x value
                .attr("cy", d => projection([d.lon, +d.lat])[1]) // Use projection to get y value
                .attr("r", 5) // Radius of the circle
                .attr("fill", "red") // Color of the circle
                .style("opacity", 0.75); // Opacity of the circle
        });
    });
})