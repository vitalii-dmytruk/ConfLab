DROP TABLE IF EXISTS company_event;
DROP SEQUENCE IF EXISTS company_event_id_seq;

CREATE SEQUENCE event_company_id_seq;
CREATE TABLE event_company (
  id         BIGINT NOT NULL PRIMARY KEY DEFAULT nextval('event_company_id_seq'),
  event_id   BIGINT NOT NULL,
  company_id BIGINT NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE,
  FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE,
  CONSTRAINT unique_event_company UNIQUE (event_id, company_id)
);

