const fs = require('fs');
const path = require('path');

const TASKPATH = path.join(process.cwd(), 'DB', 'tasks.json');
const TODOSPATH = path.join(process.cwd(), 'DB', 'todos.json');

const getTaskByTodoId = (req, res) => {
  const { id } = req.params;
  //GET TODO
  const todos = JSON.parse(fs.readFileSync(TODOSPATH)).find(todo => todo.id === Number(id));
  const tasks = JSON.parse(fs.readFileSync(TASKPATH)).filter(task => task.todoId === Number(id));

  const response = {
    ...todos,
    todos: tasks
  }

  res.json(response);
}

const addTodo = (req, res) => {
  try{
    const { id } = req.params;
    const tasks = JSON.parse(fs.readFileSync(TASKPATH)).filter(task => task.todoId === Number(id));
  
    //obtener el ultimo id y el id del usuario.
    let { id:lastId, userId } = [...tasks].pop();
  
    const newTask = {
      id: lastId + 1,
      ...req.body,
      todoId: Number(id),
      userId
    }
  
    tasks.push(newTask);
    //guardando la nueva tarea.
    fs.writeFileSync(TASKPATH, JSON.stringify(tasks));
  
    res.status(201).json(newTask);
  }catch(error){
    return res.status(500).json({error : 'Error en el servidor!'});
  }
}

module.exports = {
  getTaskByTodoId,
  addTodo
}