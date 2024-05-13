require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");

// const jwt = require("jsonwebtoken");


// PDF Required Libraries
const path = require("path");
const pdfTemplate = require("./documents");

const app = express();



//Middlewares
app.use(cors());
app.use(bodyParser.json())


// Database Connections is here
const db= require('./Config/db')
db();
//*************************/



//Routes Mounting

const user= require('../waqas fyp/Routes/userRoutes')

//Routes Track
app.use('/user',user)


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));





//PDF Routes and Controller

app.post("/save", (req, res) => {
  const { user, resume } = req.body;
  delete resume.step;

  DB.collection("users")
    .findOne({ email: user.email })
    .then((userDoc) => {
      const USERID = userDoc._id.toString();
      const data = {
        userid: USERID,
        ...resume,
      };
      DB.collection("resume")
        .findOne({ userid: USERID })
        .then((resumeDoc) => {
          if (resumeDoc) {
            DB.collection("resume")
              .deleteOne({ userid: USERID })
              .then(() => {
                DB.collection("resume")
                  .insertOne(data)
                  .then(() => res.sendStatus(200))
                  .catch((err) => res.send(err));
              })
              .catch((err) => console.log(err));
          } else {
            DB.collection("resume")
              .insertOne(data)
              .then(() => res.sendStatus(200))
              .catch((err) => res.send(err));
          }
        });
    });
});

app.post("/get-resume", (req, res) => {
  const { email } = req.body;
  DB.collection("users")
    .findOne({ email: email })
    .then((userDoc) => {
      const USERID = userDoc._id.toString();
      DB.collection("resume")
        .findOne({ userid: USERID })
        .then((resumeDoc) => {
          if (resumeDoc) {
            delete resumeDoc._id;
            delete resumeDoc.userid;
            res.send(resumeDoc);
          }
        });
    });
});

// POST route for PDF generation....
app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), options).toFile("Resume.pdf", (err) => {
    if (err) {
      console.log(err);
      res.send(Promise.reject());
    } else res.send(Promise.resolve());
  });
});

app.get("/", (req, res) => {
  res.send("Hello from 'Resume Builder' Web App");
});


// GET route -> send generated PDF to client...
app.get("/fetch-pdf", (req, res) => {
  const file = `${__dirname}/Resume.pdf`;
  res.download(file);
});








// Port is listening here 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
