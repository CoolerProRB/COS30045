width = 500;  // Set the width of the SVG canvas
height = 300; // Set the height of the SVG canvas

// SVG canvas setup
svg = d3.select('#container').append('svg')  // Create an SVG element within the container
    .attr('width', width)                    // Set the width attribute
    .attr('height', height)                  // Set the height attribute
    .attr("fill", "grey");                   // Set the fill color of the SVG

// Load unemployment data from CSV
d3.csv("csv/VIC_LGA_unemployment.csv").then(data => {
    // Define a color scale using d3's scaleQuantize for unemployment data
    const color = d3.scaleQuantize(d3.schemeBlues[9]);

    // Load LGA (Local Government Areas) geojson data
    d3.json('csv/LGA_VIC.json').then(json => {
        // Calculate the bounds of the map and adjust the center accordingly
        const bounds = d3.geoBounds(json);
        const center = [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2];

        // Define a geoMercator projection
        const projection = d3.geoMercator()
            .center(center)                     // Set the center of the map projection
            .scale(2450)                        // Set the scale (adjust for zoom level)
            .translate([width / 2, height / 2]); // Translate the map to the center of the canvas

        // Define a geoPath generator using the projection
        const path = d3.geoPath().projection(projection);

        // Loop through each LGA in the unemployment data
        for (let i = 0; i < data.length; i++) {
            let dataState  = data[i].LGA;           // Get the LGA name from the data
            let dataValue = parseFloat(data[i].unemployed); // Get the unemployment value

            // Draw paths for each LGA in the geojson data
            svg.selectAll('path')
                .data(json.features)                // Bind the geojson features
                .enter()
                .append('path')                     // Append a path for each feature
                .attr('d', path)                    // Define the path using the geoPath generator
                .attr("id", function (d, i) {
                    return d.properties.LGA_name.replaceAll(" ", "_"); // Assign an ID based on the LGA name
                });

            // Loop through geojson features to match with data
            for(let j = 0; j < json.features.length; j++){
                let jsonState = json.features[j].properties.LGA_name; // Get LGA name from geojson

                // Match the unemployment data with the corresponding LGA in the geojson
                if (dataState === jsonState){
                    json.features[j].properties.value = dataValue; // Store the data value in the feature properties

                    // Set fill color based on unemployment value
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
                        // Add mouseover interaction to change fill color
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
                        // Add mouseout interaction to revert fill color
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
                    break; // Stop loop once match is found
                }
            }
        }

        // Load city/town data from CSV
        d3.csv("csv/VIC_CITY.csv").then(cityData => {
            // Add circles to represent the cities/towns on the map
            svg.selectAll("circle")
                .data(cityData)                           // Bind city data to circles
                .enter()
                .append("circle")                         // Append a circle for each data point
                .attr("cx", d => projection([d.lon, +d.lat])[0]) // Set x position using projection
                .attr("cy", d => projection([d.lon, +d.lat])[1]) // Set y position using projection
                .attr("r", 5)                             // Set radius of the circle
                .attr("fill", "red")                      // Set fill color of the circle
                .style("opacity", 0.75);                  // Set opacity of the circle
        });
    });
});
