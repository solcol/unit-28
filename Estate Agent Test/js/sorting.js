// sort randomly on-load
reSort("weighted");

// this function called whenever the <select> element is changed
async function reSort(sortMethod) {
    let sortedHouses = houses;

    console.info("Sorting");

    switch (sortMethod) {
        case "low-to-high": {
            console.info("Low to High");
            sortedHouses.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
        }

        case "high-to-low": {
            console.info("High to Low");
            sortedHouses.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
        }

        case "weighted": {
            console.info("Weighted");
            // "weighted" is so houses can be shown in a specific order though at the moment they are just random
            sortedHouses.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
            break;
        }

        default: {
            // do nothing and keep the order they are in the json file
        }
    }

    console.log(sortedHouses);

    // this is what is going to be added to the document
    let outputHTML = "";

    // give each house an ID (for the image gallery)
    let houseID = 0;
    // loop through every house now we've sorted the array
    for(const h of sortedHouses) {
        houseID++;

        // imageHTML is all the image elements for each house
        let imageHTML = "";
        let imageID = 0;

        for(const img of h.images) {
            imageID++;

            // if the image is the first, show it (set the display to block) otherwise hide it (set display to none)
            imageHTML += `
                <img src="${img}" style="display: ${(imageID==1)?'block':'none'};" id="${houseID}-${imageID}">
            `
        }

        // add each house in the listing page to the "outputHTML" variable
        outputHTML += `
        <li class="column is-one-third">
        <div class="card">
            <header class="card-header is-shadowless">
                <p class="card-header-title">
                    ${h.title}
                </p>
            </header>

            <div class="card-image">
                <figure class="image is-16by9 is-clickable image-gallery" id="${houseID}" data-imagecount="${h.images.length}" data-currentimage="1" onclick="cycleImage(this)">
                    ${imageHTML}
                </figure>
            </div>
            <div class="card-content">
            <div class="tags are-large">
                    <span class="tag">${h.type}</span>
                    <span class="tag">${h.is_for}</span>
                    
                    ${h.rights?`<span class="tag">${h.rights}</span>`:''}
                </div>
                <div class="tags are-medium">
                    <span class="tag"><i class="fas fa-fw fa-bed"></i>&nbsp;${h.beds?h.beds:'?'} beds</span>
                    <span class="tag"><i class="fas fa-fw fa-bath"></i>&nbsp;${h.baths?h.baths:'?'} baths</span>
                </div>

                <div class="content is-pulled-right">
                    ${h.price_type?h.price_type:''} <b>£${h.price}</b>
                </div>
            </div>
        </div>
        </li>
        `
    }

    // set the content of the list (sorting) to the output HTML (all the houses)
    document.getElementById('sorting').innerHTML = outputHTML;
}