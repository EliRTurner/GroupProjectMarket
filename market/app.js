var http = require('https');
var mysql = require('mysql');
var fs = require('fs');
var url = require('url');
var formidable = require('formidable');
var path = require('path')

var privateKey = fs.readFileSync('server.key').toString();
var certificate = fs.readFileSync('server.crt').toString();
var con;

var credentials = {key: privateKey, cert: certificate};


var server = http.createServer(credentials, function(req, res) {

  console.log(req.url);

 //all the endpoints to retrieve HTML, JS, and CSS Files.
  if(req.url == '/'){
      res.writeHead(200, { 'Content-Type':'text/html'});
      var html = fs.readFileSync('public/index.html');
            
      res.end(html);
  }
        

  if(req.url == '/index'){
    console.log("attemping redirect");
    res.writeHead(301, {
        'Location': '/item'
      }).end();
  }
  
    if(req.url.startsWith('/search')){

      res.writeHead(200, { 'Content-Type':'text/html'});
      var html = fs.readFileSync('public/search.html');
            
      res.end(html);
  }

  if(req.url.startsWith('/item')){
    res.writeHead(200, { 'Content-Type':'text/html'});
      var html = fs.readFileSync('public/detail_product.html');
            
      res.end(html);
    }
    
    if(req.url.startsWith('/about')){
    res.writeHead(200, { 'Content-Type':'text/html'});
      var html = fs.readFileSync('public/about.html');
            
      res.end(html);
    }
    
    if(req.url.startsWith('/contact')){
    res.writeHead(200, { 'Content-Type':'text/html'});
      var html = fs.readFileSync('public/contact.html');
            
      res.end(html);
    }
    
    if(req.url == '/sellitem'){
    res.writeHead(200, { 'Content-Type':'text/html'});
      var html = fs.readFileSync('public/list_item.html');
            
      res.end(html);
    }

  if(req.url.startsWith('/script.js')){
    res.writeHead(200, {"Content-Type": "text/javascript"});
    var script = fs.readFileSync('script.js');
    res.end(script);
  }
  
  if(req.url.startsWith('/js/index.js')){
    res.writeHead(200, {"Content-Type": "text/javascript"});
    var script = fs.readFileSync('public/js/index.js');
    res.end(script);
  }
  
  if(req.url.startsWith('/js/newfile.js')){
    res.writeHead(200, {"Content-Type": "text/javascript"});
    var script = fs.readFileSync('public/js/newfile.js');
    res.end(script);
  }
  
  if(req.url.startsWith('/js/searchItems.js')){
    res.writeHead(200, {"Content-Type": "text/javascript"});
    var script = fs.readFileSync('public/js/searchItems.js');
    res.end(script);
  }
  
  if(req.url.startsWith('/js/item.js')){
    res.writeHead(200, {"Content-Type": "text/javascript"});
    var script = fs.readFileSync('public/js/item.js');
    res.end(script);
  }
  
  if(req.url.startsWith('/css/style.css')){
      res.writeHead(200, {"Content-Type": "text/css"});
      var css = fs.readFileSync('public/css/style.css');
      res.end(css);
  }
  if(req.url.startsWith('/css/additions.css')){
      res.writeHead(200, {"Content-Type": "text/css"});
      var css = fs.readFileSync('public/css/additions.css');
      res.end(css);
  }
  if(req.url.startsWith('/css/normalize.css')){
      res.writeHead(200, {"Content-Type": "text/css"});
      var css = fs.readFileSync('public/css/normalize.css');
      res.end(css);
  }
  

 if(req.url.startsWith('/getitem')){
    
    
    console.log('getting item');
    //get the url parameter for the item ID.
    var urlQuery = url.parse(req.url, true).query;
    console.log("URL QUERY")
    console.log(urlQuery.itemid);
    //if the parameter is not null then search the database for the item with that ID and return the information related to it in a response.
    if(urlQuery.itemid !== 'null'){
        console.log("Item found")
        con.query("SELECT * FROM items WHERE item_id ='" + urlQuery.itemid + "'", function (err, result, fields) {
        console.log(result[0])
        res.writeHead(200, {"Content-Type": "application/json"})
        console.log(JSON.stringify(result[0]))
        res.end(JSON.stringify(result[0]))
        })
    }
    else{
        console.log("No item found")
        res.end();
    }
  }


  if(req.url.startsWith('/queryitems')){
      //search the database based on the users search query.
    console.log('searching items');
    var urlQuery = url.parse(req.url, true).query;
    console.log(urlQuery);
    if(urlQuery.search !== 'null'){
        con.query("SELECT * FROM items WHERE title LIKE'%" + urlQuery.search + "%'", function (err, result, fields) {
        console.log(result[0])
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify(result))
        })
    }
    else{
        console.log("No search query")
        res.end();
    }
    
  }

  if(req.url.startsWith('/additem')){
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const itemData = JSON.parse(body);
      console.log(itemData);
      //Query the database to add a new item into the database.
      var sql = ("INSERT INTO items (item_id, title, description, price, sold, category, user_id, image_id, email) VALUES ('" +generateId()+ "','" + itemData.title+ "','" + itemData.description + "','" +itemData.price+ "','"  + itemData.sold + "','" + itemData.category + "','" + itemData.userId + "','" + itemData.imageId + "','" + itemData.email + "')");
      con.query(sql, function(err, result, fields){
        console.log(result);
        console.log(err)
      })
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({ message: "Item posted successfully" }));
    });
  }
  
  if(req.url.startsWith('/newitems')){
      //Query the database for the six newest item to be displayed on the home page.
    con.query("SELECT * FROM items ORDER BY date_posted DESC  LIMIT 6", function (err, result, fields) {
      console.log(result[0])
      res.writeHead(200, {"Content-Type": "application/json"})
      console.log(JSON.stringify(result))
      res.end(JSON.stringify(result))
      
    })
  }
  
  if(req.url.startsWith('/getImage')){
      //gets the image for an item based on the id 
    var urlQuery = url.parse(req.url, true).query;
    console.log(urlQuery)
      var img = fs.readFileSync('public/images/' + urlQuery.imageId + '.jpg');
      res.writeHead(200, {'Content-Type': 'image/gif' });
        res.end(img, 'binary');
  }
  
  if(req.url.startsWith('/uploadImage')){
      const form = new formidable.IncomingForm();
      
    //parse the form sent by the user to retrieve the image
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }
      
      // Access the uploaded image through files.image
      const imageFile = files.image;
      console.log('Image uploaded')
      
      var imageId = generateId();
      
      const filename = imageId + ".jpg";

        //create the path for the image to be uploaded
      const uploadPath = path.join('public/images', filename);
      
      //move the file to the new upload path
      fs.copyFile(imageFile.filepath, uploadPath, (error) => {
        if (error) {
          console.error('Error moving file:', error);
          res.statusCode = 500;
          res.end('Internal Server Error');
          return;
        }
        
        console.log('File copied')
      });
        
        console.log("Sending response for uploadImage")
        res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Image uploaded successfully', imageId: imageId }));
    });
  }

});

function generateId(){
    //generate a random ID for images and items
    return Math.floor(Math.random() * (2147483647 - 1000000000 + 1) + 1000000000);
}



//this function connects to the database on Brighton Domains and also makes sure to reconnect if there are any disconnects or errors
function connectToDatabase(){
    con = mysql.createConnection({
  host: "178.128.37.54",
  user: "et593_elias",
  password: "MarketplacePassword1",
  database: "et593_marketplace",
  port: "3306"
});
    
    
    con.connect(function(err) {
        if (err){
            Console.log("Error connection to database. Error: " + err);
            //wait 2 seconds before reconnecting so the server is no overloaded by requests
            setTimeout(connectToDatabase, 2000);
        }else{
            console.log("Connected to database!");
        }
        
        
    });
    //if there is an error call the function again to connect.
    con.on('error', function(err) {
        console.log('db error', err);
        connectToDatabase();
    });
}

connectToDatabase();



//open the server on port 44444
server.listen(44444);
console.log(server.address());
console.log("Current directory:", __dirname);
