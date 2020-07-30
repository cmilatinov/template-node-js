CREATE TABLE users (
	id uniqueidentifier DEFAULT newid() NOT NULL PRIMARY KEY,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	email varchar(255) NOT NULL UNIQUE,
	password varchar(70) NOT NULL,
	reset_guid uniqueidentifier DEFAULT newid() NOT NULL,
	created datetime DEFAULT getutcdate() NOT NULL,
	updated datetime DEFAULT getutcdate() NOT NULL,
	deleted bit DEFAULT 0 NOT NULL
) GO;
