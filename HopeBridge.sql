CREATE DATABASE IF NOT EXISTS HopeBridge;

USE HopeBridge;

CREATE TABLE IF NOT EXISTS Donor (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(10) NOT NULL CHECK (phone_number REGEXP '^[0-9]{10}$'),
    email VARCHAR(255) NOT NULL UNIQUE CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$'),
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS Admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS NGO (
    ngo_id INT AUTO_INCREMENT PRIMARY KEY,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    sector VARCHAR(255) NOT NULL,
    ngo_type VARCHAR(100) NOT NULL,
    ngo_name VARCHAR(255) NOT NULL,
    unique_id VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Request (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    ngo_id INT NOT NULL,
    ngo_name VARCHAR(255) NOT NULL,
    request_type ENUM('Food', 'Money', 'Clothes', 'Sanitary/Toiletries') NOT NULL,
    request_description TEXT NOT NULL,
    ngo_state VARCHAR(100) NOT NULL,
    ngo_district VARCHAR(100) NOT NULL,
    donation_deadline DATE NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (ngo_id) REFERENCES NGO(ngo_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Donation (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,
    donor_id INT NOT NULL,
    request_id INT NOT NULL,
    items_donated TEXT NOT NULL,
    quantity INT NOT NULL,
    pickup_location VARCHAR(255) NOT NULL,
    drop_location VARCHAR(255) NOT NULL,
    FOREIGN KEY (donor_id) REFERENCES Donor(donor_id) ON DELETE CASCADE,
    FOREIGN KEY (request_id) REFERENCES Request(request_id) ON DELETE CASCADE
);

alter table donation
drop column pickup_location;

alter table donation
drop column drop_location;

DELIMITER $$
mysql>
mysql> CREATE PROCEDURE InsertDonation(
    ->     IN donor_id VARCHAR(255),
    ->     IN request_id VARCHAR(255),
    ->     IN items_donated TEXT,
    ->     IN quantity INT
    -> )
    -> BEGIN
    ->     -- Insert data into the donation table
    ->     INSERT INTO donation (donor_id, request_id, items_donated, quantity)
    ->     VALUES (donor_id, request_id, items_donated, quantity);
    -> END $$
Query OK, 0 rows affected (0.01 sec)


mysql> DELIMITER ;

DELIMITER $$

CREATE TRIGGER update_request_quantity_after_donation
AFTER INSERT ON donation
FOR EACH ROW
BEGIN
    -- Update the quantity in the request table after a donation
    UPDATE request
    SET quantity = quantity - NEW.quantity
    WHERE request_id = NEW.request_id;
END $$

DELIMITER ;
