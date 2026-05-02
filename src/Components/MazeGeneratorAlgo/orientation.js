function chooseOrientation(width, height) {

    if (width > height) {
        return "Vertical"
    }
    else if (height > width) {
        return "Horizontal"
    }
    else {
        return Math.floor(Math.random() * 2) === 0 ? "Horizontal" : "Vertical";
    }

}

export default chooseOrientation