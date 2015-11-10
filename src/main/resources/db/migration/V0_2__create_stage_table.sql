CREATE SEQUENCE stage_id_seq;
CREATE TABLE stage (
  id       INT PRIMARY KEY NOT NULL DEFAULT nextval('stage_id_seq'),
  title    VARCHAR(50)     NOT NULL,
  capacity INT             NOT NULL
);
