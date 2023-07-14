USE Arepa_Luruaco;

CREATE TABLE users(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(100) NOT NULL UNIQUE,
firstName VARCHAR(90) NOT NULL,
lastName VARCHAR(90) NOT NULL,
phone VARCHAR(90) NOT NULL UNIQUE,
image VARCHAR(255) NULL,
password VARCHAR(90) NOT NULL,
created_at TIMESTAMP(0) NOT NULL,
updated_at TIMESTAMP(0) NOT NULL

);


CREATE TABLE roles(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(180) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
     updated_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)

VALUES(
 'RESTAURANTE',
 '/restaurant/orders/list',
 '2023-06-29',
 '2023-06-29'
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
 'CLIENTE',
 '/client/products/list',
 '2023-06-29',
  '2023-06-29'
);

CREATE TABLE user_has_roles(
	id_user BIGINT NOT NULL,
    id_rol BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(id_user, id_rol)
);

CREATE TABLE products(

id BIGINT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(180) NOT NULL UNIQUE,
descripcion TEXT NOT NULL,
price DECIMAL NOT NULL,
image1 VARCHAR(255) NULL,
created_at TIMESTAMP(0) NOT NULL,
updated_at TIMESTAMP(0) NOT NULL
)


