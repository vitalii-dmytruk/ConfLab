CREATE SEQUENCE speech_id_seq;

CREATE TABLE speech (
  id          BIGINT NOT NULL PRIMARY KEY DEFAULT nextval('speech_id_seq'),
  title       VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  lang        VARCHAR(8)
);

CREATE TABLE speech_speaker (
  speaker_id bigint NOT NULL,
  speech_id bigint NOT NULL,
  FOREIGN KEY (speaker_id) REFERENCES speaker(id) ON DELETE CASCADE,
  FOREIGN KEY (speech_id) REFERENCES speech(id) ON DELETE CASCADE
);