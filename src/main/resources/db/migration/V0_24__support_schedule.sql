ALTER TABLE speech ADD COLUMN track_id INT;
ALTER TABLE speech ADD FOREIGN KEY (track_id) REFERENCES track (id);

ALTER TABLE speech ADD COLUMN duration INT;
ALTER TABLE speech ADD COLUMN position INT;
ALTER TABLE speech ADD COLUMN all_tracks BOOLEAN;