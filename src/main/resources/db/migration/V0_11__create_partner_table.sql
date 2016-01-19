CREATE SEQUENCE company_id_seq;

CREATE TABLE company (
  id   BIGINT       NOT NULL PRIMARY KEY DEFAULT nextval('company_id_seq'),
  name VARCHAR(255) NOT NULL,
  url  VARCHAR
);

CREATE SEQUENCE company_event_id_seq;
CREATE TABLE company_event (
  id         BIGINT NOT NULL PRIMARY KEY DEFAULT nextval('company_event_id_seq'),
  event_id   BIGINT NOT NULL,
  company_id BIGINT NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE,
  FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE
);