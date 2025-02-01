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
    unique_id VARCHAR(50) NOT NULL UNIQUE
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


