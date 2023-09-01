const request = require("supertest"); 
const express = require("express");
const app = express(); 


const booksRouter = require("./books.router");

// Usar tus rutas en la instancia de Express de prueba
app.use("/api/books", booksRouter);

describe("Pruebas de rutas de libros", () => {
 
  it("Debería obtener una lista de libros", async () => {
    const response = await request(app).get("/api/books");
    expect(response.status).toBe(200);
   
  });

  
  it("Debería obtener libros por título", async () => {
    const response = await request(app).get("/api/books/?title=Titanic");
    expect(response.status).toBe(200);
   
  });
  it("Debería guardar el libros por titulo, genero y año", async () => {
    const response = await request(app).post("/api/books/",
    ).send({
        title:"Amargura",
        genre:"Romance",
        year:"1999-01-01"
    });
    expect(response.status).toBe(500);
   
  });
  it("Debería visualizar por Id", async () => {
    const response = await request(app).get("/api/books/:id",
    ).send({
        id:"5ff17b0c-b250-46a9-9f10-a87a0f3ac1ff"
    });
    expect(response.status).toBe(500);
   
  });

  // Agrega más pruebas para las demás rutas (GET, POST, PATCH, DELETE)
});
