const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const filePath = path.join(__dirname, "post.json");

// Pagina con form minimale
app.get("/post", (req, res) => {
  res.send(`
    <html>
      <body>
        <form method="POST" action="/post">
          <input type="text" name="titolo" placeholder="Titolo" required />
          <button type="submit">Salva</button>
        </form>
      </body>
    </html>
  `);
});

// Salvataggio su post.json
app.post("/post", (req, res) => {
  const newPost = req.body;

  let posts = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    if (data.length > 0) {
      posts = JSON.parse(data);
    }
  }

  posts.push(newPost);

  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));

  res.send("Post salvato correttamente");
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
