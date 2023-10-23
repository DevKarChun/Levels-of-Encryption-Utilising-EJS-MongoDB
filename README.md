# Levels-of-Encryption-Utilising-EJS-MongoDB

This project aims to explore various tiers of security measures in a database, which encompass the following levels:

- Registration of users with usernames and passwords.
- Encryption of the database.
- MD5 Password hashing.
- Bcrypt password salting and hashing.
- Utilization of Passport.js for managing cookies and sessions.
- Implementation of OAuth 2.0 in conjunction with Google for enhanced security.


## Level 1 - Registration of users with usernames and passwords

The fundamental principles of user data utilization involve the use of email and password, with both email and password stored in MongoDB. This can be assessed within the app.js file.

<img src="https://github.com/DevKarChun/Levels-of-Encryption-Utilising-EJS-MongoDB/blob/main/images/lvl1%20mongo.png" width="1000">

## Level 2 - Encryption of the database

The password data is encrypted through mongoose-encryption, with the encryption occurring during the .save() method and decryption during the find() method. A secret key is employed for encrypting and decrypting specific fields within the document, as detailed in the following section. This can be assessed within the level2encryption.js file.

<img src="https://github.com/DevKarChun/Levels-of-Encryption-Utilising-EJS-MongoDB/blob/main/images/lvl2%20mongo.png" width="1000">

## Level 3 - MD5 Password hashing

In both the registration and login processes, the password is transformed into a hashed password. However, each password can be identical, just as if a password were merely a change of language. This can be examined in the level3hashing.js file.

<img src="https://github.com/DevKarChun/Levels-of-Encryption-Utilising-EJS-MongoDB/blob/main/images/lvl3%20mongo.png" width="1000">

## Level 4 - Bcrypt password salting and hashing

Substituting MD5 with Bcrypt for updating the current password fields before storing them in the database. When logging in, the password is compared using the Bcrypt "compare" function to verify if the data input via body parser matches the hashed password stored in the database. This can be examined in the level4bcrypthashing.js file.

<img src="https://github.com/DevKarChun/Levels-of-Encryption-Utilising-EJS-MongoDB/blob/main/images/lvl4%20mongo.png" width="1000">

## Level 5 - Utilisation of Passport.js and managing cookies and sessions

Utilizing Passport.js for the serialization and deserialization of user registration and login authentication, along with configuring session expiration through Passport when the session is ended. The logout route is also integrated in this section, allowing users to employ the logout function as a part of the authentication process. If a user is authenticated, they can automatically access http://localhost:3000/secrets without the necessity to go through the login process. However, if they are not authenticated, they will be redirected to their current page, such as the register or login page. Additionally, when the server restarts, the cookies are cleared, ensuring that authenticated users do not need to re-login every time, even though they are authenticated. This can be examined in the level5passportwithcookiesandsessions.js file.

<img src="https://github.com/DevKarChun/Levels-of-Encryption-Utilising-EJS-MongoDB/blob/main/images/lvl5%20mongo.png" width="1000">

## Level 6 - Implementation of OAuth 2.0 in conjunction with Google for enhanced security

Employing Passport.js with Google OAuth 2.0, a new application is established via the Google Developer Console. By integrating the Google strategy and inputting the clientID and clientSecret generated in Google Developer Tools, users can manage authentication. Furthermore, following the implementation of Google Authentication, Facebook OAuth authentication has also been incorporated. This can be examined in the level6OauthGoogle.js file.

<img src="https://github.com/DevKarChun/Levels-of-Encryption-Utilising-EJS-MongoDB/blob/main/images/lvl6%20mongo.png" width="1000">

## Complete Web Application

The fully implemented authentication and user-updated secrets can now be assessed in the "complete.js" file. When a user registers an account and submits a new secret, it can now be assessed by all users.

<img src="https://github.com/DevKarChun/Levels-of-Encryption-Utilising-EJS-MongoDB/blob/main/images/complete1.png" width="1000">
<img src="https://github.com/DevKarChun/Levels-of-Encryption-Utilising-EJS-MongoDB/blob/main/images/complete2.png" width="1000">
<img src="https://github.com/DevKarChun/Levels-of-Encryption-Utilising-EJS-MongoDB/blob/main/images/complete3.png" width="1000">
<img src="https://github.com/DevKarChun/Levels-of-Encryption-Utilising-EJS-MongoDB/blob/main/images/complete4.png" width="1000">
<img src="https://github.com/DevKarChun/Levels-of-Encryption-Utilising-EJS-MongoDB/blob/main/images/complete5.png" width="1000">
<img src="https://github.com/DevKarChun/Levels-of-Encryption-Utilising-EJS-MongoDB/blob/main/images/complete6.png" width="1000">
<img src="https://github.com/DevKarChun/Levels-of-Encryption-Utilising-EJS-MongoDB/blob/main/images/complete7.png" width="1000">
