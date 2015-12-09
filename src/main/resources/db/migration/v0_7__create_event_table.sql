CREATE SEQUENCE event_id_seq;

CREATE TABLE events (
  id          BIGINT       NOT NULL PRIMARY KEY DEFAULT nextval('event_id_seq'),
  name        VARCHAR(255) NOT NULL,
  venue       VARCHAR(255),
  description TEXT,
  start_date  DATE,
  end_date    DATE
);