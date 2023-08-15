import {v4 as uuidv4} from 'uuid';
import {initializeApp} from 'firebase/app'
import {getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject} from 'firebase/storage'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const firebaseConfig = { 
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASURMENT_ID
};
console.log(firebaseConfig)

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)


export async function uploadImg(img) {

  const id:string = uuidv4()

  const imageRef = ref(storage, `u1/${id}/${img.name}`)

  await uploadBytes(imageRef, img)

  return id
}

export async function getImg(imgId:string){
  const imageRef = ref(storage, `/u1/${imgId}`)

  const img = await listAll(imageRef)


  return await getDownloadURL(img.items[0])

}

export async function getUserData(){
  const req = await fetch(`${BASE_URL}/u1.json`)

  const data = await req.json()

  return data;
}


export async function addCard(sectionID:string, card){

  const cardID:string = uuidv4()

  const payload = {[cardID]: {
    ...card
  }}
  const req = await fetch(`${BASE_URL}/u1/${sectionID}/cards.json`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  })
}

export async function removeCard(cardID:string, sectionID:string) {
  const req = await fetch(`${BASE_URL}/u1/${sectionID}/cards/${cardID}.json`, {
    method: 'DELETE',
  })


}

export async function removeImg(imgId: string){
  const imgRef = ref(storage, `u1/${imgId}/`)

  const img = await listAll(imgRef)


  await deleteObject(img.items[0])
}

export async function addSection(secName:string) {
  const secID:string = uuidv4()

  const payload = {[secID]: {
    'name': secName,
    'cards': {}
  }}
  const req = await fetch(`${BASE_URL}/u1.json`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  })
}

export async function removeSection(secID:string) {
  await fetch(`${BASE_URL}/u1/${secID}.json`, {
    method: 'DELETE',
  })
}
