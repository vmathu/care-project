# CaRe Back-end

Technology used:
- [Express](https://expressjs.com/) (Framework building Nodejs).
- [Mongoose](https://mongoosejs.com/) (Object Data Model - ODM for MongoDB and Node.js)

Architecture used:
- [Monolithic] (https://www.atlassian.com/microservices/microservices-architecture/microservices-vs-monolith) (software architecture pattern)

## Installation

### Prerequisites

- Make sure to have `yarn` installed.
- Nếu chưa cài đặt yarn, chạy lệnh `npm install -g yarn`.

### Steps

1. Clone repo.

2. Install required packages

   - Run `yarn --frozen-lockfile`. Lưu ý kèm theo flag để tránh việc cập nhật các package trong file `yarn.lock`.

   - Khi cài package, chạy `yarn add <package-name>`.

3. Add connection string
   - Change the value of `CONNECTION_STRING` in file `.env` by yours connection string to cluster. (Instruction: https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/)

4. Run localhost:

   - Run `yarn server`.

   - Navigate to `localhost:3000`.

5. Testing service
    - Using `postman` for testing the API service

6. Back up and restore database
    - Back Up: use mongodump to back up all collections of database into folder `dbbackup`: (Instruction: https://www.mongodb.com/docs/database-tools/mongodump/)
    - Restore: use mongorestore to retore all collections from `dbbackup` into your database: (Instruction: https://www.mongodb.com/docs/database-tools/mongorestore/)

## Folder Structure

```shell
src
│   ├── api
│   │   ├── index.js                                            #export all api of services
│   │   └── <CollectionName>Routes.js                           #handle the request and respone of each service
│   ├── config
│   │   └── index.js                                            #export value of PORT and connection string
│   ├── database
│   │   ├── Connection.js                                       #create connection to database
│   │   ├── index.js                                            #export database connection and collections' repositories
│   │   ├── models
│   │   │   ├── index.js                                        #export models of all collections
│   │   │   └── <CollectionName>.js                             #define the schema for collection 
│   │   └── repositories
│   │       └── <CollectionNAme>Repository.js                   #define methods of repository
│   ├── ExpressApp.js                                           #set up Express applicatiopn with necessary middleware (not defined yet) and routes(api)
│   ├── index.js                                                #start the server
│   ├── service
│   │   └── <CollectionName>Service.js                          #define the service of collection
│   └── utils                                                   # Utility functions
│       ├── <FunctionName>.js           
│       └── index.js                                            #export defintion of utility functions

```