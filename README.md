#####
#Basic description
RESTful API that interacts with a Postgre database. Implemented in NodeJS with typescript, restify, and pg-promise. Edited in Visual Studio Code.

Be sure to modify the ./app/config/config.ts file with your server port and database configuration.

Via the terminal navigate to the source code directory and run the following commands...
$ npm install
$ npm run compile
$ npm run start


#####
#SQL script for the product table...
CREATE EXTENSION "uuid-ossp";

--DROP TABLE product;
CREATE TABLE product (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  lookupcode character varying(32) NOT NULL DEFAULT(''),
  count int NOT NULL DEFAULT(0),
  createdon timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone,
  CONSTRAINT product_pkey PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);

CREATE INDEX ix_product_lookupcode
  ON product
  USING btree
  (lower(lookupcode::text) COLLATE pg_catalog."default");

INSERT INTO product(lookupcode, count) VALUES (
       'lookupcode1'
     , 100
);

INSERT INTO product(lookupcode, count) VALUES (
       'lookupcode2'
     , 125
);

INSERT INTO product(lookupcode, count) VALUES (
       'lookupcode3'
     , 150
);

--SELECT * FROM product;
--DELETE FROM product WHERE id IN ('bbeee1ac-41d0-42ea-8685-687e37dd8b42'::uuid);


#####
#cURL POST request to save a product
curl -s -H "accept-version: ~0" -H "Content-Type: application/json" -X POST -d '{"lookupCode":"lookupcode4","count":5}' localhost:15125/product

#####
#