# Art Collaboration Platform (CSC301 Project)

This project uses the [webpack-express-boilerplate](https://github.com/christianalfoni/webpack-express-boilerplate) as part of the starter code.

To run the server on localhost:8888, follow the steps below:

# (1) If you haven't install [NodeJS](https://nodejs.org/en/), install it.

# (2) cd to src 

```shell
$cd src
```

# (2.5) If this is the first time you run this server, please install all the server dependencies.

```shell
$npm install
```

# (3) If you haven't configure or install the database [sqlite3](https://www.sqlite.org/download.html), please do so. After that, setup the schema.

```shell
$sqlite3 db.sqlite
sqlite> .read schema.sql

```

Note: you can always reset the database by typing " sqlite> .read schema.sql " in sqlite.

To verify you did the righting, run the following command and expect these output:

```shell
sqlite> .tables
Administrator  Comment        Product
Archive        Contribution   User
```

Close the DBMS. Make sure db.sqlite is stored in your file system.

```shell
sqlite> .quit
```

# (4) Run the database in src. You don't have to run the database to set up the server, but some functionalities may not be supported without db.

```shell
$ cd src
$ sqlite3 db.sqlite
```

# (5) Open another terminal and run the server. 

```shell
$ cd src
$ npm start
```

Wait until "webpack: Compiled successfully." pops up.

Then, open your browser, type "localhost:8888" and hit enter.

# (6) To shut down the server, double-hit ctrl-c. To shut down the db safely, run .quit so the db file "db.sqlite" will be consistent each time you run the server.

