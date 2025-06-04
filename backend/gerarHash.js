const bcrypt = require("bcrypt");

const gerarHash = async () => {
  const senha = "senha123";
  const hash = await bcrypt.hash(senha, 10);
  console.log("Hash gerada:", hash);
};

gerarHash();
