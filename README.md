# Levels-of-Encryption-Utilising-EJS-MongoDB

This project aims to explore various tiers of security measures in a database, which encompass the following levels:

Registration of users with usernames and passwords.
Encryption of the database.
Password hashing.
Password salting and hashing.
Utilization of Passport.js for managing cookies and sessions.
Implementation of OAuth 2.0 in conjunction with Google for enhanced security.


## Level 1 - Registration of users with usernames and passwords

The fundamental principles of user data utilization involve the use of email and password, with both email and password stored in MongoDB. This can be assessed within the app.js file.

## Level 2 - Encryption of the database

The password data is encrypted through mongoose-encryption, with the encryption occurring during the .save() method and decryption during the find() method. A secret key is employed for encrypting and decrypting specific fields within the document, as detailed in the following section. This can be assessed within the level2encryption.js file.
