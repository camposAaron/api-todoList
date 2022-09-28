const fs = require('fs');
const path = require('path');
const usersPath = path.join(process.cwd(), 'DB', 'users.json');

const getUsers = async (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(usersPath));
    res.status(200).json({
      cant: users.length,
      users
    });

  } catch (error) {
    return res.status(500).json({ msg: "Error en el servidor." });
  }
}

const createUser = (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(usersPath));
    let { id } = [...users].pop();
   
    const newUser = {
      id: id+1,
      ...req.body
    }

    console.log(users);

    users.push(newUser);

  
    //guardar usuario en el JSON
    fs.writeFileSync(usersPath, JSON.stringify(users));

    res.status(201).json({ newUser });
  } catch (error) {
    return res.status(500).json({ msg: "Error en el servidor."+error.message });
  }
}

const getUserById = (req, res) => {
  const { id } = req.params;
  const users = JSON.parse(fs.readFileSync(usersPath));
  const foundUser = users.find(user => user.id === Number(id));
  res.json(foundUser ? foundUser : 'Usuario con '+id+' no existe.');
}

module.exports = {
  getUsers,
  createUser,
  getUserById
}