## How to build CommuniSync ?

## 1 Create a new project
- yarn create react-app CommuniSync --template typescript
- yarn add @mui/material @emotion/react @emotion/styled @fontsource/roboto @mui/icons-material

## 2 Implement Dark Theme using MUI and some base styling
- createTheme API and ThemeProvider for dark theme
- CssBaseline for base styling

## 3 Login Form

## 4 Add routing with react router dom
- yarn add react-router-dom localforage match-sorter sort-by
- packages: react-router-dom, localforage, match-sorter, sort-by
- react-router-dom is used for routing
- localforage is used for storing data in local storage
- match-sorter is used for sorting and filtering data
- sort-by is used for sorting data

## 5 NestJS BE setup
- install nestjs globally: npm i -g @nestjs/cli
- create a new nestjs project: nest new chime-in-be
- yarn run start:dev to start the server

## 6 Setup MongoDB
- yarn add @nestjs/config @nestjs/mongoose mongoose
- @nestjs/config: Configuration module for Nest
- @nestjs/mongoose: Mongoose module for Nest
- mongoose: MongoDB object modeling tool
- yarn add joi for validation
- will validate env variables as well
- mongodb installation: https://www.mongodb.com/docs/manual/installation/
- install mongo for mac: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
- create a folder data/db in ~ and from ~ run: mongod --dbpath=data/db
- run be: yarn run start:dev and check if the connection is successful
- mongod should log "msg":"Connection accepted"
- be should log "MongooseCoreModule dependencies initialized"
- if already running please kill the process.
- ps aux | grep mongod
- kill <processid>
## 7 Setup graphql and apollo, users resources
yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql
graphql playground: http://localhost:3000/graphql
nest g resource users
8 Abstract Schema and Abstract Repository
abstract schema for common fields
abstract repository for common methods
9 User CRUD, User Entity and User Repository, Refactor Abstract entity, Abstract repository
10 User CRUD continued
yarn add bcrypt and yarn add -D @types/bcrypt
sample graphql queries and mutations:
createUser:
mutation {
  createUser(createUserInput:{
    email:"user1@kirandash.com",
    password: "password123"
  }) {
    _id
    email
  }
}
11 MongoDB compass
https://www.mongodb.com/try/download/compass
12 Add logging with pino logger
https://github.com/pinojs/pino
Docs: https://www.npmjs.com/package/nestjs-pino
yarn add nestjs-pino pino-http pino-pretty
13 Modify logging config for production
14 DB Migrations - up and down
we will use https://www.npmjs.com/package/migrate-mongo
yarn add migrate-mongo
type: yarn add -D @types/migrate-mongo
yarn add mongodb: to get access to the types
create migration for user email index and make it unique
we can use this for validation to make sure we don't have duplicate emails
in mongo client we should be able to see email_1 index
and in changelog we should see the migration file details
15 UI - Apollo Client Setup
apollo client is a graphql client that helps us to interact with the graphql server from the client side i.e. our react app
it will help us manage data both local and remote
it will help us fetch, cache and modify data
we need to write query and mutation on UI using graphql with apollo client
yarn add @apollo/client graphql from ui folder
16 Create User from UI
install apollo client devtools extension (ext id: apollographql.vscode-apollo)
to fix CORS issue:
use proxy in package.json: "proxy": "http://localhost:3001". this will proxy all requests to 3000
17 Backend Authentication with Passport
yarn addnstall --save @nestjs/passport passport passport-local
yarn addnstall --save-dev @types/passport-local
https://docs.nestjs.com/recipes/passport
https://www.passportjs.org/packages/
we are using passport-local strategy for now
it will accept a username and password and authenticate the user and return a jwt token
generate auth module: nest g module auth
generate auth service: nest g service auth
18 Local Auth guard using Passport Local Strategy and custom user decorator
Expose local strategy as a guard
https://docs.nestjs.com/guards#authorization-guard
nest g controller auth
read more about custom decorators: https://docs.nestjs.com/graphql/other-features#custom-decorators
19 JWT functionality
https://docs.nestjs.com/recipes/passport#jwt-functionality
yarn addnstall --save @nestjs/jwt passport-jwt
yarn addnstall --save-dev @types/passport-jwt
generate secret key: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
you can decode jwt token at https://jwt.io/
send jwt token back in reponse
20 JWT Strategy and apply the jwt auth guards
use jwt strategy to authenticate jwt and apply to graphql, REST endpoints
yarn add cookie-parser: to parse cookies from request and attach to response
yarn add -D @types/cookie-parser
https://www.npmjs.com/package/cookie-parser
use cookie parser to parse cookies from request and attach to response
use jwt strategy to authenticate jwt and apply to graphql, REST endpoints
21 Login from UI with useLogin hook
create useLogin.ts hook
22 Error handling for sign-in and sign-up
23 Home page and AuthGuard
24 Redirect Implementation - for unauthenticated users
if user is not signed in, redirect to sign in page
let's do this by checking the status code, if it is 401, redirect to sign in page
also if jwt token is expired, backend will return 401
TODO 🚨: Currently unauthenticated errors from apollo are uncaught and we need to fix this. This happens during logout
24 Redirect onSuccesful login
after successful login, redirect to home page
25 Login after signup programmatically
26 Header - AppBar
https://mui.com/material-ui/react-app-bar/
27 Logout - BE and FE
28 Hide user settings icon from header if not logged in
29 More Error handling on UI with Alert and Snackbar
TODO: 🚨 Navigation not working on clicking the links
30 Chat List UI using MUI List
https://mui.com/material-ui/react-list/#align-list-items
31 New Chat Modal
32 BE for Create Chat
create chat resource
nest g resource chats
for validation: https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe
yarn add --save class-validator class-transformer
33 GraphQL Type Generation
install on ui code base
https://the-guild.dev/graphql/codegen/docs/getting-started/installation
npm i -D @graphql-codegen/cli @parcel/watcher
graphql codegen will generate types for us
parcel watcher will watch for changes and regenerate types
npx graphql-code-generator init
run watch script parallely using https://www.npmjs.com/package/concurrently
npm i -D concurrently
34 Create Chat from UI
35 BE for Chat List
we created a findAll method in chat service
on FE we created useFindChats to call the graphql query
we also created a chat.fragment.ts to define the fields we need from the chat object
36 Update chat list query on chat creation
after chat creation, update the cache with the new chat (useCreateChat hook)
also make sure to export the chat fragment from chat.fragment.ts
add error handling
37 Chat details page - Backend - findOne and Frontend
38 Create Message backend and frontend
each chat will have multiple messages
one to many relationship
nest g resource chats/messages
this will generate all the stub files
https://docs.nestjs.com/fundamentals/circular-dependency
39 Get Messages for a chat room and update cache after message creation
to update the cache for particular chatId, use readQuery and writeQuery
40 Some UI improvements
TODO: 🚨 Check why content IsNotEmpty validaiton not working for createMessage
41 Websockets using GraphQL Subscriptions 🌟 - Config
To receive real-time updates from the server, we will use GraphQL Subscriptions.
why websockets?
we can use polling but it is not efficient
websockets are more efficient
on BE:
yarn add graphql-ws graphql-subscriptions
https://github.com/enisdenjo/graphql-ws
this will help us to create a websocket server using graphql
https://www.npmjs.com/package/graphql-subscriptions
this will help us establish pub sub functionality
Implement pub sub functionality
implement locally at first and make it persistent later
42 Message Created Subscription - BE and FE
install on FE: yarn add graphql-ws
REACT_APP_WS_URL=localhost:3001 because we won't get CORS issues for WS.
use split in apollo client to separate http and ws
43 Authenticated Websockets and passing correct context
add jwt token to websocket connection in app.module.ts
44 Update cache after message creation using subscription
so that it is real-time visible on UI
44 Improve Messages aggregation on chat entity, user aggregation on message entity, add support for username, UI changes
create chat.document.ts file to store the chat mongoose schema
use chat.entity.ts file for graphql schema
TODO: Fix the sidebar cache issue
45 Cache update for latest message
46 Handle Multiple chat room subscription
47 Add Pagination for Chats Backend
nest g controller chats
create chats.controller to add chats/counts GET endpoint to count the number of chats
48 Frontend Pagination
infinite scroll libraries
https://www.npmjs.com/package/react-infinite-scroll-hook (1KB)
https://www.npmjs.com/package/react-infinite-scroller (2KB) - we are using this to explore a new library
npm i -D @types/react-infinite-scroller
useCountChats hook and update useFindChats hook to accept skip and limit
customize apollo-client cache to merge the new data with the old data
49 Add Pagination for Messages Backend and FE
nest g controller chats/messages
50 Date formatting and latest message style change
51 AWS S3 setup
https://aws.amazon.com/
aws s3 free tier: https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all
Steps:
setup aws account
create an s3 bucket (in search bar type s3)
create a user with s3 access (in search bar type iam) - click users - create user
assign s3 full access policy to the user
create security credentials for the user
52 Upload Image to S3 using Backend
https://docs.nestjs.com/techniques/file-upload
yarn add -D @types/multer,
nest g module common/s3
nest g service common/s3
yarn add @aws-sdk/client-s3
https://www.npmjs.com/package/@aws-sdk/client-s3
53 Upload Image to S3 using Frontend
54 Set User Profile Image on Backend and display on UI
to fix the s3 url access issue, add a new policy to the bucket
go to bucket -> permissions -> bucket policy -> edit policy
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Statement1",
      "Principal": "*",
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": [
        "arn:aws:s3:::chime-in-users/*",
        "arn:aws:s3:::chime-in-users"
      ]
    }
  ]
}
55 AWS Amplify setup for PROD Deployment - Frontend
56 Elastic Beanstalk setup for PROD Deployment - Backend
create an IAM role with policies
AWSElasticBeanstalkMulticontainerDocker
AWSElasticBeanstalkWebTier
AWSElasticBeanstalkWorkerTier
choose t2.micro instance for free tier: Instance types
57 CI/CD pipeline with CodePipeline
This will help us to automate the deployment process

ProcFile is used to specify the commands to run on the server

make sure symlinks=false is set in .npmrc because symlinks for yarn are not supported on elastic beanstalk

58 MongoDB Atlas setup
https://www.mongodb.com/cloud/atlas/register