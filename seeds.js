//seed the db so you have some data to start out with
const Book=require('./models/book')
const mongoose=require('mongoose')
const print=console.log
require("dotenv").config()
async function main() {
    await mongoose.connect(process.env.CONNECTION_STRING);
  }
  main().then(()=>{
      print('connection sauce')
  }).
  catch(err => console.log(err));


Book.insertMany([
    {
      name: 'Game of Thrones',
      price: 25,
      author: 'George R.R. Martin',
      genre: ['Fantasy', 'Drama', 'Thriller'],
      stock: 50,
      description: 'A fantasy epic where noble families vie for control of the Seven Kingdoms in a brutal world filled with political intrigue, dragons, and battles for the Iron Throne.'
    },
    {
      name: 'Nancy Drew: The Secret of the Old Clock',
      price: 12,
      author: 'Carolyn Keene',
      genre: ['Mystery','Drama','Thriller'],
      stock: 40,
      description: 'Nancy Drew, a young detective, investigates the mystery of a missing will in her hometown, unraveling secrets and finding clues to solve the case.'
    },
    {
      name: 'The Hardy Boys: The Tower Treasure',
      price: 10,
      author: 'Franklin W. Dixon',
      genre: ['Mystery','Drama','Thriller'],
      stock: 35,
      description: 'Brothers Frank and Joe Hardy embark on an adventure to solve the mystery of a stolen treasure, leading them into dangerous situations and exciting discoveries.'
    },
    {
      name: 'The Lord of the Rings: The Fellowship of the Ring',
      price: 20,
      author: 'J.R.R. Tolkien',
      genre: ['Fantasy','Action'],
      stock: 60,
      description: 'The first part of the epic Lord of the Rings trilogy, where Frodo Baggins sets out on a perilous journey to destroy a powerful ring that threatens Middle-earth.'
    },
    {
      name: 'The Hunger Games',
      price: 18,
      author: 'Suzanne Collins',
      genre: ['Action', 'Sci-Fi', 'Thriller'],
      stock: 75,
      description: 'In a dystopian future, Katniss Everdeen becomes the reluctant hero in a deadly competition where children fight for survival, forced to navigate a society of control and oppression.'
    },
    {
      name: 'The Great Gatsby',
      price: 15,
      author: 'F. Scott Fitzgerald',
      genre: ['Drama', 'Romance'],
      stock: 50,
      description: 'A story of love, wealth, and betrayal, set in the roaring twenties, following the mysterious Jay Gatsby and his obsession with the elusive Daisy Buchanan.'
    },
    {
      name: 'Jurassic Park',
      price: 22,
      author: 'Michael Crichton',
      genre: ['Sci-Fi', 'Thriller'],
      stock: 40,
      description: 'Scientists clone dinosaurs on a remote island, leading to disastrous consequences when the creatures escape and wreak havoc on the park.'
    },
    {
      name: 'The Shining',
      price: 14,
      author: 'Stephen King',
      genre: ['Horror', 'Thriller'],
      stock: 30,
      description: 'A man becomes the winter caretaker of a remote hotel with a dark, sinister history, leading to terrifying events and a breakdown of sanity.'
    },
    {
      name: 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
      price: 18,
      author: 'C.S. Lewis',
      genre: ['Fantasy','Action'],
      stock: 50,
      description: 'Four siblings step into the magical world of Narnia through a wardrobe, where they must battle an evil White Witch and restore peace to the land.'
    },
    {
      name: 'The Wizard of Oz',
      price: 12,
      author: 'L. Frank Baum',
      genre: ['Fantasy'],
      stock: 60,
      description: 'A young girl named Dorothy is swept away by a tornado to a magical land, where she must journey to meet the Wizard and find her way back home.'
    },
    {
      name: 'The Godfather',
      price: 20,
      author: 'Mario Puzo',
      genre: ['Crime', 'Drama'],
      stock: 45,
      description: 'A tale of power, loyalty, and family in the Mafia world, following Vito Corleone and his son Michael as they navigate crime, betrayal, and empire-building.'
    }
  ])