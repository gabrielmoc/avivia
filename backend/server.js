const express = require("express");
const cors = require("cors");
const prescritorRoutes = require("./routes/prescritorRoutes");
const blogRoutes = require("./routes/blogRoutes");
const ebookRoutes = require("./routes/ebookRoutes");
const certificadoRoutes = require("./routes/certificadoRoutes");
const patologiaRoutes = require("./routes/patologiaRoutes");
const estudoRoutes = require("./routes/estudoRoutes");
const esqueciSenhaRoutes = require("./routes/esqueciSenhaRoutes");
const adminRoutes = require("./routes/adminRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", prescritorRoutes);
app.use("/", blogRoutes);
app.use("/", ebookRoutes);
app.use("/", certificadoRoutes);
app.use("/api", require("./routes/certificadoRoutes"));
app.use("/", patologiaRoutes);
app.use(estudoRoutes);
app.use(esqueciSenhaRoutes);
app.use(adminRoutes);
app.use("/", feedbackRoutes);

// Conexão com o PostgreSQL
const pool = require("./db");

// Rota de teste
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// Inicializa o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
