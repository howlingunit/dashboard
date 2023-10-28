import { MongoClient, ObjectId } from "mongodb";


const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const db = 'dashboard_db'

// temp vars
const tempUser = 'u1'

export async function new_section(req, res) {

  const database = client.db(db);
  const userData = database.collection(tempUser);

  const section = {
    name: 'test3',
    cards: [
      {
        title: 'card 1',
        link: '',
        text: 'this is a card yayy :)'
      },
      {
        title: 'card 2',
        link: 'https://google.com',
        text: 'this is a card yayy :)'
      }]
    
  }

  const sectionID = await userData.insertOne(section);


  res.json(sectionID)

  //res 1: {"acknowledged":true,"insertedId":"652312f0caf75b3527aa29cc"}

}

export async function addSection(req, res) {
  const { name, user } = req.body
  

  if (!name || !user) {res.status(400); res.json('dude please provide name and user'); return}

  const database = client.db(db);
  const userData = database.collection(user);

  const newSection = {
    name: name,
    cards: []
  }

  const sectionID = await userData.insertOne(newSection);

  res.json('OK')
}

export async function addCard(req, res) {
  const { user, section, title, link, text} = req.body
  // only these to start
  if (!user) {res.status(400); res.json('dude please provide a user'); return}


  const database = client.db(db);
  const userData = database.collection(user);

  const sections = [];

  const cursor = await userData.find({}, {projection: {_id: 1}});

  for await (const sectionId of cursor) {
    const objSectionId = sectionId['_id'].toString()
    sections.push(objSectionId)
  }

  if (!sections.includes(section)) {res.status(400); res.json('dude please provide a valid section ID'); return}


  const newCard = {title, link, text}

  const filter = {_id: new ObjectId(section)}
  const update = {$push: {cards:newCard}}

  const result = await userData.updateOne(filter, update)


  res.json(newCard)
}
 
export async function getUserdata(req, res) {
  const user = req.query.user
  if (!user) {res.status(400); res.json('dude please provide a user'); return}


  const database = client.db(db);
  const userData = database.collection(user);

  const cursor = await userData.find({});


  const output = []

  for await (const section of cursor) {
    output.push(section)  
  }

  
  
  res.json(output);

  return


}

export async function remSections(req, res) {
  const {user, secId} = req.body;
  if (!user) {res.status(400); res.json('dude please provide a user'); return}


  const database = client.db(db);
  const userData = database.collection(user);

  const sections = [];

  const cursor = await userData.find({}, {projection: {_id: 1}});

  for await (const sectionId of cursor) {
    const objSectionId = sectionId['_id'].toString()
    sections.push(objSectionId)
  }

  if (!sections.includes(secId)) {res.status(400); res.json('dude please provide a valid section ID'); return}

  const objSecId = new ObjectId(secId)
  console.log(objSecId)

  const query = { _id: objSecId }

  const result = await userData.deleteOne(query)

  res.json('WIP')
}
