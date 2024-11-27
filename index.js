const express = require("express")
const path = require("path")
const app = express()
const mongoose = require("mongoose")
const Book = require("./models/book")
const print = console.log
const methodOverride = require("method-override")
app.use(methodOverride("_method"))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: true }))
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/booksApp")
}
main()
  .then(() => {
    print("connection sauce")
  })
  .catch((err) => console.log(err))

app.get("/books/new", (req, res) => {
  res.render("add_book.ejs")
})

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find()
    const allGenres = await Book.distinct("genre")
    res.render("books.ejs", { books, genres: allGenres, selectedGenres: [] })
  } catch (err) {
    next(err)
  }
})

app.post("/books", async (req, res) => {
  const { name, price, genre, author, stock } = req.body
  print(genre)
  const newBook = new Book({ name, price, genre, author, stock })
  newBook
    .save()
    .then((res) => {
      print(res)
      print("saved the shit")
    })
    .catch((e) => {
      print(e)
    })

  res.redirect("/books")
})

app.get("/books/:id", async (req, res, next) => {
  try {
    const id = req.params.id

    const book = await Book.find({ _id: id })

    res.render("book_details.ejs", { book: book[0] })
  } catch (err) {
    next(err)
  }
})

app.get("/books/genre/filter", async (req, res) => {
  try {
    const { genres } = req.query
    print(genres)
    const selectedGenres = Array.isArray(genres)
      ? genres
      : genres
      ? [genres]
      : []

    const books = await Book.find({ genre: { $in: selectedGenres } })

    const genreDisplay =
      selectedGenres.length > 0 ? selectedGenres.join(", ") : "All Genres"

    res.render("filter_by_genre.ejs", { books, genre: genreDisplay })
  } catch (err) {
    next(e)
    next(error)
  }
})


app.get('/books/author/filter', async (req, res) => {
    try {
        const { author } = req.query;


        const books = await Book.find({ author: { $regex: new RegExp(author, "i") } });

        res.render('filter_by_author.ejs', { books, author });
    } catch (err) {
        next(e)
    }
});

app.get('/books/name/filter', async (req, res) => {
    try {
        const { name } = req.query;

        const books = await Book.find({ name: { $regex: new RegExp(name, "i") } });

        res.render('filter_by_name.ejs', { books, name });
    } catch (err) {
        next(e)

    }
});

app.get("/books/:id/edit", async (req, res) => {
  try {
    const id = req.params.id
    const book = await Book.find({ _id: id })

    res.render("update_book.ejs", { book: book[0], id })
  } catch (err) {
    next(err)
  }
})

app.patch("/books/:id", async (req, res) => {
  try {
    const id = req.params.id

    let book = await Book.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    })

    res.redirect(`/books/${id}`)
  } catch (err) {
    next(err)
  }
})

app.delete("/books/:id", async (req, res) => {
  try {
    const id = req.params.id

    let deletedBook = await Book.findByIdAndDelete(id)

    res.redirect(`/books`)
  } catch (err) {
    next(err)
  }
})

app.get("*", (req, res) => {
  res.render("error.ejs", { message: "This page does not exist" })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err
  res.render("error.ejs", { message })
})

app.listen(3000, () => {
  print("server up and running")
})
