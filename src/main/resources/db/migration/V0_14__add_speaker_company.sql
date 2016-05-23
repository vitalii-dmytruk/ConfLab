ALTER TABLE speaker ADD company_id BIGINT NULL;

ALTER TABLE speaker ADD CONSTRAINT speaker_company_id_fkey
FOREIGN KEY (company_id) REFERENCES company (id);