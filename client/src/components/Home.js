import React from "react";
import { makeStyles,withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import {Button ,Table,TableContainer,TableRow,TableCell,TableBody,TableHead} from "@material-ui/core";
function Home(){
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
      const useStyles = makeStyles({
          table:{
              minWidth:400,
          },
      })
      const classes = useStyles();

    return(
        <div className="home">
                            <h4> Upload file to add to IPFS</h4>

            <div className="upload">
                <form>
                    <input type="file"/>
                    <button bsStyle="primary" type ="submit"
 >Submit</button>
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