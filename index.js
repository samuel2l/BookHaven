const express=require('express')
const path=require('path')
const app=express()
const mongoose=require('mongoose')
const Book=require('./models/book')
const print=console.log
const methodOverride=require('method-override')
app.use(methodOverride('_method'))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/booksApp');
  }
  main().then(()=>{
      print('connection sauce')
  }).
  catch(err => console.log(err));

  app.get('/books/new', (req,res)=>{
 res.render('add_book.ejs')
})



app.get('/books',async (req,res)=>{
    const books=await Book.find({})
    print(books)
    res.render('books.ejs',{books})
})


app.post('/books',async (req,res)=>{
    const {name,price,genre,author,stock}=req.body
    print(genre)
    const newBook= new Book({name,price,genre,author,stock})
    newBook.save()
    .then(
        (res)=>{
            print(res)
            print('saved the shit')
        })
    .catch((e)=>{print(e)})
    
    res.redirect('/books')
})

app.get('/books/:id',async (req,res,next)=>{
try{
    const id=req.params.id
    
    const book=await Book.findById(id)

    res.render('book_details.ejs',{book:book[0]})

}catch(err){
next(err)
}


})
// app.get('/books/:genre/filter', async (req, res) => {
//     try {
//         const genre = req.params.genre;

//         const books = await Book.find({ genre: { $in: [genre] } })

//         console.log('NEW ROUTEEEE')
//         console.log(books)

//         res.render('filter_by_genre.ejs', { books, genre })
//     } catch (err) {
//         next(err)


//     }
// })
app.get('/books/filter', async (req, res) => {
    try {
        const selectedGenres = req.query.genres;
        let query = {};
        if (selectedGenres && selectedGenres.length > 0) {
            query = { genre: { $in: selectedGenres } };
        }
        const books = await Book.find(query);
        if (books.length === 0) {
            return res.render('filter_by_genre.ejs', { books, genres: selectedGenres });
        }
        res.render('filter_by_genre.ejs', { books, genres: selectedGenres });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('An error occurred while fetching books.');
    }
});

app.get('/books/author/:author/filter', async (req, res) => {
    try {
        const authorQuery = req.params.author

        const books = await Book.find({ author: { $regex: authorQuery, $options: 'i' } })

        if (books.length === 0) {
            return res.render('error.ejs', { message: `No books found for author "${authorQuery}".` });
        }

        res.render('filter_by_author.ejs', { books, author: authorQuery })
    } catch (error) {

       next(error)
    }
})
app.get('/books/name/:name/filter', async (req, res) => {
    try {
        const nameQuery = req.params.name

        const books = await Book.find({ name: { $regex: nameQuery, $options: 'i' } })

        if (books.length === 0) {
            return res.render('error.ejs', { message: `No books found by "${nameQuery}".` });
        }

        res.render('filter_by_name.ejs', { books, name: nameQuery })
    } catch (err) {

next(err)
    }})

app.get('/books/:id/edit',async(req,res)=>{
    try{
        const id=req.params.id
        const book=await Book.find({_id:id})
    
        res.render('update_book.ejs',{book:book[0],id})
    
    }catch(err){
        next(err)

    }

})


app.patch('/books/:id',async (req,res)=>{
    try{
        const id=req.params.id
    
        let book=await Book.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    
        print(book)
        print('HMMMMM')
        print(req.body)
        res.redirect(`/books/${id}`)
    
    }catch(err){
        next(err)
    }
    
})


app.delete('/books/:id',async (req,res)=>{
    try{
        const id=req.params.id
    
        let deletedBook=await Book.findByIdAndDelete(id)
    
        res.redirect(`/books`)
    
    }catch(err){
next(err)
    }

})


app.get('*',(req,res)=>{
    res.render('error.ejs',{message:'This page does not exist'})
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.render('error.ejs',{message})
})



app.listen(3000,()=>{
    print('server up and running')
    
})