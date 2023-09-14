# Node.js simple API
## app.js
### Endpoints
* **/generate** - generates a random number in range from 1 to 1000
* **/retrieve/:id** - retrieves a generated number by its id from the storage
* **/all** - retrieves all numbers from storage

Uses object *generatedResults* to store generated values.

## app2.js
### Endpoints
* **/generate** - generates a random number in range from 1 to 1000
* **/retrieve/:id** - retrieves a generated number by its id from the storage
* **/all** - retrieves all numbers from storage
* **/clear** - clears the database

Uses sqlite3 database *results* to store generated values.
