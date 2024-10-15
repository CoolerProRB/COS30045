width = 500;
height = 300;

// SVG canvas setup
svg = d3.select('#container').append('svg')
    .attr('width', width)
    .attr('height', height);

// Load GeoJSON data
d3.json('csv/LGA_VIC.json').then(geoData => {
    // Get bounds and adjust projection
    const bounds = d3.geoBounds(geoData);
    const center = [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2];

    const projection = d3.geoMercator()
        .center(center)
        .scale(2450)  // Adjust scale as needed
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Draw paths for each LGA
    svg.selectAll('path')
        .data(geoData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('stroke', 'black')
        .attr('fill', 'lightblue');  // Temporary fill to ensure visibility
}).catch(error => console.error('Error loading the GeoJSON file:', error));