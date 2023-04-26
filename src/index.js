const express = require("express");
const app = express();
const path = require("path");
/* const hbs = require("hbs");
 */const collection = require("./mongodb");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');




const templatePath = path.join(__dirname, '../tempelates')

app.use(express.json())
app.set("view engine", "ejs")
app.set("views", templatePath)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
 
app.get("/", (req, res) => {
    res.render("login")
})

app.get("/alltodos", async (req, res) => {
    const todos = await collection.Todo.find();
    res.render("todo" , { todos} )
})

app.get("/signup", (req, res) => {
    res.render("signup")

})
/* app.get("/todo",async (req, res) => {
    let sort = {datepicker:1}
    const allTodo =  await collection.Todo.find().sort(sort);
    res.render("todo",{todo:allTodo})
}) */

app.get("/todo",async (req, res) => {
    /* let sort = {datepicker:1} */
    const todos =  await collection.Todo.find();
    res.render("todo",{todos})
})

app.post("/signup", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt)

    const data = {
        name: req.body.email,
        password: secPass
    }

    await collection.collection.insertMany([data])

    res.redirect("/todo")

})

app.post("/login", async (req, res) => {

    try {
        const check = await collection.collection.findOne({ name: req.body.email });
            console.log(collection.collection)

        if (check && bcrypt.compareSync(req.body.password, check.password)) {


            res.redirect("/todo")
        }
        else {
            res.send("wrong password")
        }
    }
    catch {
        res.send("wrong details")
    }


})

 /* app.post("/add/todo", async (req, res) => {
    const { todo,date,status } = req.body;
    console.log(req.body)
    const newTodo = new collection.Todo(req.body);
    // save the todo
    newTodo
      .save()
      .then(() => {
        console.log("Successfully added todo!");
        const allTodo =   collection.Todo.find();
        console.log("todoo---",todo)
  
        res.redirect("/todo")
      })
      .catch((err) => console.log(err));
  }) */
 

  app.post('/add', async (req, res) => {
    const { task, dueDate } = req.body;
    const todo = new collection.Todo({
      task,
      dueDate: new Date(dueDate),
      completed: false
    });
    await todo.save();
    res.redirect('/todo');
  });

  app.post('/complete/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await collection.Todo.findById(id);
    todo.completed = !todo.completed;
    await todo.save();
    res.redirect('/alltodos');
  });
 
  app.get('/completed', async (req, res) => {
    const todos = await collection.Todo.find({ completed: true });
    res.render('todo', {  todos/* todos */ });
  });
  app.get('/uncompleted', async (req, res) => {
    const todos = await collection.Todo.find({ completed: false });
    res.render('todo', { todos });
  });
  /* app.post('/complete/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    todo.completed = true;
    await todo.save();
    res.redirect('/todo');
  }); */
  /* app.post('/incompleted/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    todo.completed = false;
    await todo.save();
    res.redirect('/todo');
  }); */

  
  /* app.get("/delete/todo/:_id", (req, res) => {
    const { _id } = req.params;
    collection.Todo.deleteOne({ _id })
      .then(() => {
        console.log("Deleted Todo Successfully!");
        res.redirect("/todo")
      })
      .catch((err) => console.log(err));
  }); */

  /* app.use('/', (req, res, next) => {
    const filters = req.query;
    const filteredUsers = todo.filter(user => {
      let isValid = true;
      for (key in filters) {
        console.log(key, user[key], filters[key]);
        isValid = isValid && user[key] == filters[key];
      }
      return isValid;
    });
    res.send(filteredUsers);
  });
 */


app.listen(3002, () => {
    console.log("port connected");
})