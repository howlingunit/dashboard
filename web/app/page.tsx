'use client'

import Image from 'next/image'
import {type ReactNode} from 'react'
import React from 'react'
import {Card} from './comps/card'
import {Section} from './comps/section'
import {v4 as uuidv4} from 'uuid'
import * as db from './db'
import "./globals.css"

// import data from '../data'


export default function Home() {
  interface card {
    title: string
    text: string
    link: URL
    img: string
  }

  interface secDat {
    id: number
    name: string
    items: card[]
  }

  const [sectionData, setSections] = React.useState<secDat[]>()
  const [newSection, setNewSection] = React.useState<string>('')
  const [toggle, setToggle] = React.useState(1)

  React.useEffect(() => {
    (async () => {
      const data = await db.getUserData()
      setSections(data)
    })()

  }, [toggle])

  function handleChange(e) {
    const value:string = e.target.value;

      setNewSection(value)
  }

  async function addSection(e) {
    e.preventDefault()

    await db.addSection(newSection)

    setToggle((o) => o+1)
  }



  function createSections(){
    const sections: React.ReactNode[] = [];


    for(const section in sectionData){
      const cardElems: React.ReactNode[] = [];
      const cards = sectionData[section]['cards']
      for (const card in cards){
        cardElems.push((<Card title={cards[card]['title']} text={cards[card]['text']} link={cards[card]['link']} key={card} id={card} secID={section} img={cards[card]['img']} setToggle={setToggle} />))
      }
      sections.push((<Section title={sectionData[section]['name']} cards={cardElems} key={sectionData[section]['_id']} id={sectionData[section]['_id']} setToggle={setToggle} />))
    }

    return sections
  }

  const sections = createSections()

  return (
    <main className="min-h-screen p-10  bg-black text-white grid grid-cols-2 ">
      {sections}
      <div className='relative flex flex-col items-center justify-start gap-4 m-5 border-4 rounded-2xl border-gray-800 p-5 pt-5'>
        <h1 className=' text-4xl bg-black -translate-y-11 px-10 rounded-full'>Add section</h1>
        <div className='flex flex-wrap justify-center gap-4 mt-20'>
          <form onSubmit={addSection} className='flex flex-col items-center gap-3'>
            <h2 className='text-2xl font-bold'>Title:</h2>
            <input onChange={handleChange} type="text" name='title' placeholder='Title' className='text-white bg-gray-900 border-0 rounded' />
            <button className='mt-1 bg-gray-900 p-3 text-lg rounded-lg hover:bg-gray-700 duration-500'>Add New Section</button>
          </form>
        </div>
      </div>

    </main>
  )
}
