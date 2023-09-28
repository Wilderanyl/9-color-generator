const colors = document.querySelectorAll("[data-color]");

colors.forEach((color) => {
    color.style.backgroundColor = "#" + getColorCode();
    color.innerText = "#" + getColorCode();
});

function getColorCode () {
    const hex = "0123456789abcdf";
    let colorCode = "";
    for(let i = 0; i<6; i++) {
        const num = Math.floor(Math.random() * hex.length);
        colorCode += hex.substring(num, num+1);
    }
    return colorCode;
}