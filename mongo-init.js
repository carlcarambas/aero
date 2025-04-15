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
db.createCollection('Users');
db.createCollection('Birds');
db.createCollection('Races');

db.Users.createIndex({ email: 1 }, { unique: true });
db.Birds.createIndex({ owner: 1 });
