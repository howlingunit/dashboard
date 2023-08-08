import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as db from '../db'
import { getImageSize } from 'next/dist/server/image-optimizer'

interface myProps {
    title: string
    text: string
    link: URL
    img: string
    id: string
    secID: string
    setToggle: React.Dispatch<React.SetStateAction<any>>
}

export function Card(props:myProps) {

  async function removeCard(){
    await db.removeCard(props.id, props.secID)

    if (props.img){
      await db.removeImg(props.img)
    }

    props.setToggle((o:number) => o+1)
  }

  const [img, setImg] = React.useState<string>()

  React.useEffect(() => {
    (async () => {
      if(props.img) {
        const getImg = await db.getImg(props.img)
        setImg(getImg)
      }
    })()

  })



  return (
    <div className='bg-[#00b4d8] p-3 h-fit rounded-xl max-w-xs flex flex-col gap-2' >

      <div className='self-end bg-black bg-opacity-30 p-1 rounded-full cursor-pointer hover:bg-opacity-80 duration-500' onClick={removeCard}>x</div>

      <h2 className='underline text-lg font-bold'>{props.title}</h2>
      {props.link && (<Link href={props.link} target='_blank'><p className='underline'>{props.link.toString()}</p></Link>) }
      <p className='whitespace-pre-line'>{props.text}</p>

      {img && (<Image src={img} alt='' width={500} height={500} className='rounded'/>)}
    </div>
  )
}
