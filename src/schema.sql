DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Administrator;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Contribution;
DROP TABLE IF EXISTS Archive;
DROP TABLE IF EXISTS Comment;

-- a user registerd at the platform
CREATE TABLE User (
	uID varchar(20) NOT NULL,
	username varchar(10) NOT NULL UNIQUE,
	name varchar(20) NOT NULL,
	password varchar(13) NOT NULL,
	status varchar(100) NOT NULL,
	question varchar(50) NOT NULL,			-- the secuirty question
	answer varchar(40) NOT NULL,			--  answer to the question
	--Personal statements
	--Education
	PRIMARY KEY(uID)
);

-- admin of the platform, have more right than normal user
CREATE TABLE Administrator (
	aID varchar(20) NOT NULL,
	username varchar(10) NOT NULL UNIQUE,
	name varchar(15) NOT NULL,
	password varchar(13) NOT NULL,
	PRIMARY KEY(aID)
);

-- a product is a picture on the platform
-- parent can be null
CREATE TABLE Product (
	pID varchar(20) NOT NULL,
	name varchar(200),
	root varchar(20) NOT NULL,
	parent varchar(20) NOT NULL,
	dateIssued date,
	imageURL varchar(200),
	admin INTEGER,
	isProcessed INTEGER, 				-- stores 1 or nothing, 1 means this product have been processed by assigned admin
	vaild INTEGER,						-- stores 1 or nothing, 1 means this product have been approved by assigned admin
	artist varchar(30),
	description varchar(300),
	PRIMARY KEY(pID),
	FOREIGN KEY(root) REFERENCES Product(pID),
	FOREIGN KEY(parent) REFERENCES Product(pID),
	FOREIGN KEY(admin) REFERENCES Administrator(aID)
);

-- the user with uID contributed to the product with pID
-- the contribution amount shows how much the user had contributed
CREATE TABLE Contribution (
	pID varchar(20) NOT NULL,
	uID INTEGER NOT NULL,
	amount INTEGER,
	PRIMARY KEY(pID, uID),
	FOREIGN KEY(pID) REFERENCES Product(pID),
	FOREIGN KEY(uID) REFERENCES User(uID)
);

-- the time where the product was saved
CREATE TABLE Archive (
	pID varchar(20) NOT NULL,
	archiveTime timestamp NOT NULL,
	PRIMARY KEY(pID, archiveTime),
	FOREIGN KEY(pID) REFERENCES Product(pID)
);

CREATE TABLE Comment (
	pID varchar(20) NOT NULL,
	uID varchar(20) NOT NULL,
	commentIssued timestamp NOT NULL,
	content varchar(100) NOT NULL,
	type varchar(10) NOT NULL,
	PRIMARY KEY(pID, uID, commentIssued),
	FOREIGN KEY(pID) REFERENCES Product(pID),
	FOREIGN KEY(uID) REFERENCES User(uID)
);



