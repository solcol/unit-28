async function cycleImage(figureElement) {
    const f = figureElement;

    const id = f.id;
    const current = parseInt(f.dataset.currentimage);
    const total = parseInt(f.dataset.imagecount);

    let next = 1;
    if(current >= total) {
        next = 1;
    } else {
        next = current + 1;
    }

    
    console.log(current, next, total);

    document.getElementById(`${id}-${current}`).style.display = 'none';
    document.getElementById(`${id}-${next}`).style.display = 'block';

    f.dataset.currentimage = next;
}