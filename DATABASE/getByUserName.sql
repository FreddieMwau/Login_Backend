CREATE PROCEDURE getByUserName(@email VARCHAR(150))
AS BEGIN
SELECT id,fullname,email FROM Users WHERE email=@email
END