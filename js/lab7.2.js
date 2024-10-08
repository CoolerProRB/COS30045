// Function to initialize the pie chart
function init() {
    // Set height and width of the chart
    heiaght = 300;
    width = 300;

    // Data set for the pie chart
    dataSet = [5, 10, 20, 45, 65];

    // Define the outer and inner radius for the pie chart
    let outerRadius = width / 2; // Radius of the entire pie chart
    let innerRadius = width / 3; // Radius for the inner empty part of the pie chart

    // Set up color scale to assign a color to each segment of the pie chart
    let color = d3.scaleOrdinal(d3.schemeCategory10); // Using a pre-defined color scheme from d3

    // Define the arc generator
    let arc = d3.arc()
        .innerRadius(innerRadius) // Set the inner radius (for donut chart effect)
        .outerRadius(outerRadius); // Set the outer radius

    // Define the pie function to calculate start and end angles for each segment
    let pie = d3.pie();

    // Create an SVG element inside the container and set its dimensions
    svg = d3.select("#container")
        .append("svg")
        .attr("width", width) // Set the width of the SVG
        .attr("height", height); // Set the height of the SVG

    // Create group elements ("g") for each arc/segment
    let arcs = svg.selectAll("g.arc") // Select all "g" elements with class "arc"
        .data(pie(dataSet)) // Bind pie chart data to the "g" elements
        .enter() // Create placeholders for each data point
        .append("g") // Append a "g" element for each data point
        .attr("class", "arc") // Assign class "arc" to each "g" element for styling purposes
        .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")"); // Move the arc to the center of the SVG

    // Append path elements to each arc to draw the actual pie slices
    arcs.append("path")
        .attr("fill", function(d, i) { // Set fill color for each arc
            return color(i); // Use color scale to get a different color for each segment
        })
        .attr("d", function (d, i) { // Set the "d" attribute for each path (defining the shape of the arc)
            return arc(d, i); // Use the arc generator to create the path
        });

    // Append text labels to each arc
    arcs.append("text")
        .text(function(d) { // Set the text value
            return d.value; // Display the value for each segment
        })
        .attr("transform", function(d) { // Position the text
            return "translate(" + arc.centroid(d) + ")"; // Place the text at the centroid of each arc
        });
}

// Call the init function to render the pie chart
init();