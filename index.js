import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

const html2 = `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cadastro de Usuário</title>
    <style>
      /* Reset básico */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      /* Estilos gerais */
      body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

      .container {
        background-color: #ffffff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      }

      h2 {
        color: #333333;
        font-size: 1.8rem;
        margin-bottom: 1rem;
        text-align: center;
      }

      .form-group {
        margin-bottom: 1.2rem;
      }

      label {
        display: block;
        font-size: 0.9rem;
        color: #555;
        margin-bottom: 0.5rem;
      }

      input[type="text"],
      input[type="email"],
      input[type="password"],
      input[type="date"] {
        width: 100%;
        padding: 0.8rem;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        outline: none;
        transition: border-color 0.3s;
      }

      input[type="text"]:focus,
      input[type="email"]:focus,
      input[type="password"]:focus,
      input[type="date"]:focus {
        border-color: #007bff;
      }

      .gender-group,
      .terms-group {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .btn-submit {
        width: 100%;
        padding: 0.8rem;
        font-size: 1rem;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .btn-submit:hover {
        background-color: #0056b3;
      }

      .terms-group label {
        font-size: 0.85rem;
        color: #555;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Cadastro de Usuário</h2>
      <form action="/save" method="post">
        <div class="form-group">
          <label for="nome">Nome Completo</label>
          <input type="text" id="nome" name="nome" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div class="form-group">
          <label for="senha">Senha</label>
          <input type="password" id="senha" name="senha" required />
        </div>

        <div class="form-group">
          <label for="data-nascimento">Data de Nascimento</label>
          <input
            type="date"
            id="data-nascimento"
            name="data-nascimento"
            required
          />
        </div>

        <div class="form-group gender-group">
          <label>Gênero:</label>
          <div>
            <input
              type="radio"
              id="masculino"
              name="genero"
              value="masculino"
              required
            />
            <label for="masculino">Masculino</label>
          </div>
          <div>
            <input
              type="radio"
              id="feminino"
              name="genero"
              value="feminino"
              required
            />
            <label for="feminino">Feminino</label>
          </div>
        </div>

        <div class="form-group terms-group">
          <input type="checkbox" id="termos" name="termos" required />
          <label for="termos"
            >Aceito os <a href="#">termos e condições</a></label
          >
        </div>

        <button type="submit" class="btn-submit">Cadastrar</button>
      </form>
    </div>
  </body>
</html>
`;

app.get("/", (req, res) => {
  try {
    res.send(html2);
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
