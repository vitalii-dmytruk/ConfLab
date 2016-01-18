INSERT INTO speech_speaker (speaker_id, speech_id) (
  SELECT
    speaker.id,
    NULL
  FROM speaker
    LEFT JOIN speech_speaker
      ON speaker.id = speech_speaker.speaker_id
         AND speech_speaker.speech_id ISNULL
  WHERE speech_speaker.id ISNULL);

INSERT INTO speech_speaker (speaker_id, speech_id) (
  SELECT
    NULL,
    speech.id
  FROM speech
    LEFT JOIN speech_speaker
      ON speech.id = speech_speaker.speech_id
         AND speech_speaker.speaker_id ISNULL
  WHERE speech_speaker.id ISNULL);


