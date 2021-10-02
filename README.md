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

9. Set up your database in the ```.env``` file. You may change the db name to whatever you like.
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

## Walkthrough

Here, I will walk you through this project.

1. When a user has registered using valid email, an email verification link is sent. This link will give a token to signify that the account has been verified.

2. When a user logs in, 3 things will happen:
   - Inside 
   ![wtf](https://drive.google.com/file/d/1ArpzVfem5jHRQGNkqMh8DT-qS7k0ubeF/view?usp=sharing)





```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
