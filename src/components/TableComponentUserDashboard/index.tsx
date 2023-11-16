import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import editIcon from "../../assets/images/admin/editIcon.svg";
import deleteIcon from "../../assets/images/admin/deleteIcon.svg";
import plus from "../../assets/images/admin/plus-circle.svg";
import Progress from "../shared/Progress";
import { PropsTypes } from "./types";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import "./index.css";
import { useEffect } from "react";

const rowItems: number[] = [5, 10, 15, 20, 25];

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "green",
    color: "white",
    marginBottom: "10px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    margin: "20px 0 !important",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableComponent({
  tableName,
  items,
  columns,
  setShowModal,
  handelEdit,
  setDelUserEmail,
  show,
  totalPages,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
}: PropsTypes) {
  const navigate = useNavigate();
  const pageNumbers =
    totalPages ?? Math.ceil(items?.length / (rowsPerPage ?? 0));

  const handleChange = (event: SelectChangeEvent) => {
    setRowsPerPage?.(event.target.value as unknown as number);
  };

  useEffect(()=>{
    if(currentPage && setCurrentPage && pageNumbers < currentPage && pageNumbers != 0){
      setCurrentPage(pageNumbers)
    }
  },[pageNumbers, currentPage])
  

  return (
    <div className="tableWrapper">
      <Paper>
        {show && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span
              style={{ textAlign: "left", fontSize: "16px", fontWeight: 600 }}
            >
              {tableName}
            </span>
            <span
              className="addAdminStyles"
              onClick={(): void => {
                tableName === "Contracts"
                  ? handelEdit && handelEdit(true)
                  : setShowModal && setShowModal(true);
              }}
            >
              <Box
                component="img"
                sx={{
                  cursor: "pointer",
                  marginRight: "10px",
                  height: 20,
                  width: 20,
                  maxHeight: { xs: 17, md: 17 },
                  maxWidth: { xs: 17, md: 17 },
                  borderRadius: 20,
                }}
                alt="search icon."
                src={plus}
              />
              Add
            </span>
          </div>
        )}
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                  {show && (
                    <StyledTableCell style={{ minWidth: 100, color: "#fff" }}>
                      Actions
                    </StyledTableCell>
                  )}
                  {columns.map((column: any) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, color: "#fff" }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {!items ? (
                  <Progress className="loadingUserTable" size={24} />
                ) : !items?.length
                  ? <Box className="loadingUserTable" mt={2}>EMPTY CONTENT</Box>
                  : (
                    items?.length && items?.map((row: Record<string, any>) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {show && (
                          <StyledTableCell align="left" sx={{ color: "green" }}>
                            <Box
                              onClick={() => {
                                handelEdit && handelEdit(row);
                              }}
                              component="img"
                              sx={{
                                cursor: "pointer",
                                marginRight: "10px",
                                height: 50,
                                width: 50,
                                maxHeight: { xs: 25, md: 25 },
                                maxWidth: { xs: 25, md: 25 },
                              }}
                              alt="The house from the offer."
                              src={editIcon}
                            />
                            <Box
                              onClick={() => {
                                setDelUserEmail && setDelUserEmail(row.id);
                              }}
                              component="img"
                              sx={{
                                cursor: "pointer",
                                height: 50,
                                width: 50,
                                maxHeight: { xs: 25, md: 25 },
                                maxWidth: { xs: 25, md: 25 },
                              }}
                              alt="The house from the offer."
                              src={deleteIcon}
                            />
                          </StyledTableCell>
                        )}
                        {columns.map((column: any) => {
                          const value = column?.subId ? (Number(row[column.id]) + Number(row[column.subId])).toFixed(8) : row[column.id];
                          return (
                            <StyledTableCell
                              onClick={() => {
                                if (tableName === "Contracts")
                                  navigate(`/admin/contract/${row.id}`);
                              }}
                              key={column.id}
                              align="left"
                              style={{
                                cursor: `${tableName === "Contracts" ? "pointer" : ""
                                  } `,
                                color: `${column.color ? column.color : "#8F8E92"
                                  }`,
                              }}
                            >
                              {column.format
                                ? column.format(value)
                                : value
                                  ? value
                                  : "-"}
                            </StyledTableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="pagination">
            <span className="info">
              Showing {currentPage}-{pageNumbers} of {items?.length ?? 0} results
            </span>
            <Pagination
              siblingCount={0}
              boundaryCount={0}
              count={pageNumbers}
              page={currentPage}
              onChange={(_, num) => setCurrentPage?.(num)}
            />
            <Box sx={{ minWidth: 120 }}>
              <Typography className="showing">Showing: </Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={`${rowsPerPage}`}
                  label="Age"
                  onChange={handleChange}
                  IconComponent={KeyboardArrowDownIcon}
                >
                  {rowItems.map((rowItem: number) => (
                    <MenuItem value={rowItem} key={rowItem}>
                      {rowItem}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </Box>
      </Paper>
    </div>
  );
}

export default TableComponent;
