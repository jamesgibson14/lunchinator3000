const marklogic = require('marklogic');
const connection = require('./env').connection;

const db = marklogic.createDatabaseClient(connection);
const qb = marklogic.queryBuilder;

db.documents.query(
  qb.where(
    qb.byExample(
      {
        gender: 'male',
        age: { $gt: 25 },
        tags: ['ex'],
        $filtered: true
      }
    )
  )
)
.stream()
.on('data', document => console.log(document))
.on('error', error => console.error(error));
