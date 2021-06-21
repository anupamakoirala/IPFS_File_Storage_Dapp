import React, { useState } from "react";
import { makeStyles,withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import ipfs from "../ipfs";
import {Button ,Table,TableContainer,TableRow,TableCell,TableBody,TableHead} from "@material-ui/core";
// import { useState } from "react";
function Home(){
    const[buffer,setBuffer]= useState();
    const[ipfshash,setIpfs] = useState();
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
              minWidth:400,
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
    await ipfs.add(buffer,(err,ipfsHash)=>{
        console.log(ipfsHash)
        setIpfs(ipfsHash); 
    })
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
                <button > Get Transaction receipt</button>

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
                            <TableCell>hh</TableCell>
                            <TableCell>hh</TableCell>
                            <TableCell>hh</TableCell>
                            <TableCell>hh</TableCell>
                            <TableCell>hh</TableCell>

                        </TableRow>
                    </TableBody>
                    </Table>
                </TableContainer>
                </div>

        </div>
    )
}
export default Home;