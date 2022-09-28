const express = require('express');
const userRouter = require('./routes/user.routes');
const todosRouter = require('./routes/todos.routes');

const app = express();
const PORT = 5000


const apiRoutes = {
  users : '/api/users',
  todos : '/api/todos'
}

//MIDDLEWARES
app.use(express.json());

//ROUTES
app.use(apiRoutes.users, userRouter);
app.use(apiRoutes.todos, todosRouter);
app.get('/', (req, res) => res.send("POLPO-API"));



app.listen(PORT, () => {
  console.log(`server listening port: ${PORT} `);
});

module.exports = app;
