CREATE PROCEDURE getUserById(@id VARCHAR(50))
AS BEGIN
SELECT id,fullname,email FROM Users WHERE id=@id
END