import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
  return (
      <>
        <Toaster />
        <Nav absolute></Nav>
        {/* <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaMaskCard />
        <WalletConnectCard />
        <CoinbaseWalletCard />
        <NetworkCard />
        <GnosisSafeCard />
      </div> */}
        {children}
        <Footer></Footer>
    </>
  )
}

export default Layout