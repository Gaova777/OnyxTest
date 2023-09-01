import { useEffect, useMemo, useState } from "react";
import PageWrapper from "../Components/PageWrapper";
import {
  Alert,
  Box,
  Button,
  Container,
 
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
 
  Grid,
  Tab,
  Snackbar,
  Tabs,
  TextField,
  Typography,
  alpha,
  IconButton,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useParams } from "react-router-dom";
import BookService from "../Services/profit.service";
import { useFinalContext } from "../Context/FinalContext";
import {  Delete, Edit } from "@mui/icons-material";

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
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      role="tabpanel"
      width="100%"
      height="100%"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
        >
          {children}
        </Box>
      )}
    </Box>
  );
}
function CustomTablePanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      role="tabpanel"
      width="100%"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
          gap={2}
          padding={2}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

function Home() {
  const [currentTab, setCurrentTab] = useState(0);
  const [showModal, setShowModal] = useState(null);
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState({
    title: "",
  });
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    status: "success",
  });
  const [dataBook, setDataBook] = useState({
    title: "",
    year: "",
    genre: "",
  });
  const [dataBookQuery, setDataBookQuery] = useState([]);
  const { modalCheck, setModalCheck, Id, setId } = useFinalContext();

  const $BookService = useMemo(() => new BookService(), []);
  const onCreateBook = async (event) => {
    event.preventDefault();

    const { status, data } = await $BookService.add({
      body: {
        title: dataBook.title,
        year: dataBook.year,
        genre: dataBook.genre,
      },
    });

    console.log(data);

    if (status) {
      setFeedback({
        show: true,
        status: "success",
        message: "Lapso creado con éxito.",
      });
      setShowModal(null);
      clearFields("databook");
      // Add to the list
    } else {
      setFeedback({
        show: true,
        status: "error",
        message: "Error al crear lapso.",
      });
    }
  };

  const onUpdateBook = async () => {
  
    const { status, data } = await $BookService.update({
      id: Id,
      body: {
        title: dataBook.title,
        year: dataBook.year,
        genre: dataBook.genre,
      },
    });
    console.log(data);

    if (status) {
      setFeedback({
        show: true,
        status: "success",
        message: "Lapso actualizado con éxito.",
      });
      setModalCheck(false);
      clearFields("databook");
      // Add to the list
    } else {
      setFeedback({
        show: true,
        status: "error",
        message: "Error al actualizar lapso.",
      });
    }
  };
  const onDeleteBook = async () => {
    const { status } = await $BookService.delete({ id: Id });

    if (status) {
      setFeedback({
        show: true,
        status: "success",
        message: "Rentabilidad eliminada con éxito.",
      });
      setData((prev) => prev.filter((e) => e.id !== Id));
      clearFields("dataBook");
      setShowModal(null);
      setId(null);
    } else {
      setFeedback({
        show: true,
        status: "error",
        message: "Error al eliminar la rentabilidad.",
      });
    }
  };

  const onFindBook = async () => {
 
    const { status, data } = await $BookService.query({
      title: dataSearch.title,
    });

    if (status) {
      setDataBookQuery(data);
    
      // Add to the list
    } else {
      setFeedback({
        show: true,
        status: "error",
        message: "No se encontro ninguno",
      });
    }
  };
  const clearFields = (target) => {
    if (target === "databook") {
      setDataBook({
        title: "",
        year: "",
        genre: "",
      });
    } else if (target === "dataSearch"){
     setDataSearch({
      title:""
     })
     setDataBookQuery([])
    }
  };

  useEffect(() => {
    (async () => {
      const { status, data } = await $BookService.get();
      if (status) {
        setData(data);
      }
    })();
  }, [data]);
  return (
    <PageWrapper>
      <Grid
        display="flex"
        flexDirection="column"
        width="100%"
        height="100%"
        gap={2}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          <Tabs
            value={currentTab}
            onChange={(event, newValue) => {
              setCurrentTab(newValue);
            }}
          >
            <Tab label="Search Book" />
            <Tab label="Table Book" />
          </Tabs>
        </Box>
        <Container disableGutters>
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
          >
            <CustomTabPanel value={currentTab} index={0}>
              <Grid
                display="flex"
                flexDirection="column"
                justifyContent="center"
                width="80%"
                gap={2}
              >
                <Typography
                  color="primary"
                  textAlign="center"
                  sx={{ fontSize: 30, fontWeight: 600 }}
                >
                  Find any Book
                </Typography>
                <Typography color="primary" textAlign="center">
                  This is my app about CRUD of Books Store
                </Typography>
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <TextField
                    placeholder="Type a title of a Book"
                    type="text"
                    value={dataSearch.title}
                    onChange={(event) =>
                      setDataSearch((prev) => ({
                        ...prev,
                        title: event.target.value,
                      }))
                    }
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    onClick={()=>{
                      onFindBook()
                      setShowModal('search-book')
                    }}
                    sx={{ width: "20%" }}
                  >
                    Find
                  </Button>
                </Grid>
              </Grid>
            </CustomTabPanel>
          </Grid>
        </Container>

        <CustomTablePanel value={currentTab} index={1}>
          <Grid display="flex" justifyContent="flex-end" width="100%">
            <Button
              variant="contained"
              onClick={() => setShowModal("create-book")}
            >
              Crear
            </Button>
          </Grid>

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
                    <StyledTableCell align="center">
                      {row.genre}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.year}</StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        size="large"
                        color="primary"
                        sx={(t) => ({
                          borderRadius: 1,
                          backgroundColor: alpha(t.palette.primary.main, 0.1),
                        })}
                        onClick={() => {
                          setModalCheck(true);
                          setId(row.id);
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
                        onClick={() => {
                          setShowModal("delete-book");
                          setId(row.id);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTablePanel>
      </Grid>
      <Dialog
        maxWidth="sm"
        open={showModal === "create-book"}
        onClose={() => {
          setShowModal(null);
        }}
        fullWidth
      >
        <DialogTitle>Creación de Libro</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            paddingY={1}
            component="form"
            onSubmit={onCreateBook}
          >
            <Grid
              display="flex"
              gap={2}
              sx={(t) => ({
                [t.breakpoints.down("md")]: {
                  flexDirection: "column",
                },
              })}
            >
              <TextField
                label="Titulo"
                type="text"
                value={dataBook.title}
                onChange={(event) =>
                  setDataBook((prev) => ({
                    ...prev,
                    title: event.target.value,
                  }))
                }
              />
              <TextField
                label="Genero"
                type="text"
                value={dataBook.genre}
                onChange={(event) =>
                  setDataBook((prev) => ({
                    ...prev,
                    genre: event.target.value,
                  }))
                }
              />
              <TextField
                label="Año"
                type="text"
                value={dataBook.year}
                onChange={(event) =>
                  setDataBook((prev) => ({
                    ...prev,
                    year: event.target.value,
                  }))
                }
              />
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setShowModal(null);
            }}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={onCreateBook}>
            Crear
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        maxWidth="sm"
        open={modalCheck == true}
        onClose={() => {
          setModalCheck(false);
        }}
        fullWidth
      >
        <DialogTitle>Actualizaciòn del Libro</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            paddingY={1}
            component="form"
            onSubmit={onUpdateBook}
          >
            <Grid
              display="flex"
              gap={2}
              sx={(t) => ({
                [t.breakpoints.down("md")]: {
                  flexDirection: "column",
                },
              })}
            >
              <TextField
                label="Titulo"
                type="text"
                value={dataBook.title}
                onChange={(event) =>
                  setDataBook((prev) => ({
                    ...prev,
                    title: event.target.value,
                  }))
                }
              />
              <TextField
                label="Genero"
                type="text"
                value={dataBook.genre}
                onChange={(event) =>
                  setDataBook((prev) => ({
                    ...prev,
                    genre: event.target.value,
                  }))
                }
              />
              <TextField
                label="Año"
                type="text"
                value={dataBook.year}
                onChange={(event) =>
                  setDataBook((prev) => ({
                    ...prev,
                    year: event.target.value,
                  }))
                }
              />
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setId(null);
              setModalCheck(false);
            }}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={onUpdateBook}>
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="sm"
        open={showModal === "delete-book"}
        onClose={() => {
          clearFields("databook");
          setShowModal(null);
          setId(null);
        }}
        fullWidth
      >
        <DialogTitle>Eliminar Libro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que quieres eliminar este libro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              clearFields("Profit");
              setShowModal(null);
            }}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={onDeleteBook}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        maxWidth="sm"
        open={showModal === "search-book"}
        onClose={() => {
          clearFields("dataSearch");
          setShowModal(null);
         
        }}
        fullWidth
      >
        <DialogTitle>Datos de Libro</DialogTitle>
        <DialogContent>
          {dataBookQuery?.map((e) => (
            <>
              <Typography>{e.title}</Typography>
              <Typography>{e.genre}</Typography>
              <Typography>{e.year}</Typography>
            </>
          ))}
        </DialogContent>
        <DialogActions>
          
          <Button variant="contained" onClick={() => {
              clearFields("dataSearch");
              setShowModal(null);
            }}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={feedback.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() =>
          setFeedback((prev) => ({
            show: false,
            message: prev.message,
            status: prev.status,
          }))
        }
      >
        <Alert severity={feedback.status} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </PageWrapper>
  );
}

export default Home;
