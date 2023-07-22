import { CogIcon, SwitchVerticalIcon } from '@heroicons/react/outline'
import Countdown from 'react-countdown'
import toast from "react-hot-toast"
import { ethers, BigNumber } from "ethers";
import axios from "axios"
import { useEffect, useState } from 'react'
import Slider from '@material-ui/core/Slider';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import { formatEther, parseEther } from '@ethersproject/units'
import Abi from "./abi.json"
import Modal from 'react-modal';

import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../connectors";
import { toHex, truncateAddress } from "../../utils";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const marks = [
  {
    value: 0.1,
    label: '0.1',
  },
  {
    value: 0.2,
    label: '0.2',
  },
  {
    value: 0.4,
    label: '0.4',
  },
  {
    value: 0.6,
    label: '0.6',
  },
  {
    value: 0.8,
    label: '0.8',
  },
  {
    value: 1,
    label: '1',
  },
];

const customStyles = {
  content: {
    width: '400px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#191b1f',
    color: 'white',
    borderRadius: '12px'
  },
};

function valuetext(value) {
  return `${value} ETH`;
}

Modal.setAppElement('#root');

const HomeSection = () => {
  const [ modalIsOpen, setIsOpen ] = useState(false);
  const [ time, setTime ] = useState(Date.now())
  const [ value, setValue ] = useState("0.1")
  const [balances, setBalances] = useState<Number | undefined>()
  const [tokenAddress, setTokenAddress] = useState("");
  const [availableForSale, setAvailableForSale] = useState("0");
  const [price, setPrice] = useState("0");
  const [closingTime, setClosingTime] = useState("0");
  const [amount, setAmount] = useState(1);

  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    connector,
  } = useWeb3React();
  const [error, setError] = useState("");
  
  const network = 1
  useEffect(() => {
    if (account) {
      library?.getBalance(account).then((result)=>{
        setBalances(parseFloat(formatEther(BigNumber.from(result))))
      })

      
    } else {
      // toast('Please connect the wallet!', {
      //   icon: '⚠️',
      // });
    }
  }, [account, library])
  const fetchCrowdsaleTokenInfo = () => {
    
    const provider = new ethers.providers.InfuraProvider("mainnet")
    const contract = new ethers.Contract(
      process.env.REACT_APP_ICO_ADDRESS,
      Abi.abi,
      provider
    );
    contract.token().then(setTokenAddress).catch(console.log);
    contract
      .weiRaised()
      .then((total) => setAvailableForSale(formatEther(BigNumber.from(total))))
      .catch(console.log);
    contract
      .rate()
      .then((rate) => setPrice(BigNumber.from(rate).toString()))
      .catch(console.log);
    contract
      .closingTime()
      .then((time) => setClosingTime(BigNumber.from(time).toString()))
      .catch(console.log);
  };
  const buyTokens = async () => {
    if (account) { 
      if(parseFloat(value) >= 0.1 && parseFloat(value) <= 1) 
        {
          try {
            const signer = library.getSigner();
            const txPrams = {
              to: process.env.REACT_APP_ICO_ADDRESS,
              value: ethers.BigNumber.from(parseEther(value)),
              gasLimit: 5000000,
            };
            const transaction = await signer.sendTransaction(txPrams);
            toast.promise(transaction.wait(), {
              loading: `Transaction submitted. Wait for confirmation...`,
              success: <b>Transaction confirmed!</b>,
              error: <b>Transaction failed!.</b>,
            });
      
            // refetch total token after processing
            transaction
              .wait()
              .then(() => fetchCrowdsaleTokenInfo())
              .catch(console.log);
          } catch (error) {
            console.log(error);
          }
        } else {
          toast('Please input under 1 ETH && over 0.1 ETH', {
            icon: '⚠️',
          });
      }
    } else {
      setIsOpen(true)
    }
  }

     
 

  useEffect(() => {
    try {
      fetchCrowdsaleTokenInfo();
    } catch (error) {
      console.log(error);
    }
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
  }, [])

  function closeModal() {
    setIsOpen(false);
  }
  const copy = (value: any) => {
		navigator.clipboard.writeText(value);
		toast.success("Copied!");
	};

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };
  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };
  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      console.log(switchError)
      // if (switchError.code === 4902) {
      //   try {
      //     await library.provider.request({
      //       method: "wallet_addEthereumChain",
      //       params: [networkParams[toHex(network)]]
      //     });
      //   } catch (error) {
      //     setError(error);
      //   }
      // }
    }
  };
  const selectWallet = (key: Number) => {
    switch(key) {
      case 0: {
        activate(connectors.injected)
        setProvider("injected");
        closeModal();
        break;
      }
      case 1: {
        activate(connectors.walletConnect);
        setProvider("walletConnect");
        closeModal();
        break;
      }
      case 2: {
        activate(connectors.coinbaseWallet);
        setProvider("coinbaseWallet");
        closeModal();
      }
    }
  }
  useEffect( () => {
    if(library && chainId !== network ) {
      switchNetwork()
    }
  }, [library])
  
  return (
    <div className=' min-h-screen min-w-full bg-no-repeat bgx'
      // style={{'back'}}
      // bg-gradient-to-r from-primary-700 to-primary-300
    >
      {/* home title and sub title */}
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={customStyles}
      >
          <h2 className='text-center text-2xl font-bold mb-2'>Connect Wallet</h2>
          <div className='flex flex-col'>
              <button className='walletButton' onClick={() => selectWallet(0)}>
                  <span>MetaMask</span>
                  <img src="/img/icons/metamask.png" width={24}/>
              </button>
              <button className='walletButton' onClick={() =>  selectWallet(1)}>
                  <span>WalletConnect</span>
                  <img src="/img/icons/walletConnectIcon.svg" />
              </button>
              <button className='walletButton' onClick={() => selectWallet(2)}>
                  <span>Coinbase Wallet</span>
                  <img src="/img/icons/coinbaseWalletIcon.svg" />
              </button>
          </div>
      </Modal>
      <div className="wallet">
        {
            active? 
            <div className="dropdown">
                {/* <button className="dropbtn">
                    <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
                </button> */}
                <button className="dropbtn">
                {balances? `${balances.toFixed(1)} ETH ` : '0 ETH'} | {truncateAddress(account)}
                </button>
                <div className="dropdown-content">
                    <button onClick={() => copy(account)}>Copy Address</button>
                    <a href={`https://etherscan.io/address/${account}`} target="_blank"><button>View on Explorer<img src="/img/icons/arrow.svg" width={20} /></button></a>
                    <button  onClick={disconnect}>
                        Disconnect
                    </button>
                </div>
            </div>
          : 
          <button className='bg-transparent border-2 border-white rounded-[6px] text-[14px] py-[5px] w-fit h-fit px-[20px] text-white' onClick={() => setIsOpen(true)}>Connect Wallet</button>
        }
      </div>
      <div className="grid pt-[99px] md:pt-[175px] grid-flow-row md:grid-flow-col grid-rows-1 md:grid-cols-2 mx-6 md:mx-[80px] lg:mx-[150px] py-[95px] gap-16 md:gap-24">
        <div className='text-white '>
          <h2 className='text-[50px] font-medium leading-[60px]'>Welcome to the future of enviromental impact!</h2>
          <h2 className='text-[20px] font-regular leading-[28px] mt-[32px]'>FRESH AIR COIN. An ERC20 sustainability token to invest in reversing damage causes by climate change. With your help and investment together, we can save the world. </h2>
          <Countdown date={1659312000000} renderer={({ days, hours, minutes, seconds }) => {
            return <div className='flex mt-[50px] '>

              <div className='rounded-[5px] px-[15px] py-[8px] text-dark01 bg-white text-center w-fit'>
                <p className='font-bold text-[22px]'>{days}</p>
                <p className='font-medium text-[12px]'>Days</p>
              </div>

              <div className="w-fit text-white px-[6px] font-bold text-[32px] self-center">
                :
              </div>

              <div className='rounded-[5px] px-[15px] py-[8px] text-dark01 bg-white text-center w-min'>
                <p className='font-bold text-[22px]'>{hours}</p>
                <p className='font-medium text-[12px]'>Hours</p>
              </div>

              <div className="w-min text-white px-[6px] font-bold text-[32px] self-center">
                :
              </div>

              <div className='rounded-[5px] px-[15px] py-[8px] text-dark01 bg-white text-center w-min'>
                <p className='font-bold text-[22px]'>{minutes}</p>
                <p className='font-medium text-[12px]'>Minutes</p>
              </div>

              <div className="w-min text-white px-[6px] font-bold text-[32px] self-center">
                :
              </div>

              <div className='rounded-[5px] px-[15px] py-[8px] text-dark01 bg-white text-center w-min'>
                <p className='font-bold text-[22px]'>{seconds}</p>
                <p className='font-medium text-[12px]'>Seconds</p>
              </div>


            </div>
          }}></Countdown>
          <p className='text-white font-medium text-[18px] py-[12px]'> Token Sale will be ended Jul 31, 2022</p>
        </div>

        {/* coinswapper */}
        <div className='bg-white rounded-[20px] py-[26px] px-[20px] h-fit shadow-sh1'>
          <div className="flex justify-between">
            <h5 className='text-[20px] font-semibold text-dark01'>Freshaircoin</h5>
            <div className=' p-2 rounded-[12px] bg-dark01'>
              <CogIcon className=' h-6 w-6 text-white'></CogIcon>

            </div>
          </div>
          <div className='h-[1px] bg-gray01  my-4'></div>

          <div className="flex justify-between pb-2">
            <h5 className='text-[14px] font-medium text-dark01'>From</h5>
            <h5 className='text-[14px] font-medium text-dark01'>Available: {balances? `${balances.toFixed(4)} ETH ` : 0} ETH</h5>
          </div>

          <div className="border-[1px] h-14  border-gray01 rounded-xl flex relative ali items-center mb-3" >
            <input type="number" className='rounded-xl h-full w-full py-2 px-4 font-bold text-xl text-gray02' value={value ? value : "0"} onChange={(e) => setValue(e.target.value)} />
            <img src='/img/icons/Eth.png' width={24} height={24} /><span  className="mx-2" >ETH</span>
          </div>

          <Slider
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            step={0.01}
            min={0.1}
            value={parseFloat(value)}
            max={1}
            onChange={(event, newValue) => setValue(newValue.toString())}
            valueLabelDisplay="auto"
            marks={marks}
          />

          <div className='pb-3 flex gap-3 items-center'>
            <div className='h-[1px] w-full bg-gray01  my-4'></div>
            <div className=' rounded-full bg-primary-500 p-2 w-min'>
              <SwitchVerticalIcon className='h-6 w-6 text-white'></SwitchVerticalIcon>
            </div>
            <div className='h-[1px] w-full bg-gray01  my-4'></div>
          </div>


          <div className="border-[1px] h-14  border-gray01 rounded-xl flex relative items-center">
            <input type="text" className='rounded-xl h-full w-full py-2 px-4 font-bold text-xl text-gray02'  value={parseFloat(value? value : "0") * 50000 } onChange={(e) => setValue((parseFloat(e.target.value? e.target.value : "0") / 50000).toFixed(6))}/>
            <img src='/img/icons/FAC.png' width={28} height={28} /><span  className="mx-2" >FAC</span>
          </div>
          
          <div className='flex justify-between mt-[10px]'>
            <p className='text-gray02 text-sm font-medium'>Price:</p>
            <p className='text-dark01 text-sm font-semibold'>0.00002 ETH</p>
          </div>
          <div className='flex justify-between mt-1'>
            <p className='text-gray02 text-sm font-medium'>Current Sales:</p>
            <p className='text-dark01 text-sm font-semibold'>{availableForSale} / 1200 ETH</p>
          </div>

          <BorderLinearProgress variant="determinate" value={parseFloat(availableForSale) / 1200 * 1000} />

          <button className='mt-5 mx-3 mb-2 py-3 max-w-full w-[calc(100%-24px)] text-center text-white font-semibold text-sm bg-gradient-to-r from-primary-500 to-primary-300 shadow-blockbtn shadow-primary-700 rounded-[10px]' onClick={() => buyTokens()}>{ account? "Buy TOKEN" : "Connnect Wallet"}</button>
        </div>

      </div>
    </div>
  )
}

export default HomeSection