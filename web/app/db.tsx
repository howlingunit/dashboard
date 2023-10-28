const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function getUserData(){
  console.log(BASE_URL)

  const req = await fetch(`${BASE_URL}/getUserData?user=u1`)

  const data = await req.json()
  console.log(`${BASE_URL} gives ${data}`)
  return data;
}

export async function addSection(name:string) {
  const payload = {name: name, user: 'u1'}

  const req  = await fetch(`${BASE_URL}/add-section`, {
    method: 'POST',
    headers: {
      'content-type': 'application/JSON'
    },
    body: JSON.stringify(payload)
  });

  
}
