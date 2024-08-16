// /controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Simularemos una base de datos con un array
let users = [];

// Función que maneja el registro de usuarios
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Validaciones básicas
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  // Verificar si el usuario ya existe
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear el nuevo usuario
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);

  return res.status(201).json({ message: 'User registered successfully' });
}

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    'your-secret-key', // En un entorno real, esta clave debe estar en una variable de entorno.
    { expiresIn: '1h' } // El token expirará en 1 hora.
  );

  return res.status(200).json({ message: 'Login successful', token });
}