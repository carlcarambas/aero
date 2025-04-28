db = db.getSiblingDB('aero');

db.createUser({
  user: 'ash',
  pwd: 'pikapika',
  roles: [
    {
      role: 'readWrite',
      db: 'aero',
    },
  ],
});

// Create initial collections
db.createCollection('users');
db.createCollection('pigeons');
db.createCollection('races');
db.createCollection('race_results');

db.users.createIndex({ email: 1 }, { unique: true });
db.pigeons.createIndex({ owner: 1 });
