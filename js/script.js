$("#nav").load("shared/nav_bar.html");

let dataSet;
let width;
let height;
let svg;
let padding;

/**
 * Load a page into the content container and set the title of the page
 *
 * @param {string} filePath Path to the file to load
 * @param {string} title Title of the page
 * @returns {void}
 */
function loadPage(filePath, title){
    $.ajax({
        url: filePath,
        type: 'GET',
        success: function(data){
            $("#content").load(filePath);
            $("title").text(title);

            sessionStorage.setItem("title", title);
            sessionStorage.setItem("path", filePath);
        },
        error: function(){
            loadPage("main_page.html", "Home");
        }
    });
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