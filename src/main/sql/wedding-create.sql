create table userToken (
    userId Varchar(50) not null,
    token Varchar(36) not null,
    Primary Key (userId)
);

create table guests (
    guestId Varchar(36) Not null,
    guestName Varchar(50) Not null,
    menu Varchar(10) not null,
    allergies Varchar(255),
    userId Varchar(50),
    Primary Key (guestId),
    Foreign Key (userId) References userToken(userId)
);

