CREATE DATABASE shopping;
USE shopping;

CREATE TABLE users
(
	f_name varchar (255) not null,
    l_name varchar (255) not null,
    email varchar (255) not null,
    password varchar (255) not null,
    user_id int not null,
    city varchar (255),
    street varchar (255),
    isAdmin boolean not null default 0,
	primary key (user_id)
);

CREATE TABLE categories
(
	id int auto_increment,
	category varchar (255) not null,
	primary key (id)
);

CREATE TABLE items
(
	id int auto_increment,
	name varchar (255) not null,
    category_id int not null,
    price int not null,
    img_url text not null,
    foreign key (category_id) references categories (id),    
	primary key (id)
);

CREATE TABLE carts
(
	id int auto_increment,
    user_id int not null,
    date_created datetime default now(),
    foreign key (user_id) references users (user_id),    
	primary key (id)
);

CREATE TABLE cart_details
(
	id int auto_increment,
    item_id int not null,
    cart_id int not null,
    quantity int not null,
    price_unit int not null,
    price_all int not null,
    foreign key (item_id) references items (id),
    foreign key (cart_id) references carts (id),    
	primary key (id)
);

CREATE TABLE orders
(
	id int auto_increment,
    user_id int not null,
    cart_id int not null,
    city varchar (255) not null,
    street varchar (255) not null,
    price_total int not null,
    date_delivery datetime not null,
    date_ordered datetime default now(),
    credit_card varchar (255) not null,
    foreign key (user_id) references users (user_id),
    foreign key (cart_id) references carts (id),    
	primary key (id)
);

INSERT INTO categories (category)
VALUES ("vacuum_cleaners"), ("watches"), ("phones"), ("cameras"), ("smart_devices")

INSERT INTO items (name, category_id, price, img_url) VALUES 
("Robust Vacuum Cleaner VIOMI V2", 1, 1599, "http://localhost:1000/upload/1.jpg"), 
("Rechargeable Wireless Vacuum Cleaner Mi", 1, 999, "http://localhost:1000/upload/2.jpg"), 
("Handheld Vacuum Cleaner 1C", 1, 699, "http://localhost:1000/upload/3.jpg"), 
("Robot Vacuum Cleaner Mi Robot", 1, 1249, "http://localhost:1000/upload/4.jpg"),
("Smart Watch Amazfit Bip Lite", 2, 349, "http://localhost:1000/upload/5.jpg"),
("Amazfit Band 2 Smart Fitness Bracelet", 2, 299, "http://localhost:1000/upload/6.jpg"),
("Smart Watch Amazfit GTS", 2, 675, "http://localhost:1000/upload/7.jpg"),
("Smart Fitness Bracelet Mi Smart Band 4", 2, 179, "http://localhost:1000/upload/8.jpg"),
("Smart Watch Amazfit Bip", 2, 379, "http://localhost:1000/upload/9.jpg"),
("Smart Watch Amazfit Stratos", 2, 849, "http://localhost:1000/upload/10.jpg"),
("Smart Watch Amazfit Verge", 2, 799, "http://localhost:1000/upload/11.jpg"),
("Amazfit PACE Smart Watch", 2, 699, "http://localhost:1000/upload/12.jpg"),
("Mi Note 10 6GB + 128GB", 3, 2490, "http://localhost:1000/upload/13.jpg"),
("REDMI NOTE 8 PRO 6GB + 64GB", 3, 1099, "http://localhost:1000/upload/14.jpg"),
("Mi Note 10 PRO 8GB + 256GB", 3, 2699, "http://localhost:1000/upload/15.jpg"),
("REDMI NOTE 8 4GB + 128GB", 3, 999, "http://localhost:1000/upload/16.jpg"),
("REDMI 8 3GB + 32GB", 3, 599, "http://localhost:1000/upload/17.jpg"),
("REDMI 8 4GB + 64GB", 3, 699, "http://localhost:1000/upload/18.jpg"),
("Black Shark 8GB + 128GB", 3, 1699, "http://localhost:1000/upload/19.jpg"),
("REDMI NOTE 8 4GB + 64GB", 3, 899, "http://localhost:1000/upload/20.jpg"),
("REDMI NOTE 8A 2GB + 32GB", 3, 555, "http://localhost:1000/upload/21.jpg"),
("Mi 8 6GB + 64GB", 3, 1449, "http://localhost:1000/upload/22.jpg"),
("Car Camera Mi Dash Cam 1S", 4, 399, "http://localhost:1000/upload/23.jpg"),
("Selfie Stick for Mi Action Camera", 4, 149, "http://localhost:1000/upload/24.jpg"),
("Wireless Security Camera", 4, 169, "http://localhost:1000/upload/25.jpg"),
("Selfie Stick", 4, 59, "http://localhost:1000/upload/26.jpg"),
("360 ° Panoramic Mi Sphere Camera Kit", 4, 1249, "http://localhost:1000/upload/27.jpg"),
("WIFI Home Security Camera", 4, 249, "http://localhost:1000/upload/28.jpg"),
("Extreme Camera Mi Action Camera 4K", 4, 649, "http://localhost:1000/upload/29.jpg"),
("Selfie Stick Tripod", 4, 69, "http://localhost:1000/upload/30.jpg"),
("Smart Lamp Mi Beside Lamp 2", 5, 179, "http://localhost:1000/upload/31.jpg"),
("Smart LED Bulb Mi LED Smart Bulb", 5, 99, "http://localhost:1000/upload/32.jpg"),
("Smart Air Purifier Mi Air Purifier 3H", 5, 719, "http://localhost:1000/upload/33.jpg"), 
("Wireless Car Charge Wireless Charging Cradle", 5, 199, "http://localhost:1000/upload/34.jpg"),
("Smart Weight Generation 2 Mi Smart Scale 2", 5, 99, "http://localhost:1000/upload/35.jpg"),
("10 Liter Backpack Mi CASUAL DAYPACK", 5, 69, "http://localhost:1000/upload/36.jpg"),
("Electric Kettle Viomi Smart", 5, 299, "http://localhost:1000/upload/37.jpg"),
("Mobile Charger 5000mAh Mi Power Bank", 5, 65, "http://localhost:1000/upload/38.jpg"),
("Waterproof Shoulder Bag Mi City Sling Bag", 5, 79, "http://localhost:1000/upload/39.jpg"),
("Electric Scooter Mi", 5, 1799, "http://localhost:1000/upload/40.jpg"),
("Smart Lamp Portable LED Lamp", 5, 179, "http://localhost:1000/upload/41.jpg"),
("Automatic Umbrella", 5, 99, "http://localhost:1000/upload/42.jpg"),
("Wireless Mouse Mi", 5, 69, "http://localhost:1000/upload/43.jpg"),
("Portable Mouse Wireless Mouse Mi", 5, 89, "http://localhost:1000/upload/44.jpg")

INSERT INTO users (user_id, email, password, city, street, f_name, l_name, isAdmin)
VALUES (111, 'one@gmail.com', '$2a$10$ZlfH2VyNU7uA9iWSLjZ4ZeS5D6KhW3KYtrNFR6RMwqcdPTVeJkMi.', 'Petah Tikva', 'Hefetz Haim', 'Peter', 'Pervy', 0)

INSERT INTO users (user_id, email, password, f_name, l_name, isAdmin)
VALUES (123456789, 'admin@gmail.com', '$2a$10$Df6/T9kJVVBKTBkd4ZIMMOqbfJP/PGQcP6njcQJl5Nlb6nHEKJErO', 'admin', 'admin', 1)

INSERT INTO orders (user_id, cart_id, city, street, price_total, date_delivery, date_ordered, credit_card)
VALUES 
(111, 2, "Petah Tikva", "Hefetz Haim", 10600, "2020-05-19 00:00:00", "2020-05-05 00:00:00", "0004"),
(111, 2, "Petah Tikva", "Hefetz Haim", 10600, "2020-05-30 00:00:00", "2020-05-05 00:00:00", "0004"),
(111, 2, "Petah Tikva", "Hefetz Haim", 10600, "2020-07-17 00:00:00", "2020-05-05 00:00:00", "0004")
	

