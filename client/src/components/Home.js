import React, { useState,useEffect } from "react";
import { makeStyles,withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import ipfs from "../ipfs";
import getWeb3 from '../getWeb3'
import SimpleStorage from "../contracts/SimpleStorage.json";
import {Button ,Table,TableContainer,TableRow,TableCell,TableBody,TableHead} from "@material-ui/core";
// import { useState } from "react";
function Home(){
    const[buffer,setBuffer]= useState();
    const [currenAccount,setCurrentAccount] = useState('');
    const [store,setStore] = useState({});
    const[ipfshash,setIpfshash] = useState('');
    const[web3,setWeb3]=useState();
    const[transcationhash,setTransactionhash] = useState('');
    const[txreceipt,setTxreceipt] = useState();
    const[txhash,setTxhash]=useState('');
    const[blockNo,setBlockNo] = useState();
    const[gasUsed,setGasUsed] = useState();

    const getweb3 =async()=>{ 
        try{
        const web3 = await getWeb3();
        setWeb3(web3);
        //get accounts 
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
            //get networkid 
            const networkid = await web3.eth.net.getId();
            console.log(networkid);
            const networkdeployed = SimpleStorage.networks[networkid];
            console.log(networkdeployed);
            const instance = await new web3.eth.Contract(SimpleStorage.abi,networkdeployed && networkdeployed.address);
            console.log(instance);
            setStore({...instance});
            setCurrentAccount(accounts[0]);

    }
        catch(error){
            console.log(error)
        }

    }

    
    

    useEffect(()=>{
        getweb3();
        
    },[]);

    
    
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.info.main,
        //   color: theme.palette.common.pink,
        minWidth:40,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      //style for table
      const useStyles = makeStyles({
          table:{
              minWidth:500,
          },
      })
      const classes = useStyles();
//capture and convert file to buffer
        const handlecapture = (event)=>{
            event.preventDefault();
            //capture the userfile 
            const file = event.target.files[0];
            //Read the file
            let reader = new window.FileReader()
            reader.readAsArrayBuffer(file)
            //file is converted to a buffer to prepare for uploading to IPFS
            reader.onloadend=()=>{
                let buffer = Buffer(reader.result)
                setBuffer(buffer);
                console.log("buffer",buffer);
            }}
//Save document to IPFS
const onsubmit = async(event)=>{
    event.preventDefault();
    const ipfsHash = await ipfs.add(buffer)
        // ,(err,ipfsHash)=>{
        console.log(ipfsHash);
        console.log(ipfsHash[0].hash)
        setIpfshash(ipfsHash[0].hash);   
        await store.methods.sethash(ipfsHash[0].hash).send({from:currenAccount},(err,transcationhash)=>{
            setTransactionhash(transcationhash);
            console.log(transcationhash);
               
        });  
    // }
    

}
// const sethash = async()=>{
//     try{
//         console.log(ipfshash);
//     await store.methods.sethash(ipfshash).send({from:currenAccount});

//     }
//     catch(error){
//         console.log(error);
//     }
// }
//"QmUbGT9K4x6RpNHQaJwo3MxS6f6rMweDFhBTCMeibRyvFT"


     const getreceipt=async (event)=>{
         event.preventDefault();
         console.log(store);
     
        //  const res = await store.methods.gethash().call();
         

          await web3.eth.getTransactionReceipt(transcationhash,(err,txreceipt) =>{
             console.log(err,txreceipt);
             setTxreceipt(txreceipt);
             console.log(txreceipt.transactionHash);
             setTxhash(txreceipt.transactionHash);
             setBlockNo(txreceipt.blockNumber);
             setGasUsed(txreceipt.gasUsed);
         })
        //  console.log(res);
        //  console.log(receipt);

     } 

    return(
        <div className="home">
                            <h4> Upload file to add to IPFS</h4>

            <div className="upload">
                <form onSubmit= { onsubmit} >
                    <input type="file" onChange={handlecapture}/>
                    <button type ="submit">Submit</button>
                </form>
                <br/>
                <button  onClick={getreceipt}> Get Transaction receipt</button>

                </div>
                <div className="display">
                    <a href ={`https://ipfs.io/ipfs/${ipfshash}`}alt="" target ="_blank"> Click here to access your file</a>
                </div>
                <div className="table">
                    <h4> Transaction Receipt details</h4>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                    <TableHead>
                        <TableRow >
                            
                            <StyledTableCell>
                                IPFS Hash (stored on Eth Contract)
                            </StyledTableCell>
                            <StyledTableCell>
                                Etherum Contract Address
                            </StyledTableCell>
                            <StyledTableCell>Tx Hash </StyledTableCell>
                            <StyledTableCell>BlockNumber</StyledTableCell>
                            <StyledTableCell>Gas Used</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{ipfshash}</TableCell>
                            <TableCell>{currenAccount}</TableCell>
                            <TableCell>{txhash}</TableCell>
                            <TableCell>{blockNo}</TableCell>
                            <TableCell>{gasUsed}</TableCell>

                        </TableRow>
                    </TableBody>
                    </Table>
                </TableContainer>
                </div>

        </div>
    )
}
export default Home;