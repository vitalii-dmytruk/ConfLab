CREATE SEQUENCE speaker_id_seq;
CREATE TABLE speaker (
  id       BIGINT PRIMARY KEY NOT NULL DEFAULT nextval('speaker_id_seq'),
  name     VARCHAR(255)       NOT NULL,
  email    VARCHAR(255)       NOT NULL,
  position VARCHAR(255),
  about    TEXT
);

CREATE UNIQUE INDEX lower_users_email ON speaker (lower(email));