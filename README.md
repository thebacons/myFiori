# myFiori
A simple demo creating a local fiori app using @sap/cds



Creating a Fiori app using Node.js typically involves using the SAP Business Application Studio or a similar development environment to scaffold, develop, and deploy your application. The SAP Business Application Studio is a powerful environment that supports full-stack development, including Fiori apps. However, Node.js is often used in the context of creating backend services or enhancing SAP Fiori's capabilities, especially when deploying on the SAP Business Technology Platform (SAP BTP).

For this example, I'll guide you through creating a simple Fiori app using Node.js for the backend service. This service will be a simple OData service that our Fiori app can consume. We'll use the  `express`  framework for Node.js to create our OData service.

### Step 1: Setting Up Your Node.js Environment

Ensure you have Node.js installed on your system. You can download it from  [nodejs.org](https://nodejs.org/).

### Step 2: Creating Your Node.js Project

1.  Create a new directory for your project and navigate into it:

`

    ``bash
        mkdir myFioriApp
           cd myFioriApp

2.  Initialize a new Node.js project:

    bash
           npm init -y

3.  Install the necessary Node.js modules. We'll use  `express`  for the web server and  `@sap/cds`  for the CAP (Cloud Application Programming) model, which simplifies the creation of OData services:


    bash
    

    npm install express @sap/cds

### Step 3: Creating the OData Service

1.  Create a new file named  `server.js`  in your project directory.
    
2.  Add the following code to  `server.js`  to set up a basic express server and OData service:
    

    ```javascript
    const  express  =  require('express');
    const  cds  =  require('@sap/cds');
    const  sqlite3  =  require('sqlite3').verbose();
    const  app  =  express();
    const  cors  =  require('cors'); // Add this line
    
      
    
    // Body parsing middleware
    app.use(express.json());
    app.use(cors()); // And this line
    
      
    
    // Connect to SQLite database
    const  db  =  new  sqlite3.Database('db.sqlite', (err) => {
    	if (err) {
    		if (err) {console.error(err.message);
    		}
    		console.log('Connected to the SQLite database.');
    	}	
    });
    cds.serve('all').in(app);
    
    // Custom endpoint to get all books
    app.get('/books', async (req, res) => {
    db.all('SELECT * FROM myfioriapp_Books', [], (err, rows) => {
    			if (err) {
    				throw  err;
    			}
    		res.json(rows);
    	});
    });
    
    // Custom endpoint to add a book
    app.post('/books', async (req, res) => {
    	const { title, author } =  req.body;
    	db.run(`INSERT INTO myfioriapp_Books (title, author) VALUES (?, ?)`, [title, author], function(err) {
    if (err) {
    		return  console.log(err.message);
    		}
    	res.json({ message:  'Book added successfully' 
    		});
    	});
    });
      
    const  port  =  process.env.PORT  ||  4000;
    app.listen(port, () => {
    	console.log(`Server is running on port ${port}`);
    });

### Step 4: Creating the Fiori App
`

    ``<!DOCTYPE  html>
    
    <html>
    <head>
    	<title>Add a Book</title>
    </head>
    	<body>
    		<form  id="add-book-form">
    				<label  for="title">Title:</label><br>
    				<input  type="text"  id="title"  name="title"><br>
    				<label  for="author">Author:</label><br>
    				<input  type="text"  id="author"  name="author"><br>
    				<input  type="submit"  value="Add Book">
    		</form>
    
    		<script>
    			document.getElementById('add-book-form').addEventListener('submit', function(event) {
    				event.preventDefault();
    				var  title = document.getElementById('title').value;
    				var  author = document.getElementById('author').value;
    				fetch('http://localhost:4000/books', {
    				method:  'POST',
    				headers: {
    					'Content-Type':  'application/json',
    					},
    					body:  JSON.stringify({ title:  title, author:  author }),
    					})
    					.then(response  =>  response.json())
    					.then(data  => {
    				console.log('Book added successfully:', data);
    				})
    				.catch((error) => {
    				console.error('Error:', error);
    				});
    			});
    		</script>
    	</body>
    </html>

### Step 4: Creating the Fiori App

While the backend service is ready, creating the UI for the Fiori app typically involves using SAPUI5 or Fiori elements. You would usually use the SAP Business Application Studio for this part, which provides templates and a visual editor to speed up the development.

However, since our focus here is on using Node.js, it's important to note that the Fiori app's UI development is not directly done in Node.js but rather in SAPUI5 or Fiori elements, which are client-side technologies. Node.js is used to run the backend or server-side logic, such as OData services that the Fiori app will consume.

### Step 5: Deploying Your App

Deployment can be done on the SAP Business Technology Platform (SAP BTP) using the Cloud Foundry environment or the SAP BTP, Kyma runtime, depending on your project requirements.

1.  Build your Fiori app using the appropriate build tool (e.g.,  `ui5 build`  for SAPUI5 apps).
    
2.  Deploy the built app and the Node.js service to your chosen runtime environment on SAP BTP.
    

This example provides a very high-level overview of creating a Fiori app with a Node.js backend. The actual implementation details can vary significantly based on the specific requirements of your Fiori app, the complexity of your OData service, and where you plan to deploy your app.


# Documentation
# Functional Specification

## Purpose
The purpose of this application is to provide a simple interface for adding books to a database. The application consists of a client-side HTML form and a server-side Node.js application. The client-side form collects the title and author of a book and sends this data to the server. The server then inserts this data into a SQLite database.

## User Interface
The user interface is a simple HTML form with two text input fields for the title and author of a book, and a submit button to add the book to the database.

## Data Flow
When the user submits the form, a POST request is sent to the server with the title and author of the book in the request body. The server then inserts this data into the SQLite database and sends a response back to the client indicating whether the operation was successful.

# Technical Specification

## Server
The server is a Node.js application using the Express.js framework. It uses the `cors` middleware to allow cross-origin requests, the `body-parser` middleware to parse JSON request bodies, and the `sqlite3` module to interact with a SQLite database.

### Server Code Explanation
1. Import the required modules: `express` for the server, `@sap/cds` for the CAP services, `sqlite3` for the database, and `cors` for handling cross-origin requests.
2. Initialize the Express application and use the `cors` and `express.json` middlewares.
3. Connect to the SQLite database.
4. Serve all CAP services.
5. Define a GET endpoint at `/books` to fetch all books from the database.
6. Define a POST endpoint at `/books` to add a new book to the database.
7. Start the server on port 4000.

## Client
The client is a simple HTML page with a form for the title and author of a book, and a script to handle form submissions.

### Client Code Explanation
1. Define an HTML form with input fields for the title and author of a book.
2. Add an event listener to the form that prevents the default form submission and sends a POST request to the server with the title and author of the book in the request body.
3. Log the server's response to the console.

## Installation
To install the required Node.js libraries, run `npm install express @sap/cds sqlite3 cors` in the terminal. This will install the `express`, `@sap/cds`, `sqlite3`, and `cors` modules.

The `cors` module is needed to allow cross-origin requests. By default, web browsers block requests to a different origin (domain, protocol, or port) from the page's origin for security reasons. The `cors` middleware adds the necessary headers to the response to tell the browser that it's okay to allow the request.

# Configuration
The `package.json` file should include the following dependencies:

```json
"dependencies": {
  "express": "^4.17.1",
  "@sap/cds": "^5.7.0",
  "sqlite3": "^5.0.2",
  "cors": "^2.8.5"
}
```

# Implementation Approach
The application was implemented locally on a PC for simplicity and ease of development. It could be deployed to SAP BTP or any other cloud platform if needed. The main steps in the implementation were:

1. Set up the Node.js server with Express and SQLite.
2. Create the HTML form and JavaScript to handle form submissions.
3. Enable CORS on the server to allow cross-origin requests.
4. Test the application by adding a book through the form and checking the database.

This approach was chosen because it's simple, straightforward, and suitable for a small application like this. It allows for quick development and testing without the need for a complex setup or deployment process.

# Local installation of CAP

The [`cds`](command:_github.copilot.openSymbolInFile?%5B%22package.json%22%2C%22cds%22%5D "package.json") section in your [`package.json`](command:_github.copilot.openRelativePath?%5B%22package.json%22%5D "package.json") file is used to configure the SAP Cloud Application Programming (CAP) model. Here's what each part of the configuration does:

The SAP Cloud Application Programming (CAP) model is designed to work both in the cloud and on local machines. The configuration you have set up in your `package.json` file is for a local SQLite database, which is perfect for testing on your standalone PC.

Here's how you can do it:

1. First, you need to compile your CAP model to generate the `gen/csn.json` file. You can do this by running the following command in your terminal:
```bash

npx cds compile ./ --to csn > gen/csn.json

```

2. Then, you can deploy your model to the SQLite database by running:

```bash

npx cds deploy --to sqlite:test.db

```

3. Now, you can start your application by running:

```bash

npm start
```
This will start your application and it will use the SQLite database `test.db` for the 'db' service. You can test your application by sending requests to it from a tool like Postman or from your web browser.

Remember to replace `npm start` with the actual command you use to start your application if it's different.

The `export` command is used in Unix-based systems like Linux and MacOS. For Windows, you should use the `set` command to add a directory to your PATH:

    set PATH=%cd%\node_modules\.bin;%PATH%

PowerShell, which has a different syntax for setting environment variables. In PowerShell, you can use the
 

`$env:` prefix to set environment variables. Here's how you can add the `node_modules\.bin` directory to your PATH in PowerShell:

    powershell
    $env:PATH = "$PWD\node_modules\.bin;" + $env:PATH```

This command adds the `node_modules\.bin` directory in your current directory (`%cd%`) to your PATH. After running this command, you should be able to run the `npx cds compile` command:

```bash

npx cds compile ./ --to csn > gen/csn.json

```

If you have trouble, you can try running the `cds` command directly from the `node_modules\.bin` directory:

    ```bash
    
    .\node_modules\.bin\cds compile ./ --to csn > gen/csn.json


As for adding the path to the environment variables permanently, you can do that through the System Properties window in Windows. However, it's generally not recommended to add project-specific paths like `node_modules\.bin` to your system-wide PATH, because it can lead to conflicts between different projects. It's better to set the PATH in each terminal session where you need it.`

# SQLITE database

If you want to use a SQLite database for testing, you need to specify this in a configuration file (`package.json` or `default-env.json`). Here's an example of how to do this in `package.json`:

```json
{
"cds": {
	"requires": {
		"db": {
			"kind": "sqlite",
			"model": "gen/csn.json",
			"credentials": {
				"database": "test.db"
				}
			}
		}
	}
}
```

This tells the CAP model to use a SQLite database named `test.db` for the 'db' service. The `gen/csn.json` file is generated by the `cds compile` command and contains the compiled CAP model.

After setting this up, you can use `cds deploy` to create the database and fill it with test data.

1. Install SQLite3 module: SQLite3 is a very easy-to-use module which is integrated with Node.js and it is a relational database.

```bash

npm install sqlite3

```

2. Create a new file `db.js` and write the following code:

```javascript

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db.sqlite', (err) => {

if (err) {

console.error(err.message);

}

console.log('Connected to the SQlite database.');

});

module.exports = db;

```

This code creates a new SQLite database named `db.sqlite` in the current directory and exports the `db` object for other modules to use.

3. Now, you can use this `db` in your `server.js` file like this:

```javascript

const express = require('express');

const cds = require('@sap/cds');

const db = require('./db'); // Import the db object from db.js

const app = express();

cds.connect.to(db); // Use the db object here

cds.serve('all').in(app);

const port = process.env.PORT || 4000;

app.listen(port, () => {

console.log(`Server is running on port ${port}`);

});

```

Please note that this is a very basic setup and might not work with the `@sap/cds` module as it is. You might need to adjust the code according to the actual requirements of your application.
