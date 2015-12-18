ALTER TABLE speech_speaker ALTER COLUMN speech_id DROP NOT NULL;
ALTER TABLE speech_speaker ALTER COLUMN speaker_id DROP NOT NULL;
ALTER TABLE speech_speaker ADD CONSTRAINT unique_speech_speaker_map UNIQUE (speech_id, speaker_id);