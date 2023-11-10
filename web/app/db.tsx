const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function getUserData(){

  const req = await fetch(`${BASE_URL}/getUserData?user=u1`)

  const data = await req.json()
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

export async function removeSection(secId: string) {
  const payload = {user: 'u1', secId}

  const req  = await fetch(`${BASE_URL}/remove-section`, {
    method: 'POST',
    headers: {
      'content-type': 'application/JSON'
    },
    body: JSON.stringify(payload)
  });
}

export async function addCard(section:string, card:{name?: string; url?: string; text?: string}) {
  const payload = {user: 'u1', section, ...card}


  const req  = await fetch(`${BASE_URL}/add-card`, {
    method: 'POST',
    headers: {
      'content-type': 'application/JSON'
    },
    body: JSON.stringify(payload)
  });
}

export async function removeCard(section:string, card:string) {
  const payload = {user: 'u1', section, card}

  const req  = await fetch(`${BASE_URL}/remove-card`, {
    method: 'POST',
    headers: {
      'content-type': 'application/JSON'
    },
    body: JSON.stringify(payload)
  });
}