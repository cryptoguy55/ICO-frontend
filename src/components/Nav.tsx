import { Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'

import Logo from './Logo'




const Nav = ({ absolute = false }) => {

    const [showMenu, setShowMenu] = useState(false)
    
    let menuList = [
        {
            name: "HOME",
            src: '/#index'
        },
        {
            name: "ABOUT",
            src: '/#about'
        },
        {
            name: "ROADMAP",
            src: '/#roadmap'
        },
        {
            name: "FAQ",
            src: '/#faq'
        },
    ]

    return (
        <div id="nav">
            <div className={`${absolute && 'absolute left-0 right-0'} grid grid-flow-col auto-cols-auto justify-between pt-[26px] px-6 md:px-[40px]`}>
                <Logo ></Logo>
                <div className=' gap-[40px] self-center hidden md:flex'>
                    {
                        menuList.map((menu, i) => (
                            <p key={i} className=' font-semibold  text-white text-[16px] uppercase'>
                                <a href={menu.src}>{menu.name}</a>
                            </p>
                        ))
                    }
                </div>
                
                
                <MenuIcon className='h-8 md:hidden w-8 text-white' onClick={(e) => setShowMenu(!showMenu)}></MenuIcon>
            </div>
            <Transition
                show={showMenu}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="-translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="-translate-x-0"
                leaveTo="translate-x-full"
            >
                <div className={` py-8 px-6 w-full h-screen absolute md:hidden bg-primary-500`}>
                    <div className="flex justify-between">
                        <Logo ></Logo>
                        <XIcon className='h-6 w-6 text-white' onClick={(e) => setShowMenu(!showMenu)}></XIcon>
                    </div>
                    <div className=' my-10 gap-[40px] self-center flex flex-col'>
                        {
                            menuList.map((menu, i) => (
                                <p key={i} className=' font-semibold  text-white text-[16px] uppercase'>
                                    {menu.name}
                                </p>
                            ))
                        }
                        <button className='  bg-transparent border-2 border-white rounded-[6px] text-[14px] py-[10px] w-fit h-fit px-[46px] text-white'>Connect Wallet</button>

                    </div>
                </div>
            </Transition>
        </div>
    )
}

export default Nav