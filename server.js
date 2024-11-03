import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  try {
    const file = path.join(__dirname, "form.html");
    res.sendFile(file);
  } catch (err) {
    console.error(err, "errro");
    res.status(200).send("Internal Server Error");
  }
});

app.post("/save", (req, res) => {
  try {
    const data = req.body;
    const html = `
    <h1>Dados Processados:</h1>
         <p><span>Nome:</span> ${data.nome}</p>
          <p><span>Email:</span> ${data.email}</p>
          <p><span>Senha:</span> ${data.senha}</p>
          <p><span>Data de Nascimento:</span> ${data["data-nascimento"]}</p>
          <p><span>Gênero:</span> ${data.genero}</p>
          <p><span>Aceitou Termos:</span> ${
            data.termos === "on" ? "Sim" : "Não"
          }</p>
    `;
    res.status(200).send(html);
  } catch (err) {
    console.error(err, "errro");
    res.status(200).send("Internal Server Error");
  }
});

app.listen(port, function (err) {
  if (err) console.error(err);
  console.log(`Servidor rodando em http://localhost:${port}`);
});
