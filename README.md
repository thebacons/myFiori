# myFiori
A simple demo creating a local fiori app using @sap/cds



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
![image](https://github.com/thebacons/myFiori/assets/77930793/00f46bcd-2967-4cec-90ad-22b787e3184b)

