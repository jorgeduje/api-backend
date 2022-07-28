const express = require("express");
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json());

let notas = [
  {
    id: 1,
    content: "algo iria aca",
    important: true,
  },
  {
    id: 2,
    content: "algo aca",
    important: false,
  },
  {
    id: 3,
    content: "algo ssss",
    important: true,
  },
];


app.get("/", (request, response) => {
  response.send("<h1>Hola Jorge</h1>");
});
app.get("/api/notas", (request, response) => {
  response.json(notas);
});
app.get("/api/notas/:id", (request, response) => {
  const id = Number(request.params.id);
  const nota = notas.find((nota) => nota.id === id);
  response.json(nota);
});

app.delete("/api/notas/:id", (request, response) => {
  const id = Number(request.params.id);
  notas = notas.filter((nota) => nota.id !== id);
  response.status(204).end();
});

app.post("/api/notas", (request, response) => {
  const nota = request.body;

  if(!nota.content){

    return response.status(400).json({
      error: "nota.content is missing"
    })

  }

  const ids = notas.map( nota => nota.id)
  const maxId = Math.max(...ids)
  const nuevaNota = {
    id: maxId + 1,
    content: nota.content,
    important: typeof nota.important !== "undefined" ?  nota.important : false
  }

  notas = [...notas, nuevaNota]
  response.json(nuevaNota)
});

app.use( (request, response)=>{
  response.status(404).json({
    error:"Not found"
  })
} )


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});