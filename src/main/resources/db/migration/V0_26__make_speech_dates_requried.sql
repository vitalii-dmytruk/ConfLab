UPDATE events
SET start_date = '2016-07-09';
UPDATE events
SET end_date = '2017-07-10';


ALTER TABLE events ALTER COLUMN start_date SET NOT NULL;
ALTER TABLE events ALTER COLUMN end_date SET NOT NULL;