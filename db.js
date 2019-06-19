const MongoClient = require('mongodb').MongoClient

class Connection {
    static connectToMongo() {
        if ( this.db ) return Promise.resolve(this.db)
        return MongoClient.connect(this.url, this.options)
            .then(
            db => {this.db = db.db('MongoDb')
            console.log('db id connected')}
          )
            .catch(
              err=>console.log('error connecting to database')
            )
    }
}

Connection.db = null
Connection.url = 'mongodb://127.0.0.1:27017/MongoDb'
Connection.options = {
    useNewUrlParser: true
}

module.exports = { Connection }
