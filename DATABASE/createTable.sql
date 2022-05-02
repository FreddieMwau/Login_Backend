CREATE TABLE Users
(
    id VARCHAR(50),
    fullname VARCHAR(50),
    email VARCHAR(150) UNIQUE,
    password VARCHAR(300)
)