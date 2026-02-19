const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const filePath = path.join(__dirname, "post.json");

// CONFIGURAZIONE MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// FORM CREAZIONE POST
app.get("/post", (req, res) => {
  res.render("post");
});

// SALVATAGGIO POST
app.post("/post", upload.single("image"), (req, res) => {
  const { titolo, descrizione } = req.body;

  let posts = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    if (data.length > 0) {
      posts = JSON.parse(data);
    }
  }

  const newPost = {
    id: Date.now(),
    titolo,
    descrizione,
    image: req.file ? req.file.filename : null,
    createdAt: new Date()
  };

  posts.push(newPost);

  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));

  res.redirect("/postGallery");
});

// GALLERY COMPLETA POST
app.get("/postGallery", (req, res) => {
  let posts = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    if (data.length > 0) {
      posts = JSON.parse(data);
    }
  }

  res.render("postGallery", { posts });
});

// SOLO IMMAGINI
app.get("/gallery", (req, res) => {
  let posts = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    if (data.length > 0) {
      posts = JSON.parse(data);
    }
  }

  res.render("gallery", { posts });
});

// POST SINGOLO
app.get("/post/:id", (req, res) => {
  let posts = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    if (data.length > 0) {
      posts = JSON.parse(data);
    }
  }

  const post = posts.find(p => p.id == req.params.id);

  res.render("singlePost", { post });
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
