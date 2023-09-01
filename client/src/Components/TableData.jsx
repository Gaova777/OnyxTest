import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BookService from "../Services/profit.service";
import { ContentCopy, GppGood, Share, Delete, Edit } from "@mui/icons-material";
import { IconButton, alpha } from "@mui/material";
import { useFinalContext } from "../Context/FinalContext";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [data, setData] = useState([]);
  const {setId, setModalCheck} = useFinalContext()
  const $BookService = useMemo(() => new BookService(), []);

  useEffect(() => {
    (async () => {
      const { status, data } = await $BookService.get();
      if (status) {
        setData(data);
      }
    })();
  }, []);

  console.log(data);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Genre</StyledTableCell>
            <StyledTableCell align="center">Year</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.title}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="center">{row.genre}</StyledTableCell>
              <StyledTableCell align="center">{row.year}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  size="large"
                  color="primary"
                  sx={(t) => ({
                    borderRadius: 1,
                    backgroundColor: alpha(t.palette.primary.main, 0.1),
                  })}
                  onClick={()=>{
                    setModalCheck(true)
                    setId(row.id)
                  }}
                >
                  <Edit />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="center">
                {" "}
                <IconButton
                  size="large"
                  color="primary"
                  sx={(t) => ({
                    borderRadius: 1,
                    backgroundColor: alpha(t.palette.primary.main, 0.1),
                  })}
                >
                  <Delete />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
