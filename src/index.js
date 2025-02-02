import { z } from "zod";
import _ from "lodash";
//import path from "path";
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set Pug as the view engine
app.set('view engine', 'pug');
app.use(express.static('public'))

// Modify the views directory path
//app.set('views', path.join(__dirname, 'custom_views'));
const port = 3000 || process.env.PORT;

const db = [
  { name: `mani`, age: 32 },
  { name: `gopal`, age: 32 },
];

// Define a schema for user validation
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(0, "Age must be a positive number"),
});

/**const { z } = require('zod');

const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
});

const validateUser = (req, res, next) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json(result.error.errors);
    }
    req.body = result.data;
    next();
};
 */

app.get("/", (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.get("/api/data", (req, res) => {
  res.status(200).json(db);
});

// Retrieve user by ID
app.get("/api/:name", (req, res) => {
  const user = _.find(db, (val) => val.name == req.params.name);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
});

app.delete("/api/:name", (req, res) => {
  const user = _.remove(db, (val) => val.name == req.params.name); 
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
});

app.listen(port, () => {
  console.log(`Node-Js Express server is listening on port ${port}`);
});
