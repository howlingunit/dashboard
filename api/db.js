import {MongoClient} from 'mongodb'

const url = 'mongodb://localhost:27017'
const dbName = 'dashboard'

async function main() {
  const client = new MongoClient(url)

  try {
    await client.connect();
    console.log(await client.db().admin().listDatabases())
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
    
  }


}

await main()
console.log('running?')