import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell, StyledTableRow } from '../../shared/styledComponents';
import { countriesTableRows } from '../../../constants/countriesTable';

import './index.css';

export default function CountriesTable(): JSX.Element {
  return (
     <TableContainer component={Paper}>
       <Table sx={{ minWidth: 700 }} aria-label="customized table">
         <TableHead>
           <TableRow>
             <StyledTableCell style={{ background: 'green' }}>
               ID
             </StyledTableCell>
             <StyledTableCell style={{ background: 'green' }}>
               Country (100g serving)
             </StyledTableCell>
             <StyledTableCell style={{ background: 'green' }} align="right">
               Session
             </StyledTableCell>
             <StyledTableCell style={{ background: 'green' }} align="left">
               Pageviews
             </StyledTableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {countriesTableRows?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.country}
                </StyledTableCell>
                <StyledTableCell align="right">{row.sessions}</StyledTableCell>
                <StyledTableCell align="left">{row.views}</StyledTableCell>
              </StyledTableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
  );
}
