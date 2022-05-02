
CREATE PROCEDURE getUser
AS BEGIN
SELECT id,fullname,email FROM Users
END