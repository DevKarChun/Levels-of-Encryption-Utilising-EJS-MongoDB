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

The password data is encrypted using mongoose-encryption. The data will be encrypted during the .save() method and decrypted using the find() method. This can be examined in the level2encryption.js file.
