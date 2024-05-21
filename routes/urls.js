const express = require('express');
const HealthController = require('../controllers/health.controller');
const SomeController = require('../controllers/some.controller');
const RegisterController = require('../controllers/register.controller');
const LoginController = require('../controllers/login.controller');
const TweetController = require('../controllers/tweet.controller');
const ReTweetController = require('../controllers/retweet.controller');
const FollowController = require('../controllers/follow.controller');
const UserController = require('../controllers/user.controller');
const SearchController = require('../controllers/search.controller');

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

const tweetController = new TweetController();
tweetController.register(router)

const reTweetController = new ReTweetController();
reTweetController.register(router)

const followController = new FollowController();
followController.register(router);

const userController = new UserController();
userController.register(router);

const searchController = new SearchController();
searchController.register(router);

module.exports = router;
