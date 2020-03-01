const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//this will be our data base's data structure
const DataSchema = new Schema(
    {
        id: Number,
        title: String,
        message: String
    },
    {timestamps:true}
);

module.exports = mongoose.model("Data", DataSchema);