CREATE TABLE languages (
  id   BIGSERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(20)           NOT NULL
);
ALTER TABLE speech DROP COLUMN lang;
ALTER TABLE speech ADD COLUMN lang_id BIGINT;
ALTER TABLE speech ADD FOREIGN KEY (lang_id) REFERENCES languages (id);

INSERT INTO languages (id, name) VALUES ('0', 'Ukrainian'), ('1', 'English'), ('2', 'Russian');