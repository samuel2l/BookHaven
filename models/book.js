const mongoose=require('mongoose')

const bookSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:1
    },
    author:{
        type:String,
        required:true
    },
    genre: {
        type: [String], 
        required: true,
        validate: {
          validator: function (v) {
            return v.every((genre) => [
                "Action",
                "Comedy",
                "Drama",
                "Fantasy",
                "Horror",
                "Romance",
                "Sci-Fi",
                "Thriller",
                "Animation",
              ].includes(genre));
          },

          message: (props) => `${props.value} contains invalid genres.`,
        },
      },    stock:{
        type: Number,
        required:true,
        min:0

    }
})


const Book=mongoose.model('Book',bookSchema)
module.exports=Book