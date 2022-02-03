// this function is called whenever an image-gallery figure element is clicked
// the figure element itself (f) is passed in so properties can be read from it
async function cycleImage(figureElement) {
    const f = figureElement;

    // retrieve the current image and image count from the HTML element attributes
    const id = f.id;
    const current = parseInt(f.dataset.currentimage);
    const total = parseInt(f.dataset.imagecount);

    let next = 1;
    if(current >= total) {
        // we're on the last image (reached the total), loop around to the first
        next = 1;
    } else {
        // if the current image is not the last (total), go to the next one
        next = current + 1;
    }
    
    console.log(current, next, total);

    // hide the current image and show the next one
    document.getElementById(`${id}-${current}`).style.display = 'none';
    document.getElementById(`${id}-${next}`).style.display = 'block';

    // update the attributes now we've changed the image
    f.dataset.currentimage = next;
}