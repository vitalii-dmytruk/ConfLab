CREATE SEQUENCE speech_id_seq;

CREATE TABLE speech (
  id          BIGINT NOT NULL PRIMARY KEY DEFAULT nextval('speech_id_seq'),
  title       VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  lang        VARCHAR(8)
);