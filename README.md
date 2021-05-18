
### Get Started
Express is a popular back end javascript framework. Here I try scratching to build a simple framework from express base on MVC.

If you are php developer as CI/Laravel, it will look little bit the same, because they are I am inspired by.

### Inspired By
- .NET entity framework (EDMX) Base on ORM for database manipulation
- Codeigniter Controller and Routing

### Tools
- Knex query builder -> To create ORM table mapping
- Express fileupload -> To create UploadedFile class
- Express session -> storing session in database, base on knex instance 

### What's Inside 
- **Config** 
     - Database **src/App/Config/Database.js**, it regular config of knex connection **http://knexjs.org/**

               const database = {
                    mysql : {
                         client: process.env.DB_CLIENT,
                         connection: {
                              host: process.env.DB_HOST,
                              user: process.env.DB_USER,
                              password: process.env.DB_PASSWORD,
                              database: process.env.DB_NAME
                         },
                         pool: { min: 0, max: 7 },
                         acquireConnectionTimeout: 0,
                         migrations: {
                              tableName: 'migrations'
                         }
                    }
               }
     - Kernel
          Contains global middleware / api and web middleware, if you have created a middleware, you can register your middleware to Kernel
     - View
          Default template for this framework is **pug** template **https://pugjs.org/**. You can modify the template you want to use here
- **Routing**
     placed in **src/App/Routes** has two Functions
     - Web
          it will return express router https://expressjs.com/en/guide/routing.html
          eg : **host/yourRoute**

               let routers = new Routers();

               // "/" is a routename
               // [] is middleware
               // Controller is a class Cotroller
               // "index" is a controller function

               // GET method
               routers.get("/". [ AnyMiddleware ], Controller, "index");

               // POST method
               routers.post(....

               // PUT method
               routers.put(....

               // PUT method
               routers.delete(....

               // Grouping
               routers.group(route, [], routers => {
                    routers.get(....
                    routers.post(....
                    routers.group(....
               })

     - Api
          Stay the same with **WEB** route but will has segment of **"api"**, eg : **host/api/yourRoute**
- **Controller**
     has 3 types of return 
          - Redirect
          - View
          - ResponseData  

          class UserController extends Controller {
               ...constructor and super;

               // could be async / sync method
               // object params can be blank as index()
               async index({request, session}){
                    let user = await M_users.findAll();
                    
                    // return this
                    return Redirect.to(route);

                    // ot this
                    return View.make(path of view, {...data});
                    return View.html("html string", {...data});

                    // or this
                    return ResponseData.status(200).json({...data})
               }
          }
- **Model** 
     ORM base built from knex query builder.
     Just extends your model to core model **Model**.
     Once it extends to core model, each model you create will have CRUD function. See how to use it in **Controller** part
     most of static model functin returns as **Promise**.

          class M_users extends Model {

               Id = null;
               Username = null;
               ...

               constructor(){
                    super("tableName", "primaryKey")
               }

          }
     The functions are
     - **M_users.find(1)** will return instance of **M_users** which has primary key value = 1.
     -  **M_users.findAll(params = {})** will return array of instance **M_users**. See more about parameter in **knexjs**.

               const params = {
                    where : {
                         Groupuser : 1
                    }
               };
               let listUser = await M_users.findAll(params);
          

          
     - **M_user.collect((params = {})**  will return instance of CollectionModel

               let listUser = await M_users.collect(params);
               let filtered = listUser.where(x => x.Username == 'MyName');
               let items = filtered.getItems();
         
     - **M_user.datatables((params = {})**  will return array of datatables server

     - **user.save(trx = false)**
          will save or update the data to database base on model instance
          if the **primary key** of instance is null it will insert to database otherwise will update the existing data by instance;

               let user = new M_users();
               user.Username = "new name";
               await user.save(); // will insert

               let user = M_user.find(1);
               let user.Username = "update user";
               awair user.save(); // will update user with primary key 1

     - **user.delete(trx = false)**

                let user = M_user.find(1);
                user.delete(); // will delete data from table with primary key = 1


     You can find more function of model by exploring the code in Core **src/Core/Model/Model.js**
- **View** 
     See Controller segment
- **Request**
     You will have Request insatnce outside controller by calling the instance. it's **express' request**
          
          let request = Request.getInstance();

- **Response**
     You will have Response insatnce outside controller by calling the instance. it's **express' response**
          
          let request = Response.getInstance();
- **DbTrans**

          let trx = DbTrans.beginTransaction();

          let user = new M_users();
          user.Username = "new name";
          await user.save(trx); 

          trx.commit(); // commit the data
          //or
          trx.rollback(); // rollback data from saving

#### CLI
first you should type 'npm i -g .', to install current command line for this app, (i havent created module to npm)

     nayo --help
- **Generate Model**

          nayo make:model -n <tablename>

- **Generate Controller**

          nayo make:controller -n <controllername> -p <pathToControllerDirectory>
#### What's Missing
- Much
- You tell me

### Install
     - clone and type 'npm i'
     - create database and set to .env file DB_NAME, set your credential of your database
     - type 'knex migration:latest'
     - type 'knex seed:run'

### Run
     nodemon start src/index.js
