Author: The Vu Nguyen Tran (Vincent)

my git: https://github.com/ngtrthvu3007

You can contact me via email nguyentranthevu@gmail.com

This repo is a simple express boilerplate has a built-in authorization feature. If you're new to express or don't know where to start, this repo is for you

Flow by step:

1. A request is sent to server, we receive and check the request path.

2. Go to middlewares to define parameters, requires,... If the request is invalid, return an error and stop the request else move to controller

3. In controller, we get params from request and use services methods to interact with database by params

4. Service return result for controller then controller return result for client

About Error Handling, I have defined with defaultErrorHandler()

Note \*: I use Token-based authentication by jsonwebtoken. But there is a little difference, Instead of returning both access token and refresh token then saving the refresh token to the database, I will only return 2 tokens without saving refresh token to the database.

You can create an additional refreshToken model and store refresh tokens if you want

Note \*\*: The algorithm to encrypt the password is made by me. If you want to make it simpler, you can use libraries like bcrypt,...

Good luck
