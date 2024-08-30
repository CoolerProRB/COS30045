if (location.pathname.includes(".html") && !location.pathname.includes("index.html")){
    location.href = "../";
}

if (location.pathname.includes(".html") && location.pathname.includes("index.html")){
    location.href = "./";
}