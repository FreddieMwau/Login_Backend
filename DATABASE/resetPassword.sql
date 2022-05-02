CREATE PROCEDURE resetNewPassword(@id VARCHAR(50), @password VARCHAR(300))
AS BEGIN
UPDATE Users SET password=@password WHERE id=@id
END