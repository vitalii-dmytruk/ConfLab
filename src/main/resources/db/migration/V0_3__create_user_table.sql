CREATE SEQUENCE users_id_seq;

CREATE TABLE users (
  id          BIGINT NOT NULL PRIMARY KEY DEFAULT nextval('users_id_seq'),
  username    VARCHAR(50) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  email       VARCHAR(50) NOT NULL UNIQUE,
  first_name  VARCHAR(255) NOT NULL,
  last_name   VARCHAR(255) NOT NULL
);