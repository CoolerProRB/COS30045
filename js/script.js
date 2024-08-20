$("#nav").load("shared/nav_bar.html");

function loadPage(filePath, id){
    $("#content").load(filePath);
}

function loadImage(fileName, description){
    $("#imgContainer").attr("src", fileName);
    $("#imgAlt").html(description);
}