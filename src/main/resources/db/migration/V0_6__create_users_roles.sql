CREATE SEQUENCE authority_id_seq;

CREATE TABLE authority (
  id   INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('authority_id_seq'),
  role VARCHAR(15)
);


CREATE TABLE user_authority (
  user_id      BIGINT  NOT NULL,
  authority_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (authority_id) REFERENCES authority (id) ON DELETE CASCADE
);

INSERT INTO authority (role) VALUES ('USER');
INSERT INTO authority (role) VALUES ('ADMIN');

INSERT INTO user_authority (user_id, authority_id) VALUES (
  (SELECT id
   FROM users
   WHERE username = 'test'),
  (SELECT id
   FROM authority
   WHERE role = 'ADMIN')
);
