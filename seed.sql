INSERT INTO users
  (username, first_name, last_name)
VALUES
  ('elie', 'Elie', 'Schoppik'),
  ('matt', 'Matt', 'Lane'),
  ('joel', 'Joel', 'Burton');

INSERT INTO messages
  (body, username)
VALUES
  ('hello', 'elie'),
  ('hi', 'matt'),
  ('also hello', 'joel'),
  ('goodbye', 'elie');
