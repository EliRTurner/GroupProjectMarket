console.log('script loaded')

fetch("https://et593.brighton.domains:41229/getitem?itemid=1", {
    
  method: 'get',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
})
.then((response) => response.json())
.then((data) => console.log(data))
.catch((error) => console.error(error));

fetch("https://et593.brighton.domains:41229/searchitems?query=bike", {
    
  method: 'get',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
})
.then((response) => response.json())
.then((data) => console.log(data))
.catch((error) => console.error(error));

var data = {
  userId: 123,
  title: "bike for sale",
  description: 'new bike unused',
  sold: 0,
  price: 100.00,
  category: "vehicles",
  
  
}

fetch("https://et593.brighton.domains:41229/additem", {

  method: "post",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})