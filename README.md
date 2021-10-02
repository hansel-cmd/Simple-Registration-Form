# Simple Registration Form

Simple Registration Form addressing at least 3 of the deadly sins.

## Installation
Make sure you have composer and npm installed on your system.

1. Clone the repo
    
   ```bash
   git clone https://github.com/hansel-cmd/Simple-Registration-Form.git
   ```

2. Install npm packages

   ```bash
   npm install
   ```

3. Install dependencies
   ```bash
   composer install
   ```

4. Get latest dependencies
   ```bash
   composer update
   ```

5. Copy paste ```.env.example``` and change to ```.env```

6. Inside ```.env``` file, set the following:

   Note: You may use your dummy email.
   ```
   MAIL_MAILER=smtp
   MAIL_HOST=smtp.googlemail.com
   MAIL_PORT=465
   MAIL_USERNAME=[YOUR_EMAIL_ADDRESS]
   MAIL_PASSWORD="[EMAIL_ADDRESS_PASSWORD]"
   MAIL_ENCRYPTION=ssl
   MAIL_FROM_ADDRESS=[YOUR_EMAIL_ADDRESS]
   MAIL_FROM_NAME=Cesa_Security_Verification
   ```

7. This step is very IMPORTANT. Make sure you follow. 

   7a. Go to [https://myaccount.google.com/security](https://myaccount.google.com/security)

   7b. Turn on ```Less Secure App Access```

   Note: Allowing less secure app access will grant this project access to your email account. This is to let the project know which email account to use when sending an email verification. You can turn this off after you're done with this project.

8. Generate app key
   ```
   php artisan key:generate
   ```

9. Set up your database in the ```.env``` file. You may change the db name to whatever you like. And then, create a database in your phpmyadmin.
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=laravel_vue_registration
   DB_USERNAME=root
   DB_PASSWORD=
   ```

10. Migrate database table
    ```
    php artisan migrate
    ```

11. Seed the database
    ```
    php artisan db:seed
    ```

12. Install passport
    ```
    php artisan passport:install
    ```
    Note: If you ever perform migration rollback or even drop the database tables, you may have to do this step again.

13. Compile vueJS
    ```
    npm run watch
    ```

14. Start the server
    ```
    php artisan serve
    ```

## Addressing Sin #2
   > __This part addresses sin #2. The data stored in the localStorage MUST BE context dependent.__

Here, I will walk you through this project's implementation addressing sin #2.

1. When a user has registered using valid email, an email verification link is sent. This link will give a token to signify that the account has been verified.

2. When a user logs in, 5 things will happen:
 
   - The certain user's credentials will be stored in the ```state management store``` as an object. Access to the current user's information will be done this way.
   - The ```user_id``` of the user will be stored in the localStorage. The id stored is the actual id of the user. Although it may sound straightforward, this move will not allow users to change this information otherwise he will be redirected back to the login page.
   - A ```session_token``` will be returned and is set inside localStorage as an incomplete string. This token is unique for every user. This is used together with the user_id to provide authenticity of the logged in user. Changing the user_id  to, let's say "4", will require the user to know the session_token of the user with id 4. And so, there is no way for someone to impersonate someone else.
   - Another ```token``` will be returned as an object. This is also used to identify authenticity when sending requests via REST API.
   - The user will be redirected to the home page (account).

   ```root > resources > js > services > store > modules > authStore.js```
   ![action_log_in](https://user-images.githubusercontent.com/63908694/135712984-eaef9a15-4738-4972-b756-a471d629361c.png)
    The code snippet above will explain that. 

## Addressing Sin #5
   > __This part addresses sin #5. The code MUST BE modularized and NEVER hard code the queries.__

Here, I will walk you through this project's implementation addressing sin #5.

1. The implementation is separated into parts: ```views, models, controllers, services (types, store modules, api)```
       
    - Views: ```root >  resources > js > components > *```
    - Models: ```root > app > models > * ```
    - Services: ```root > resources > js > services > *```. This is divided into 3 parts.
         - ```types``` => This defines the name and the type of the functions used inside ``` store modules ```
![types](https://user-images.githubusercontent.com/63908694/135717069-004c8da5-9fb4-495f-b1fc-fe2be534fb2f.png)


         - ```api``` => This is where I defined the RESTful API for this project. It also blocks unauthorized users from sending requests to the server. <br />
![api](https://user-images.githubusercontent.com/63908694/135717098-dfa7dfbd-893c-4050-90f6-70ac3a4a61d8.png)

         - ```store modules``` => This is what routes the requests to the controller. It catches error when not authenticated or when either of the ```session_token``` or ``` user_id ``` is not valid.

           code snippet
![store modules](https://user-images.githubusercontent.com/63908694/135717117-9059e9b0-5c3c-43e4-8233-0e252bc63b21.png)

    - Controller: ```root >  app > http > controllers > *``` => this is what fetches the data from the database.
![controller](https://user-images.githubusercontent.com/63908694/135717336-15e3d3e9-cb71-41cc-bad7-87938be853a6.png)

2. When performing queries, Eloquent is used. This abstraction allows users to perform powerful queries without knowing what's under the hood and also prevents SQL injection.

## Addressing Sin #6
> __This part addresses sin #6. Always validate inputs.__

Here, inside ``` root > app > http > controllers > * ```. This is where the fetching of data from the database is done and validation of inputs must also happen on the server side. Never validate user inputs on the client side only.
![validating input](https://user-images.githubusercontent.com/63908694/135718135-a6ccedfc-9ff6-4f4a-bc3d-682b9001a85b.png)

## Addressing Sin #1
> __This part addresses sin #1. Never validate users using hidden inputs.__

Here, I will walk you through this project's implementation addressing sin #1.

1. Usually when we implement an insert operation to the database from our forms, the most common take to know which user performed the operation is by using ```hidden inputs``` and setting the ```user_id``` as its default value. This information will be sent together with other data inputted from our form to the server.

   ``` root > resources > js > components > home > AccountComponent.vue ``` 

   Somewhere inside the ```form tag```, we usually put the hidden input.
![sending a request](https://user-images.githubusercontent.com/63908694/135719094-681a3d3a-0615-44ae-b4a1-45f9c9b3bb54.png)

   But in this implementation, we fetch all the ```user information``` including the ```user_id``` from the ```state management store```. This is done inside the ```computed``` property below. <br/>
![image](https://user-images.githubusercontent.com/63908694/135718853-b81d82a7-2495-48e4-8bd0-d5f3d7c40dc2.png) 

   So with that, there is no way for someone to edit his ```user_id``` when submitting the form unlike when using hidden inputs as it can be edited when inspecting an element in the dev tools. There is also no way for someone to edit the localStorage's ```user_id``` as it is context dependent on the ```session_token``` as explained in the Addressing Sin #2 part.


## Extra
This part is not included. In case you are wondering how you can try to play with the data given in the localStorage and verify that it is indeed context dependent, then this is for you.

Note: You can use any dummy data in the database since we performed db seeding in the installation part. The default password is "password".

1. In my case, the user who is currently logged in has the ```user_id``` of ```6```. 
![image](https://user-images.githubusercontent.com/63908694/135719959-5de24ef4-edc6-4161-8a00-b21caa3334e7.png)

2. If we change this to something else and refresh the page, we will see the log in page. When we change the localStorage and then refresh the page, the behavior is similar to sending a new request to the server to fetch the user information bearing that given id. We can verify this by using postman. 

    2a. Remember that from the previous screenshot, the ```user_id``` is ```6``` and the ```session_token``` is ```qJ7jK8rMpwYEh0UlvigZ```. In this screenshot, we can see that we indeed have the user's information.
![image](https://user-images.githubusercontent.com/63908694/135720085-4a0db5b5-d953-4ffe-b782-6a732c89a27a.png)

    2b. But changing one of the information from the localStorage will yield null or yield an html template indicating that the request was not able to continue because an error occurred. <br />
![image](https://user-images.githubusercontent.com/63908694/135720367-a1367906-99a9-4f1e-89aa-6099be5e92fb.png)
![image](https://user-images.githubusercontent.com/63908694/135720454-afdeaf47-c61a-4e36-b373-749980735e39.png)

3. The same is true when we remove the ```token``` in the localStorage and perform refresh.

