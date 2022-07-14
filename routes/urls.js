const express = require('express');
const HealthController = require('../controllers/health.controller');
const SomeController = require('../controllers/some.controller');
const RegisterController = require('../controllers/register.controller');
const LoginController = require('../controllers/login.controller');

const router = express.Router();

// register controllers
const healthController = new HealthController();
healthController.register(router);

const someController = new SomeController();
someController.register(router);

const registerController = new RegisterController();
registerController.register(router)

const loginController = new LoginController();
loginController.register(router)

module.exports = router;
