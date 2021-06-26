CREATE DATABASE associates_management;
CREATE SCHEMA associates;


CREATE TABLE  if not exists associates.specialization_master
(
    specialization_id    BIGSERIAL not null primary key,
    specialization_name        VARCHAR(60) not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

CREATE TABLE  if not exists associates.associates_master
(
    associate_id    BIGSERIAL not null primary key,
    associate_name        VARCHAR(60) not null unique,
		phone          VARCHAR(40) not null,
	  address_val   VARCHAR not null,
		is_active BOOLEAN default true not  null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);


CREATE TABLE  if not exists associates.associates_br_spec
(
  id  BIGSERIAL not null primary key,
  associate_id BIGINT REFERENCES associates.associates_master(associate_id),
  specialization_id BIGINT REFERENCES associates.specialization_master(specialization_id),
  created_at timestamp default now() not null,
  updated_at timestamp default now() not null
);


INSERT INTO associates.specialization_master (specialization_name) VALUES ('Angular'),('NodeJS'),('ASP.Net'),('Web API'), ('Knockout'), ('SharePoint'),
 ('React.js'),('MongoDB'),('PostgresSQL'),('Spring boot'),('Django');

