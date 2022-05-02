CREATE PROCEDURE getByUserName(@email VARCHAR(150))
AS BEGIN
SELECT id,fullname,email,password FROM Users WHERE email=@email
END