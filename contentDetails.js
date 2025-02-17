console.clear();

let id = location.search.split('?')[1];
console.log(id);

if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

function dynamicContentDetails(ob) {
    let mainContainer = document.createElement('div');
    mainContainer.id = 'containerD';
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div');
    imageSectionDiv.id = 'imageSection';

    let imgTag = document.createElement('img');
    imgTag.id = 'imgDetails';
    imgTag.src = ob.preview;

    imageSectionDiv.appendChild(imgTag);

    let productDetailsDiv = document.createElement('div');
    productDetailsDiv.id = 'productDetails';

    let h1 = document.createElement('h1');
    let h1Text = document.createTextNode(ob.name);
    h1.appendChild(h1Text);

    let h4 = document.createElement('h4');
    let h4Text = document.createTextNode(ob.brand);
    h4.appendChild(h4Text);

    let detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';

    let h3DetailsDiv = document.createElement('h3');
    let h3DetailsText = document.createTextNode('Rs ' + ob.price);
    h3DetailsDiv.appendChild(h3DetailsText);

    let h3 = document.createElement('h3');
    let h3Text = document.createTextNode('Description');
    h3.appendChild(h3Text);

    let para = document.createElement('p');
    let paraText = document.createTextNode(ob.description);
    para.appendChild(paraText);

    // Size Selection Section with Improved Styling
    let sizeDiv = document.createElement('div');
    sizeDiv.id = 'sizeDiv';

    let sizeTitle = document.createElement('h3');
    sizeTitle.textContent = 'Select Size:';

    let sizes = ['S', 'M', 'L', 'XL']; // Available sizes

    let sizeButtonsContainer = document.createElement('div');
    sizeButtonsContainer.id = 'sizeButtons';

    sizes.forEach(size => {
        let label = document.createElement('label');
        label.textContent = size;
        label.classList.add('size-label');

        let radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'size';
        radio.value = size;
        radio.classList.add('size-radio');

        // Add event listener to highlight selected size
        radio.addEventListener('change', function () {
            document.querySelectorAll('.size-label').forEach(lbl => lbl.classList.remove('selected'));
            label.classList.add('selected');
        });

        label.appendChild(radio);
        sizeButtonsContainer.appendChild(label);
    });

    sizeDiv.appendChild(sizeTitle);
    sizeDiv.appendChild(sizeButtonsContainer);

    let productPreviewDiv = document.createElement('div');
    productPreviewDiv.id = 'productPreview';

    let h3ProductPreviewDiv = document.createElement('h3');
    let h3ProductPreviewText = document.createTextNode('Product Preview');
    h3ProductPreviewDiv.appendChild(h3ProductPreviewText);
    productPreviewDiv.appendChild(h3ProductPreviewDiv);

    ob.photos.forEach(photo => {
        let imgTagProductPreviewDiv = document.createElement('img');
        imgTagProductPreviewDiv.id = 'previewImg';
        imgTagProductPreviewDiv.src = photo;
        imgTagProductPreviewDiv.onclick = function () {
            imgTag.src = this.src;
        };
        productPreviewDiv.appendChild(imgTagProductPreviewDiv);
    });

    let buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';

    let buttonTag = document.createElement('button');
    buttonDiv.appendChild(buttonTag);

    let buttonText = document.createTextNode('Add to Cart');
    buttonTag.onclick = function () {
        let selectedSize = document.querySelector('input[name="size"]:checked');
        if (!selectedSize) {
            alert('Please select a size before adding to the cart.');
            return;
        }
        let order = id + " (" + selectedSize.value + ")";
        let counter = 1;
        if (document.cookie.indexOf(',counter=') >= 0) {
            order = id + " (" + selectedSize.value + ") " + document.cookie.split(',')[0].split('=')[1];
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1;
        }
        document.cookie = "orderId=" + order + ",counter=" + counter;
        document.getElementById("badge").innerHTML = counter;

        // Display an alert when an item is added to the cart
        alert('Item added to cart!');

        console.log(document.cookie);
    };
    buttonTag.appendChild(buttonText);

    mainContainer.appendChild(imageSectionDiv);
    mainContainer.appendChild(productDetailsDiv);
    productDetailsDiv.appendChild(h1);
    productDetailsDiv.appendChild(h4);
    productDetailsDiv.appendChild(detailsDiv);
    detailsDiv.appendChild(h3DetailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(para);
    productDetailsDiv.appendChild(sizeDiv); // Append size selection
    productDetailsDiv.appendChild(productPreviewDiv);
    productDetailsDiv.appendChild(buttonDiv);
}

// BACKEND CALLING
let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status == 200) {
        let contentDetails = JSON.parse(this.responseText);
        dynamicContentDetails(contentDetails);
    } else {
        console.log('Failed to fetch data.');
    }
};

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + id, true);
httpRequest.send();
