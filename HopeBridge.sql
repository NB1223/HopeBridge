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

ALTER TABLE Request
ADD COLUMN requested_quantity INT NOT NULL;

DELIMITER //
CREATE PROCEDURE InsertDonation(
    IN donor_id_param INT,
    IN request_id_param INT,
    IN items_donated_param TEXT,
    IN quantity_param INT,
    IN pickup_location_param VARCHAR(255),
    IN drop_location_param VARCHAR(255)
)
BEGIN
    DECLARE available_qty INT;

    -- Fetch the requested quantity for the given request_id
    SELECT requested_quantity INTO available_qty 
    FROM Request 
    WHERE request_id = request_id_param;

    -- Check if the requested quantity is sufficient
    IF available_qty IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid request ID';
    ELSEIF quantity_param > available_qty THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Donation quantity exceeds requested quantity';
    ELSE
        -- Insert donation if the quantity is within the requested limit
        INSERT INTO Donation (donor_id, request_id, items_donated, quantity, pickup_location, drop_location)
        VALUES (donor_id_param, request_id_param, items_donated_param, quantity_param, pickup_location_param, drop_location_param);

        -- Update the requested quantity in Request table
        UPDATE Request
        SET requested_quantity = requested_quantity - quantity_param
        WHERE request_id = request_id_param;
    END IF;
END;
//
DELIMITER ;

DELIMITER //

CREATE TRIGGER After_Insert_Donation
AFTER INSERT ON Donation
FOR EACH ROW
BEGIN
    -- Subtract the donated quantity from the requested_quantity in the Request table
    UPDATE Request
    SET requested_quantity = requested_quantity - NEW.quantity
    WHERE request_id = NEW.request_id;
END;
//

DELIMITER ;