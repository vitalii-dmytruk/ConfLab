ALTER TABLE speech ADD COLUMN event_id BIGINT;

UPDATE speech
SET event_id =
COALESCE(
    (SELECT event_speech_speaker_map.event_id
     FROM speech AS S
       JOIN speech_speaker
         ON S.id = speech_speaker.speech_id
       JOIN event_speech_speaker_map
         ON speech_speaker.id = event_speech_speaker_map.speech_speaker_id
     WHERE speech.id = S.id
     LIMIT 1),
    (SELECT id
     FROM events
     LIMIT 1));

DELETE FROM speech
WHERE event_id IS NULL;

ALTER TABLE speech ALTER COLUMN event_id SET NOT NULL;
ALTER TABLE speech ADD FOREIGN KEY (event_id) REFERENCES events (id);
