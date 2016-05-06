UPDATE speech
SET lang_id = NULL;

ALTER TABLE speech DROP CONSTRAINT speech_lang_id_fkey;

DROP TABLE languages;
DROP SEQUENCE IF EXISTS languages_id_seq;

CREATE TABLE languages (
  id   BIGSERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(20)           NOT NULL
);

ALTER TABLE speech ADD FOREIGN KEY (lang_id) REFERENCES languages (id);

INSERT INTO languages (name) VALUES ('Ukrainian'), ('English'), ('Russian');