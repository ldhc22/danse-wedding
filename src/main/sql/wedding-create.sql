create table userToken (
    user_id Varchar(50) not null,
    token Varchar(36) not null,
    Primary Key (user_id)
);

create table guests (
    guest_id Varchar(36) Not null,
    guest_name Varchar(50) Not null,
    menu Varchar(10) not null,
    allergies Varchar(255),
    user_id Varchar(50),
    Primary Key (guest_id),
    Foreign Key (user_id) References userToken(user_id)
);

