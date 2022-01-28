
        reSort("weighted");

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
                    sortedHouses.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
                    break;
                }


                default: {
                    // continue;
                }
            }

            console.log(sortedHouses);

            let outputHTML = "";

            let houseID = 0;
            for(const h of sortedHouses) {
                houseID++;

                let imageHTML = "";
                let imageID = 0;

                for(const img of h.images) {
                    imageID++;

                    imageHTML += `
                        <img src="${img}" style="display: none;" id="${houseID}-${imageID}">
                    `
                }

                outputHTML += `
                <li>
                    <figure class="image-gallery" id="${houseID}" data-imagecount="${h.images.length}" data-currentimage="1" onclick="cycleImage(this)">
                        ${imageHTML}
                        <p>CLICK TO CYCLE</p>
                    </figure>

                    <h1 class="title">${h.title}</h1>
                    <h2 class="stats">
                    <i class="fas fa-fw fa-bed"></i> ${h.beds?h.beds:'?'} beds &bull;
                    <i class="fas fa-fw fa-bath"></i> ${h.baths?h.baths:'?'} baths
                    </h2>
                    <h3>${h.type} to ${h.is_for},${h.price_type?` ${h.price_type}`:''} <b>£${h.price}</b>${h.rights?` (${h.rights})`:''}</h3>
                </li>
                `
            }

            document.getElementById('sorting').innerHTML = outputHTML;
        }