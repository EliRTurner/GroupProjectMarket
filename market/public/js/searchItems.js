searchItems();

function searchItems(){
    var productContainer = document.getElementById('searched-items-container'); 
    console.log("searching items")
    var url_string = window.location.href; 
    var url = new URL(url_string);
    var searchQuery = url.searchParams.get("search");

    fetch("https://et593.brighton.domains:44444/queryitems?search=" + searchQuery, {
        method: 'get',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        
        if(data.length === 0){
            var noItems = document.createElement('h1');
            noItems.innerText = "No Items Found";
            productContainer.appendChild(noItems);
        }
        
    
        for(var i=0; i < 100; i++){
            var date = data[i].date_posted;  
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
            var infoContainer = document.createElement('div')
            titleLinkElement.appendChild(titleElement);
            titleLinkElement.title = 'Test Title';
            titleLinkElement.setAttribute('href', 'https://et593.brighton.domains:44444/getitem?' + itemId)
            titleLinkElement.href = 'https://et593.brighton.domains:44444/item?itemid=' + itemId;
            
            
            imageElement.id = 'long-card-image'; //Imports data into the elements
            imageElement.src = "https://et593.brighton.domains:44444/getImage?imageId=" + data[i].image_id;
            titleElement.id = 'desc';
            titleElement.innerText = title;
            descriptionElement.id = 'text';
            descriptionElement.innerText = description;
            dateElement.id = 'date';
            dateElement.innerText = date;
            cardElement.classList.add("long-card");
            priceElement.id = 'text';
            priceElement.innerText = "£" + price;
            
            cardElement.appendChild(imageElement);
            // cardElement.appendChild(titleElement);
            infoContainer.appendChild(titleLinkElement)
            infoContainer.appendChild(descriptionElement);
            infoContainer.appendChild(priceElement);
            infoContainer.appendChild(dateElement)
            cardElement.appendChild(infoContainer)
            productContainer.appendChild(cardElement);
            
            
            
        }
    })
    .catch((error) => console.error(error));
}

function search(){
    var searchQuery = document.getElementById("search-box").value
    window.location.href = "https://et593.brighton.domains:44444/search?search=" + searchQuery;
}