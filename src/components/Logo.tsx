
const Logo = ({darkmode=false}) => {
  return (
    <img src={darkmode?'/img/logo2.png':"/img/logo.png"} className='w-[183px] h-[45px]' alt="logo" />
  )
}

export default Logo