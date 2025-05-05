import {model , Schema}  from 'mongoose';
const metadataSchema = new Schema({
    bookType : {
        type : String,
        enum: ["ebook", "hardcover", "softcover", "pocket"]
    },
    price : Number,
    
},{_id : false})
const bookSchema = new Schema({
author : {
    required : true,
    type : String,
    minLength : 2
},
title : {
    required : true,
    type : String,
    minLength : 2
},
isbn : {
    required : true,
    type : String,
    unique : true,
    minLength : 10,
    maxLength : 13
},
genres : [String],
// genres : {type: [String]},
// genres: [{type: String}]
languages : [String],
// languages : {type: [String]}
rewards : [String],
// rewards : {type: [String]}
cover  : {
    type  : String,
    default : 'https://via.placeholder.com/150'
},
metadata : [metadataSchema]


},{timestamps : true})

const Book = model('book', bookSchema);
export default Book;
