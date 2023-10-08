import { MongoClient } from "mongodb";


const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const db = 'dashboard_db'

// temp vars
const user = 'u1'

export async function new_section(req, res) {

  const database = client.db(db);
  const userData = database.collection(user);

  const section = {
    name: 'test',
    cards: {card1:{
        title: 'card 1',
        link: '',
        text: 'this is a card yayy :)'
      }}
    
  }

  const sectionID = await userData.insertOne(section)

  await client.close();

  res.json(sectionID)

  //res 1: {"acknowledged":true,"insertedId":"652312f0caf75b3527aa29cc"}

}

export async function getUserdata(req, res) {
  const database = client.db(db);
  const userData = database.collection(user);



  
  const options = {
    sort: { name: 1 },
    projection: { _id: 0, name: 1, cards: 1 },
  };

  const sections = userData.findOne({name: 'test'}, options);

  await client.close();

  res.json(sections)
}