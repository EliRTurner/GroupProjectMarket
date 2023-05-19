
document.addEventListener('DOMContentLoaded', () => {

        displayItem();

    }
)

function displayItem(){
    
    var url_string = window.location.href; 
    var url = new URL(url_string);
    var itemId = url.searchParams.get("itemid");
    console.log(itemId)
    
    fetch("https://et593.brighton.domains:44444/getitem?itemid=" + itemId, {
    
        method: 'get',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    
            var title = data.title;
            var price = data.price;
            var description = data.description;
            var itemId = data.item_id
            
            
            var itemImage = document.getElementById('product-image');
            itemImage.src = 'https://et593.brighton.domains:44444/getImage?imageId=' + data.image_id
            
            document.getElementById('product-title').innerText = title;
            document.getElementById('product-price').innerText = '£' + price;
            var productInfo = document.getElementById('product-info');
            var descriptionElement = document.createElement('p');
            descriptionElement.innerText = description;
            var emailElement = document.createElement('p');
            emailElement.innerText = "Contact: " + data.email;
            
            productInfo.appendChild(descriptionElement);
            productInfo.appendChild(emailElement);
            
            
        
    
    })
    .catch((error) => console.error(error));
}


