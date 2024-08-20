$("#nav").load("shared/nav_bar.html");

function loadPage(filePath, id, title){
    $("#content").load(filePath);
    $("title").text(title);
}

function loadImage(fileName, description){
    $("#imgContainer").attr("src", fileName);
    $("#imgAlt").html(description);
}