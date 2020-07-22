-- Indexes for primary keys have been explicitly created.

DROP TABLE AccountItem;
DROP TABLE Account;
DROP TABLE RoomService;
DROP TABLE RoomReservation;
DROP TABLE Room;
DROP TABLE RoomTypeReservation;
DROP TABLE RoomType;
DROP TABLE GuestReservation;
DROP TABLE Reservation;
DROP TABLE Service;
DROP TABLE User;
DROP TABLE Product;
DROP TABLE Hotel;
DROP TABLE Guest;


CREATE TABLE Guest (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    surname VARCHAR(65) NOT NULL,
    address VARCHAR(75) NOT NULL,
    dni VARCHAR(10) NOT NULL,
    CONSTRAINT GuestPK PRIMARY KEY (id),
    CONSTRAINT GuestDniUniqueKey UNIQUE (dni)
) ENGINE = InnoDB;

CREATE INDEX GuestIndexByName ON Guest (name);

CREATE TABLE Hotel (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    address VARCHAR(75) NOT NULL,
    manager VARCHAR(30) NOT NULL,
    CONSTRAINT HotelPK PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE INDEX HotelIndexByName ON Hotel (name);

CREATE TABLE Product (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(75) NOT NULL,
    price DECIMAL(11,2) NOT NULL,
    CONSTRAINT ProductPK PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE INDEX ProductIndexByName ON Product (name);

CREATE TABLE User (
    id BIGINT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    password VARCHAR(60) NOT NULL, 
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL, 
    email VARCHAR(60) NOT NULL,
    role TINYINT NOT NULL,
    address VARCHAR(250),
    CONSTRAINT UserPK PRIMARY KEY (id),
    CONSTRAINT UserNameUniqueKey UNIQUE (userName)
) ENGINE = InnoDB;

CREATE INDEX UserIndexByUserName ON User (userName);

CREATE TABLE Service (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(75) NOT NULL,
    price DECIMAL(11,2) NOT NULL,
    hotelId BIGINT NOT NULL,
    CONSTRAINT ServicePK PRIMARY KEY (id),
    CONSTRAINT ServiceHotelFK FOREIGN KEY (hotelId)
        REFERENCES Hotel (id)
) ENGINE = InnoDB;

CREATE INDEX ServiceIndexByName ON Service (name);

CREATE TABLE Reservation(
    id BIGINT NOT NULL AUTO_INCREMENT,
    userId BIGINT,
    inbound DATETIME NOT NULL,
    outbound DATETIME NOT NULL,
    CONSTRAINT ReservationPK PRIMARY KEY (id),
    CONSTRAINT ReservationUserFK FOREIGN KEY (userId)
        REFERENCES User (id)
) ENGINE = InnoDB;

CREATE TABLE GuestReservation(
    id BIGINT NOT NULL AUTO_INCREMENT,
    reservationId BIGINT NOT NULL,
    guestId BIGINT NOT NULL,
    CONSTRAINT GuestReservationPK PRIMARY KEY (id),
    CONSTRAINT GuestReservationFK FOREIGN KEY (reservationId)
        REFERENCES Reservation (id),
    CONSTRAINT GuestReservationGuestFK FOREIGN KEY (guestId)
        REFERENCES Guest (id)
) ENGINE = InnoDB;

CREATE TABLE RoomType (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    CONSTRAINT RoomTypePK PRIMARY KEY (id),
    CONSTRAINT RoomTypeNameUnique UNIQUE (name)
) ENGINE = InnoDB;

CREATE TABLE RoomTypeReservation (
    id BIGINT NOT NULL AUTO_INCREMENT,
    typeId BIGINT NOT NULL,
    reservationId BIGINT NOT NULL,
    hotelId BIGINT NOT NULL,
    rooms SMALLINT NOT NULL,
    CONSTRAINT RoomTypeReservationPK PRIMARY KEY (id),
    CONSTRAINT RoomTypeReservationTypeFK FOREIGN KEY (typeId)
        REFERENCES RoomType (id),
    CONSTRAINT RoomTypeReservationReservationFK FOREIGN KEY (reservationId)
        REFERENCES Reservation (id),
    CONSTRAINT RoomTypeReservationHotelFK FOREIGN KEY (hotelId)
    	REFERENCES Hotel(id)
) ENGINE = InnoDB;

CREATE TABLE Room(
    id BIGINT NOT NULL AUTO_INCREMENT,
    number BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL,
    typeId BIGINT NOT NULL,
    hotelId BIGINT NOT NULL,
    CONSTRAINT RoomPK PRIMARY KEY (id),
    CONSTRAINT RoomHotelFK FOREIGN KEY (hotelId)
        REFERENCES Hotel (id),
    CONSTRAINT RoomTypeFK FOREIGN KEY (typeId)
        REFERENCES RoomType (id)
) ENGINE = InnoDB;

CREATE TABLE RoomReservation (
    id BIGINT NOT NULL AUTO_INCREMENT,
    roomId BIGINT NOT NULL,
    reservationId BIGINT NOT NULL,
    begin DATETIME NOT NULL,
    end DATETIME NOT NULL,
    CONSTRAINT RoomReservationPK PRIMARY KEY (id),
    CONSTRAINT RoomReservationRoomFK FOREIGN KEY (roomId)
        REFERENCES Room (id),
    CONSTRAINT RoomReservationReservationFK FOREIGN KEY (reservationId)
        REFERENCES Reservation (id)
) ENGINE = InnoDB;

CREATE TABLE RoomService (
    id BIGINT NOT NULL AUTO_INCREMENT,
    date  DATETIME NOT NULL,
    status VARCHAR(20) NOT NULL,
    userId BIGINT NOT NULL,
    roomId BIGINT NOT NULL,
    CONSTRAINT RoomServicePK PRIMARY KEY (id),
    CONSTRAINT RoomServiceUserFK FOREIGN KEY (userId)
        REFERENCES User (id),
    CONSTRAINT RoomServiceRoomIdFK FOREIGN KEY (roomId)
        REFERENCES Room (id)
) ENGINE = InnoDB;

CREATE TABLE Account (
    id BIGINT NOT NULL AUTO_INCREMENT,
    reservationId BIGINT NOT NULL,
    inbound DATETIME NOT NULL,
    outbound DATETIME NOT NULL,
    CONSTRAINT AccountPK PRIMARY KEY (id),
    CONSTRAINT AccountReservationFK FOREIGN KEY (reservationId)
        REFERENCES Reservation (id)
) ENGINE = InnoDB;


CREATE TABLE AccountItem (
    id BIGINT NOT NULL AUTO_INCREMENT,
    accountId BIGINT NOT NULL,
    quantity SMALLINT NOT NULL,
    itemPrice DECIMAL(11,2),
    productId BIGINT NOT NULL,
    CONSTRAINT AccountITemPK PRIMARY KEY (id),
    CONSTRAINT AccountItemAccountFK FOREIGN KEY (accountId)
        REFERENCES Account (id),
    CONSTRAINT AccountItemProductFK FOREIGN KEY (productId)
        REFERENCES Product (id)
) ENGINE = InnoDB;
