$("#nav").load("shared/nav_bar.html");

/**
 * Load a page into the content container and set the title of the page
 *
 * @param {string} filePath Path to the file to load
 * @param {string} title Title of the page
 * @returns {void}
 */
function loadPage(filePath, title){
    $("#content").load(filePath);
    $("title").text(title);
}

/**
 * Load an image into the image container
 *
 * @param {string} fileName Path to the image
 * @param {string} description Description of the image
 * @returns {void}
 */
function loadImage(fileName, description){
    $("#imgContainer").attr("src", fileName);
    $("#imgAlt").html(description);
}