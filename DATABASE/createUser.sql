CREATE PROCEDURE createUser(@id VARCHAR(50), @fullname VARCHAR(50), @email VARCHAR(150) , @password VARCHAR(300))
AS BEGIN
INSERT INTO Users(id, fullname, email, password)
VALUES(@id, @fullname,@email, @password)
END