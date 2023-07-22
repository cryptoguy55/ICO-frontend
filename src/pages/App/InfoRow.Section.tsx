
const InfoRow = () => {

    const Card = ({ title, body }: { title: string, body: any }) => (
        <div className=' rounded-[10px] shadow-sh1 '>
            <div className=' rounded-t-[10px] w-full py-[22px] px-auto text-white bg-primary-700 font-semibold text-2xl text-center' >
                {title}
            </div>
            {body}
        </div>
    )

    return (
        <div className=' my-[120px] mx-6 md:mx-[120px] grid grid-flow-row md:grid-flow-col md:grid-cols-2 md:grid-rows-2 lg:grid-rows-1 justify-center lg:grid-cols-3 gap-7'>
            <Card title='ICO Allocation' body={
                <div className='px-[18px]  grid grid-flow-row last:mb-8'>
                    <div className='flex justify-between border-b-2 border-b-gray01 py-[16px]'>
                        <p className='text-[16px] text-gray03 font-medium' >Soft Cap</p>
                        <p className='text-[16px] font-semibold text-dark01 text-right'>1000 ETH</p>
                    </div>
                    <div className='flex justify-between border-b-2 border-b-gray01 py-[16px]'>
                        <p className='text-[16px] text-gray03 font-medium' >Fundraising Goal</p>
                        <p className='text-[16px] font-semibold text-dark01 text-right'>1200 ETH</p>
                    </div>
                    <div className='flex justify-between border-b-2 border-b-gray01 py-[16px]'>
                        <p className='text-[16px] text-gray03 font-medium' >Listing on DEX</p>
                        <p className='text-[16px] font-semibold text-dark01 text-right'>2 Weeks after Presale</p>
                    </div>
                    <div className='flex justify-between border-b-2 border-b-gray01 py-[16px]'>
                        <p className='text-[16px] text-gray03 font-medium' >Price On DEX</p>
                        <p className='text-[16px] font-semibold text-dark01 text-right'>1 ETH = 40000 FAC</p>
                    </div>
                </div>
            }></Card>
             <Card title='ICO Information' body={
                <div className='px-[18px]  grid grid-flow-row last:mb-8'>
                <div className='flex justify-between border-b-2 border-b-gray01 py-[16px]'>
                    <p className='text-[16px] text-gray03 font-medium' >Start Date </p>
                    <p className='text-[16px] font-semibold text-dark01 text-right'>15/07/2022 00:00:00 (UTC)</p>
                </div>
                <div className='flex justify-between border-b-2 border-b-gray01 py-[16px]'>
                    <p className='text-[16px] text-gray03 font-medium' >End Date</p>
                    <p className='text-[16px] font-semibold text-dark01 text-right'>01/08/2022 00:00:00 (UTC)</p>
                </div>
                <div className='flex justify-between border-b-2 border-b-gray01 py-[16px]'>
                    <p className='text-[16px] text-gray03 font-medium' >Presale Rate</p>
                    <p className='text-[16px] font-semibold text-dark01 text-right'>1 ETH = 50000 FAC</p>
                </div>
                <div className='flex justify-between border-b-2 border-b-gray01 py-[16px]'>
                    <p className='text-[16px] text-gray03 font-medium' >Personal Cap</p>
                    <p className='text-[16px] font-semibold text-dark01 text-right'>0.1ETH ~ 1 ETH </p>
                </div>
            </div>
            }></Card>
             <Card title='Token Information' body={
               
               <div className='px-[18px]  grid grid-flow-row last:mb-8 '>
               <div className='flex justify-between border-b-2 border-b-gray01 py-[16px]'>
                   <p className='text-[16px] text-gray03 font-medium' >Token Contract</p>
                   <p className='text-[16px] font-semibold text-dark01 text-right flex'>0x64..93 &nbsp;<a href="https://etherscan.io/address/0x64237094A0D6c10c816Ccfe6c55e6B391CA85693" target="_blank"><img src="/img/icons/arrow.svg" width={20} /></a></p>
               </div>
               <div className='flex justify-between border-b-2 border-b-gray01 py-[16px]'>
                   <p className='text-[16px] text-gray03 font-medium' >Presale Contract</p>
                   <p className='text-[16px] font-semibold text-dark01 text-right flex'>0x5d..8b &nbsp;<a href="https://etherscan.io/address/0x5d76a4fEe868579B4FA33DAdf11d4BC1dBdB3E8b" target="_blank"><img src="/img/icons/arrow.svg" width={20} /></a></p>
               </div>
               <div className='flex justify-between border-b-2 border-b-gray01 py-[16px]'>
                   <p className='text-[16px] text-gray03 font-medium' >Total Supply</p>
                   <p className='text-[16px] font-semibold text-dark01 text-right'>1 Billion FAC</p>
               </div>
               <div className='flex justify-between border-b-2 border-b-gray01 py-[16px]'>
                   <p className='text-[16px] text-gray03 font-medium' >Tokens For Presale</p>
                   <p className='text-[16px] font-semibold text-dark01 text-right'>60,000,000 FAC</p>
               </div>
           </div>
            }></Card>
        </div>
    )
}

export default InfoRow