import React, { type ReactNode } from 'react'
import * as db from '../db'


interface myProps {
  id: string;
  title: string;
  cards: ReactNode;
  setToggle: React.Dispatch<React.SetStateAction<any>>;
}

interface card {
  title: string
  text: string
  link: string
  img: string | null
}

interface secDat {
  id: number;
  name: string;
  items: card[];
}


export function Section(props:myProps) {

  const [isBuilding, setIsBuilding] = React.useState<boolean>(false)
  const [img, setImg] = React.useState()

  const [newCard, setNewCard] = React.useState<card>({
    title: '',
    text: '',
    link: '',
    img: null
  })

  function handleChange(e) {
    const {name, value} = e.target;

    if (name == 'img') {
      setImg(e.target.files[0])
      console.log(img)
      return
    }else {

      setNewCard((oldCard) => (
          {
              ...oldCard,
              [name]: value
          }
      ))
    }

  }


  async function uploadImg() {
    const imgId = await db.uploadImg(img);

    console.log(imgId)

    await new Promise((resolve) => {
      // Use setState to update the state
      setNewCard((oldCard) => {
        oldCard.img = imgId

        console.log(oldCard)
        resolve(oldCard);
        return oldCard
      });
    console.log(newCard)
    })
  }


  async function addCard(e) {
    e.preventDefault();

    if(img){
      await uploadImg();
    }

    console.log(newCard)

    await db.addCard(props.id, newCard)


    props.setToggle((o:number) => o+1)

    setIsBuilding(false)

    setNewCard({
      title: '',
      text: '',
      link: '',
      img: null
    })

    setImg(null)
  }

  async function removeSelf(){
    await db.removeSection(props.id)

    props.setToggle((o:number) => o+1)

  }

  return (
    <div className='relative flex flex-col items-center justify-start gap-4 m-5 border-4 rounded-2xl border-gray-800 p-5 pt-5'>
      <h1 className=' text-4xl bg-black -translate-y-11 px-10 rounded-full'>{props.title}</h1>

      <button onClick={removeSelf} className='-translate-y-12 self-start p-2 bg-gray-800 rounded-full hover:bg-slate-600 duration-500'>X</button>
      <div className='flex flex-wrap justify-start gap-4 -translate-y-8'>


        {props.cards}

        {isBuilding ? (
          <div className='bg-[#00b4d8] p-5 h-fit rounded-xl max-w-xs flex flex-col gap-2 ' >
            <form className='flex flex-col gap-3' onSubmit={addCard}>
              <input className='bg-transparent rounded p-1 border-2 placeholder-wite underline font-bold' type="text" name="title" onChange={handleChange} value={newCard.title} placeholder='Title' />
              <input className='bg-transparent rounded p-1 border-2 placeholder-wite underline' type="text" name="link" onChange={handleChange} value={newCard.link} placeholder='https://example.com'/>
              <textarea className='bg-transparent rounded p-1 border-2 placeholder-wite ' name="text" onChange={handleChange} value={newCard.text} placeholder='Text'/>
              <input type="file" onChange={handleChange} name="img" id="" />

              <button>Add new card</button>
            </form>
          </div>

        ):(

          <div className='bg-[#00b4d8] p-5 h-fit rounded-xl max-w-xs flex flex-col gap-2 cursor-pointer hover:bg-[#03045e] duration-300' onClick={() => setIsBuilding(true)} >
            <h2 className='text-6xl'>+</h2>
          </div>

        )}



      </div>

    </div>
  )
}
