CREATE PROCEDURE updateUser(@id VARCHAR(50), @fullname VARCHAR(50), @email VARCHAR(150))
AS BEGIN
UPDATE Users SET fullname=@fullname, email=@email WHERE id=@id
END