This is a Flight Booking System Backend implementation in ExpressJS.I have kept every aspects of maintaining CLEAN CODE and tried to avoid bad code practices.

src -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make separate tests folder)

Lets take a look inside the src folder

config -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up dotenv so that we can use the environment variables anywhere in a cleaner fashion, this is done in the server-config.js. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

routes -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

middlewares -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc.

controllers -> they are kind of the last middlewares as post them you call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.

repositories -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

services -> contains the buiness logic and interacts with repositories for data from the database

utils -> contains helper methods, error classes etc.

Setup the project
Download this template from github and open it in your favourite text editor.
Go inside the folder path and execute the following command:
npm install
In the root directory create a .env file and add the following env variables

    PORT=<port number of your choice>
ex:

    PORT=3000
go inside the src folder and execute the following command:

  npx sequelize init
By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder.

If you're setting up your development environment, then write the username of your db, password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb etc

If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.

To Create migration for model-Airplane:
npx sequelize migration:generate --name airplanes--attributes modelNumber:string,capacity:integer
Other attributes and its validation can be copied from airplane.js model.

To Create migration for model-City:
npx sequelize migration:generate --name cities --attributes name:string
Other attributes and its validation can be copied from city.js model.

To Create migration for model-airport:
npx sequelize migration:generate --name airports --attributes name:string,code:string,address:string,city_id:integer
Other attributes and its validation can be copied from airport.js model.

To Create migration for model-flights:
npx sequelize migration:generate --name flights --attributes name:string,from:string,to:string,price:integer,arrival:Date,departure:Date,airplane:integer,boardingGate:integer,totalSeats:integer
Other attributes and its validation can be copied from flights.js model.

To Create foreign key constraint on airports table city_id:
npx sequelize migration:generate --name city_airport_association
Copy the code from city_airport_association migration file

Similarly for foreign key constraint on flights table airplane,do the above.

To Create foreign key constraint on flights from and to attributes:
Add references on both attributes on flights migration file.
ex:     references:{
          model: 'airports',
          key: 'code',
        },
        onDelete: 'CASCADE',
To migrate all the migration run: npx sequelize db:migrate

To run the server execute

npm run dev

