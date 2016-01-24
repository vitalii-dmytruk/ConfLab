CREATE SEQUENCE partner_level_id_seq START WITH 6;

CREATE TABLE partner_level (
  id   BIGINT      NOT NULL PRIMARY KEY DEFAULT nextval('partner_level_id_seq'),
  name VARCHAR(80) NOT NULL
);

INSERT INTO partner_level (id, name) VALUES
  (1, 'Organizer'),
  (2, 'Platinum'),
  (3, 'Gold'),
  (4, 'Silver'),
  (5, 'Information');

ALTER TABLE event_company
ADD COLUMN partner_level_id BIGINT NOT NULL DEFAULT 1,
ADD CONSTRAINT event_company_partner_level_id_fkey FOREIGN KEY (partner_level_id) REFERENCES partner_level (id);


