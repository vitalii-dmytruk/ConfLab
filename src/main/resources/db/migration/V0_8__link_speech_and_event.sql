CREATE SEQUENCE speech_speaker_id_seq;

ALTER TABLE speech_speaker ADD COLUMN id BIGINT NOT NULL PRIMARY KEY DEFAULT nextval('speech_speaker_id_seq');

CREATE SEQUENCE event_speech_speaker_id_seq;

CREATE TABLE event_speech_speaker_map (
  id                BIGINT PRIMARY KEY NOT NULL DEFAULT nextval('event_speech_speaker_id_seq'),
  event_id          BIGINT             NOT NULL,
  speech_speaker_id BIGINT             NOT NULL,
  FOREIGN KEY (speech_speaker_id) REFERENCES speech_speaker (id),
  FOREIGN KEY (event_id) REFERENCES events (id)
);