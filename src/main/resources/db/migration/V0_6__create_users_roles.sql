CREATE SEQUENCE roles_id_seq;

CREATE TABLE roles (
  id   BIGINT NOT NULL PRIMARY KEY DEFAULT nextval('roles_id_seq'),
  role VARCHAR(15)
);

INSERT INTO roles (id, role) VALUES (0, 'ROLE_USER');
INSERT INTO roles (id, role) VALUES (1, 'ROLE_ADMIN');

ALTER TABLE users ADD role_id BIGINT NOT NULL DEFAULT 0;
ALTER TABLE users ADD FOREIGN KEY (role_id) REFERENCES roles (id);