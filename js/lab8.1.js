width = 500;
height = 300;

// SVG canvas setup
// Create an SVG element within the container div, and set its width and height
svg = d3.select('#container').append('svg')
    .attr('width', width)
    .attr('height', height);

// Load GeoJSON data
d3.json('csv/LGA_VIC.json').then(geoData => {
    // Get bounds of the GeoJSON data to calculate the center for projection
    const bounds = d3.geoBounds(geoData);
    // Calculate the center point of the bounds (longitude, latitude)
    const center = [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2];

    // Set up the Mercator projection
    const projection = d3.geoMercator()
        .center(center)  // Center the map at the calculated center
        .scale(2450)  // Adjust scale to control zoom level
        .translate([width / 2, height / 2]);  // Translate projection to center of SVG canvas

    // Create a geoPath generator using the defined projection
    const path = d3.geoPath().projection(projection);

    // Draw paths for each Local Government Area (LGA)
    svg.selectAll('path')
        .data(geoData.features)  // Bind each feature (LGA) in the GeoJSON data
        .enter()  // Create a selection for each feature
        .append('path')  // Append a path element for each LGA
        .attr('d', path)  // Use the path generator to define the 'd' attribute (drawing instructions)
        .attr('stroke', 'black')  // Set the stroke color for LGA borders
        .attr('fill', 'lightblue');  // Fill each LGA with a light blue color for visibility
}).catch(error => console.error('Error loading the GeoJSON file:', error));  // Handle any errors that occur while loading the GeoJSON file
