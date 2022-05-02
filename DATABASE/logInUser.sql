CREATE PROCEDURE logInUser(@email VARCHAR (150), @password VARCHAR (300))
AS BEGIN
SELECT fullname,email,password FROM Users
WHERE email=@email AND password=@password
END