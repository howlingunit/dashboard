import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Link from 'next/link'
import React, { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Generated by Tyler',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}){

  interface Linko {
    name: string;
    link: string;
  }

  const links: Linko[] = [
    {
      name: 'page 1',
      link: '/'
    },
    {
      name: 'page 2',
      link: '/'
    },
    {
      name: 'page 3',
      link: '/'
    },
    {
      name: 'page 4',
      link: '/'
    },
  ]

  const setLinks: ReactNode =  links.map((link) => {
      return (
        <Link href={link.link} key={link.name}>
          <div className='text-white p-2 px-5 bg-[#00b4d8] rounded-b hover:bg-[#6cbaff] duration-200'>
            <p>{link.name}</p>
          </div>
      </Link>
      )
    })



  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <nav className='flex gap-3 items-center flex-col'>
          <ul className='flex font-mono justify-evenly w-full bg-black'>
            {setLinks}
          </ul>
        </nav>

        {children}
        
        </body>
    </html>
  )
}
