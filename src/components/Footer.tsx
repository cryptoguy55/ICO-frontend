import { ArrowUpIcon } from '@heroicons/react/outline'

const Footer = () => {
    return (
        <div className='shadow-footer px-6 md:px-[130px] py-14 md:py-[60px]'>
            <div className=' w-full grid grid-flow-row sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-2 md:grid-flow-row md:grid-rows-none md:grid-cols-3 gap-6'>
                <div className='h-fit'>
                    <img alt="freshair" src='/img/logo2.png' className='h-[55px] w-[223px] mb-[43px]'></img>
                    <div className='flex gap-6'>
                        <img alt="freshair" src='/img/icons/facebook.png' className=' h-6 w-6'></img>
                        <img alt="freshair" src='/img/icons/instagram.png' className=' h-6 w-6'></img>
                        <img alt="freshair" src='/img/icons/linkedin.png' className=' h-6 w-6'></img>
                        <img alt="freshair" src='/img/icons/twitter.png' className=' h-6 w-6'></img>
                    </div>
                </div>
                <div className='my-12 md:my-0 h-fit '>
                    <p className='font-normal text-2xl text-primary-700'>freshair</p>
                    <p className='font-normal text-2xl text-dark01'>2717 Commercial Center <br /> Blvd.,Katy, <br /> TX 77494</p>
                </div>
                <div className='flex justify-between gap-6 h-fit'>
                    <div className='flex flex-col gap-[26px] w-min h-fit '>
                        <div className='border-b-[1px] border-b-primary-700 w-fit'>
                            <p className=' text-sm text-dark01'>(987) 654-3210</p>
                        </div>
                        <div className='border-b-[1px] border-b-primary-700  w-fit'>
                            <p className=' text-sm text-dark01'>contact@freshair.com</p>
                        </div>
                    </div>
                    <a href="#nav" className='h-fit'>
                        <div className="h-[52px] w-[52px] bg-primary-700 rounded-full text-center align-middle items-center justify-center flex">
                            <ArrowUpIcon className='h-6 w-6 text-white'></ArrowUpIcon>
                        </div>
                    </a>
                </div>

            </div>
            <p className='text-dark01 font-normal text-xs md:pt-[63px] pt-10 '>© 2022 freshair. All rights reserved.</p>

        </div>
    )
}

export default Footer