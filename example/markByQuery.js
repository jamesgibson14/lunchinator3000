const marklogic = require('marklogic');
const connection = require('./env').connection;

const db = marklogic.createDatabaseClient(connection);
const qb = marklogic.queryBuilder;

db.documents.query(
  qb.where(
    qb.collection('fake data'),
    qb.value('gender', 'male'),
    qb.or(
      qb.word('about', 'America'),
      qb.word('address', 'Illinois')
    )
  )
)
.stream()
.on('data', document => console.log(document))
.on('error', error => console.log(error));
