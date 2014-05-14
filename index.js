var knex = require('knex');

var db = knex.initialize({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'shippable',
    password : '',
    database : 'test'
  }
});

db.schema.hasTable('things').then(function (exists) {
  if (exists) {
    console.log('Table exists, dropping...');
    db.schema.dropTable('things');
  } else {
    db.schema.createTable('things', function (table) {
      table.string('name');
    }).then(function () {
      console.log('Things table is created!');
    });
  }
});

module.exports.get = function (name, cb) {
  db('things')
    .where({ name: name })
    .select('name')
    .then(function (name) {
      cb(name);
    });
};

module.exports.save = function (name, cb) {
  db('things')
    .insert({ name: name })
    .exec(function (id) {
      cb(id);
    });
};
