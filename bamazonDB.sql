-- Drops the bamazonDB if it exists currently --
DROP DATABASE IF EXISTS bamazonDB;
-- Creates the "bamazonDB" database --
CREATE DATABASE bamazonDB;

-- Makes it so all of the following code will affect bamazonDB --
USE bamazonDB;

-- Creates the table "products" within bamazonDB --
CREATE TABLE products (

  item_id INTEGER(100) NOT NULL,

  product_name VARCHAR(50),

  department_name VARCHAR(50),

  price INTEGER(100),

  stock_quantity INTEGER(100)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "hairbrush", "fashion", 5, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "television", "electronics", 500, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "airpods", "A/V", 200, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "crockpot", "cooking", 50, 15);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "toothbrush", "hygiene", 5, 1000);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "mascara", "makeup", 10, 80);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "macbook", "electronics", 2000, 30);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "plates", "cooking", 20, 300);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "beer", "beverage", 10, 2000);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "strawberries", "fruit", 4, 205);

