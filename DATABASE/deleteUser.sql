
CREATE PROCEDURE deleteUser(@id VARCHAR(50))
AS BEGIN
DELETE FROM Users WHERE id=@id
END