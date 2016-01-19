CREATE SEQUENCE partner_id_seq;

CREATE TABLE partner (
  id   BIGINT       NOT NULL PRIMARY KEY DEFAULT nextval('partner_id_seq'),
  name VARCHAR(255) NOT NULL,
  url VARCHAR
);

CREATE TABLE partner_event (
  event_id BIGINT NOT NULL,
  partner_id BIGINT NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE,
  FOREIGN KEY (partner_id) REFERENCES partner (id) ON DELETE CASCADE
);