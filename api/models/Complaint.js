const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  pid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
