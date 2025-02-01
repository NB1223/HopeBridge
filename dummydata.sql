INSERT INTO Donor (name, phone_number, email, state, district, password)
VALUES 
    ('John Doe', '9876543210', 'john.doe@example.com', 'California', 'Los Angeles', 'hashed_password_1'),
    ('Alice Smith', '8765432109', 'alice.smith@example.com', 'Texas', 'Dallas', 'hashed_password_2'),
    ('Bob Johnson', '7654321098', 'bob.johnson@example.com', 'Florida', 'Miami', 'hashed_password_3');

INSERT INTO Admin (name, password)
VALUES 
    ('superadmin', 'hashed_admin_password_1'),
    ('manager1', 'hashed_admin_password_2');

INSERT INTO NGO (state, district, sector, ngo_type, ngo_name, unique_id, password)
VALUES 
    ('California', 'Los Angeles', 'Education', 'Non-Profit', 'Hope for Kids', 'NGO12345', 'dummyhashedpassword'),
    ('Texas', 'Houston', 'Healthcare', 'Charitable Trust', 'Healing Hands', 'NGO67890', 'dummyhashedpassword'),
    ('New York', 'Brooklyn', 'Food Supply', 'Foundation', 'Meals for All', 'NGO11223', 'dummyhashedpassword');

INSERT INTO Request (ngo_id, ngo_name, request_type, request_description, ngo_state, ngo_district, donation_deadline)
VALUES 
    (1, 'Hope for Kids', 'Food', 'Need food supplies for underprivileged children', 'California', 'Los Angeles', '2024-12-01'),
    (2, 'Healing Hands', 'Money', 'Fundraising for medical aid', 'Texas', 'Houston', '2024-11-20'),
    (3, 'Meals for All', 'Clothes', 'Collecting warm clothes for winter', 'New York', 'Brooklyn', '2024-11-30');

INSERT INTO Donation (donor_id, request_id, items_donated, quantity, pickup_location, drop_location)
VALUES 
    (1, 1, 'Rice, Canned Beans, Pasta', 50, '123 Main St, LA', 'Hope for Kids Shelter'),
    (2, 2, 'Cash Donation', 2000, 'Online Transfer', 'Healing Hands Medical Fund'),
    (3, 3, 'Winter Jackets, Scarves, Gloves', 30, '456 Park Ave, NY', 'Meals for All Distribution Center');


{
  "name": "Jeevana",
  "phone_number": "9876543210",
  "email": "jeevana@example.com",
  "state": "California",
  "district": "Los Angeles",
  "password": "abc123"
}