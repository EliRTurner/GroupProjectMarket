var file = document.getElementById('upload-file');
var newItemImage = document.getElementById('new-item-image')

file.addEventListener("change", function(event) {
    var files = file.files;
    console.log(file.files[0])
    if (files.length) {
        console.log("Filename: " + files[0].name);
        console.log("Type: " + files[0].type);
        console.log("Size: " + files[0].size + " bytes");
    }
    
    
    
   if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            newItemImage.src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }

}, false);

function postItem(){
    var formData = new FormData();
    var imageId;
    
    formData.append('image', file.files[0])
    
    fetch('https://et593.brighton.domains:44444/uploadImage', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        var itemData = {
        title: document.getElementById('new-item-title').value,
        description: document.getElementById('new-item-description').value,
        price: document.getElementById('new-item-price').value,
        sold: 0,
        category: document.getElementById('new-item-category').value,
        userId: 1,
        imageId: data.imageId,
        email: document.getElementById('new-item-email').value
    }
    console.log(itemData)
    
    fetch('https://et593.brighton.domains:44444/additem', {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData)
        
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    
    console.log("GENERATED IMAGE ID: " + data.imageId)
    })
    .catch(error => console.log(error))
    

}

function search(){
    var searchQuery = document.getElementById("search-box").value
    window.location.href = "https://et593.brighton.domains:44444/search?search=" + searchQuery;
}

