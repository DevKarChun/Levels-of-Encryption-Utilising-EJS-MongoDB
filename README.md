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

## Level 2 - Encryption of the database

The password data is encrypted through mongoose-encryption, with the encryption occurring during the .save() method and decryption during the find() method. A secret key is employed for encrypting and decrypting specific fields within the document, as detailed in the following section. This can be assessed within the level2encryption.js file.

## Level 3 - MD5 Password hashing

In both the registration and login processes, the password is transformed into a hashed password. However, each password can be identical, just as if a password were merely a change of language. This can be examined in the level3hashing.js file.

## Level 4 - Bcrypt password salting and hashing

Substituting MD5 with Bcrypt for updating the current password fields before storing them in the database. When logging in, the password is compared using the Bcrypt "compare" function to verify if the data input via body parser matches the hashed password stored in the database.

## Level 5 - Utilization of Passport.js for managing cookies and sessions

To be Continued

## Level 6 - Implementation of OAuth 2.0 in conjunction with Google for enhanced security

To be Continued
