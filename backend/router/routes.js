const UserController = require('../controllers/userController');
const Authentication = require('../controllers/authentication');

const passport = require('../services/passport');

const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignIn = passport.authenticate('local', {session: false})

module.exports = (app) => {
  
  //test routes
  app.get('/api/test', requireAuth, (req, res) => {
    res.send({msg: 'This is behind authentication'})
  })
  app.post('/api/test', (req, res) => {
    console.log(req)
    res.send({msg: 'This is behind authentication'})
  })

  //actual routes
  app.post('/api/user/signup', Authentication.signup)
  app.post('/api/user/signin', requireSignIn, Authentication.signin)

  app.patch('/api/user/log', UserController.addWorkout)

  app.get('/api/users', UserController.readAll)
  app.post(`/api/user/mydata`, UserController.readMe)
}