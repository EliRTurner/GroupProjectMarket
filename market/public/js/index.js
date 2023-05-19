var print = (msg) => {
    console.log(msg);
}
document.addEventListener('DOMContentLoaded', () => {

        displayNewItems();
        getItem();

    }
)

function displayNewItems(){
    productContainer = document.getElementById('product-container'); 
    fetch("https://et593.brighton.domains:44444/newitems", {
    
        method: 'get',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    
        for(var i=0; i < 6; i++){
            var date = data[i].date_created;  
            var title = data[i].title;
            var price = data[i].price;
            var description = data[i].description;
            var itemId = data[i].item_id
            // var imgURL = number.links[0].href;
            
            var cardElement = document.createElement('div');   //Creates card with elements for data taken
            var imageElement = document.createElement('img');
            var titleElement = document.createElement('p');
            var descriptionElement = document.createElement('p');
            var dateElement = document.createElement('p');
            var priceElement = document.createElement('p');
            var titleLinkElement = document.createElement('a');
            titleLinkElement.appendChild(titleElement);
            titleLinkElement.title = 'Test Title';
            titleLinkElement.setAttribute('href', 'https://et593.brighton.domains:44444/getitem?' + itemId)
            titleLinkElement.href = 'https://et593.brighton.domains:44444/item?itemid=' + itemId;
            
            
            imageElement.id = 'image'; //Imports data into the elements
            
            var img = "https://et593.brighton.domains:44444/getImage?imageId=" + data[i].image_id

    
            imageElement.src = img;
            titleElement.id = 'desc';
            titleElement.innerText = title;
            descriptionElement.id = 'text';
            descriptionElement.innerText = description;
            dateElement.id = 'date';
            dateElement.innerText = date;
            cardElement.id = 'card';
            priceElement.id = 'text';
            priceElement.innerText = "£" + price;
            
            cardElement.appendChild(imageElement);
            // cardElement.appendChild(titleElement);
            cardElement.appendChild(titleLinkElement)
            cardElement.appendChild(descriptionElement);
            cardElement.appendChild(priceElement);
            cardElement.appendChild(dateElement)
            productContainer.appendChild(cardElement);
        }
    
    })
    .catch((error) => console.error(error));
}

function getItem(){
    var url_string = window.location.href; 
    var url = new URL(url_string);
    var itemIdQuery = url.searchParams.get("itemid");
    console.log(itemIdQuery);
    fetch("https://et593.brighton.domains:44444/getitem?itemid=" + itemIdQuery, {
    
        method: 'get',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

function search(){
    var searchQuery = document.getElementById("search-box").value
    window.location.href = "https://et593.brighton.domains:44444/search?search=" + searchQuery;
}

fetch("https://et593.brighton.domains:44444/getImage", {
    
        method: 'get',
        headers: {
        'Accept': 'image/gif',
        'Content-Type': 'image/gif'
        },
    })
    .then((response) => response.blob())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));