

CREATE EXTENSION pgcrypto;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(64) NOT NULL,
  password VARCHAR(64) NOT NULL,
  UNIQUE(username)
);

CREATE TABLE api_keys (
  id SERIAL PRIMARY KEY,
  user_id INT,
  token VARCHAR(180) NOT NULL,
  enabled BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE request_logs (
  id SERIAL PRIMARY KEY,
  api_key_id INT,
  url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY(api_key_id) REFERENCES api_keys(id)
);

INSERT INTO users (username, password) VALUES (
  'fleekadmin',
  crypt('dwebforthewin', gen_salt('bf'))
);
