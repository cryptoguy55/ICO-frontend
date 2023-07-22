
const Tokenomics = () => {

    const ColoredList = ({ color, title,value }: { color: any, title: any, value:number }) => (
        <div className='flex' >
            <div className={`min-h-[53px] w-[6px] ${color}`}></div>
            <div className='ml-[26px]'>
                <p className='text-[24.5px] font-medium text-dark01'>{title}: {value}%</p>
            </div>
        </div>
    )

    const data1 = [
        {
            title:"Seed",
            value:3,
            color:'bg-purple-500'
        },
        {
            title:"Private",
            value:10,
            color:'bg-blue-500'
        },
        {
            title:"Public",
            value:6,
            color:'bg-emerald-500'
        },
        {
            title:"Liquidity Supply",
            value:15,
            color:'bg-orange-500'
        },
        {
            title:"Development",
            value:5,
            color:'bg-yellow-500'
        },
        {
            title:"Marketing",
            value:10,
            color:'bg-green-500'
        },
    ]


    const data2 = [
        {
            title:"Partnership & Advisors",
            value:5,
            color:'bg-red-500'
        },
        {
            title:"Charity",
            value:3,
            color:'bg-purple-500'
        },
        {
            title:"Staking & Rewards",
            value:10,
            color:'bg-green-500'
        },
        {
            title:"Reforestation",
            value:25,
            color:'bg-yellow-500'
        },
        {
            title:"Team",
            value:8,
            color:'bg-emerald-500'
        },
    ]

    return (
        <div className='mx-6 md:mx-[125px] mb-[190px] '>
            <h2 className='text-[50px] font-medium mb-[48px] text-center text-dark01'>
                Tokenomics
            </h2>

            <div className='grid grid-flow-row  md:grid-flow-col md:grid-cols-3 gap-10 justify-center md:justify-between'>
                <div className=' row-start-2 md:row-start-1 flex flex-col gap-[24px]'>
                    {
                        data1.map((item,i)=>(
                            <ColoredList {...item} key={i}></ColoredList>
                        ))
                    }
                </div>

                <div className='text-center'>
                    <img src="/img/chart.png" className=' h-auto' alt="" />
                </div>

                <div className='flex flex-col gap-[24px]'>
                {
                        data2.map((item,i)=>(
                            <ColoredList {...item} key={i}></ColoredList>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Tokenomics