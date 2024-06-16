import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import _ from "lodash"


const app = express()
const port = process.env.PORT || 3000

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))


let today = new Date();

let options = {
  weekday: "long",
  // day: "numeric",
  // month: "long"
}

let day = today.toLocaleDateString("en-US", options);
let fullYear = today.getFullYear()

let posts = []

app.get("/", (req, res) => {
  res.render("index", {
    title: "",
    year: fullYear
  })
})

app.get("/home", (req, res) => {
  const name = req.body["fName"]
  res.render("home", {
    title: "You are amazing on vitalSpace",
    year: fullYear,
    currentHomeDay: `Welcome to vitalSpace ${name}, because today is ${day}, we would like to get you some `,
    body: "",
    posts: posts
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    year: fullYear
  })
})

app.get("/service", (req, res) => {
  res.render("service", {
    title: "service",
    year: fullYear

  })
})

app.get("/compose", function (req, res) {
  res.render("compose", {
    title: "Compose",
    year: fullYear
  });
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body["postTitle"],
    content: req.body["postBody"]
  };

  posts.push(post);

  console.log(post)
  res.redirect("/home");

});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
        year: fullYear
      });
    }
  });

});

// app.post("/activity", (req, res) => {

// })

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Contact page",
    imgPath: '/public/img/pexels-valeriya-1199957.jpg',
    year: fullYear
  })
})

app.get("/signup", (req, res) => res.render("signup"))

app.get("/signin", (req, res) => {
  res.render("signin")
})

app.listen(port, () => {
  console.log(`Server running on port https://localhost:${port}`)
})