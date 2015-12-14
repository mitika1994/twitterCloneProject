
// ================ Base Setup ========================
// Include Hapi package
var Hapi = require('hapi');

// Create Server Object
var server = new Hapi.Server();
//Include JOi package
 var Joi= require('joi');

// Define PORT number
server.connection({port: 7002});

// Register Swagger Plugin ( Use for documentation and testing purpose )
server.register({
  register: require('hapi-swagger'),
  options: {
    apiVersion: "0.0.1"
  }
}, function (err) {
  if (err) {
    server.log(['error'], 'hapi-swagger load error: ' + err)
  } else {
    server.log(['start'], 'hapi-swagger interface loaded')
  }
});

// =============== Routes for our API =======================
// Define GET route
server.route({
  method: 'GET',      // Methods Type
  path: '/api/user',  // Url
  config: {
    // Include this API in swagger documentation
    tags: ['api'],
    description: 'Get All User data',
    notes: 'Get All User data'
  },
  handler: function (request, reply) { //Action

    // Response JSON object
    reply({
      statusCode: 200,
      message: 'Getting All User Data',
      data: [
        {
          name:'Mitika Sandha',
          _id:'12345678123456',
          email:'mitika@gmail.com',
          country:'India',
          phone_number:'+911234567890'

        },
        {
          name:'Aarti Kanwar',
          _id:'123456781236766',
          email:'aarti@gmail.com',
          country:'India',
          phone_number:'+911239567890'
        },
        {
          name:'Shelly Thakur',
          _id:'12345678126611',
          email:'shelly@gmail.com',
          country:'India',
          phone_number:'+911239567833'
        },
        {
          name:'Shivangi',
          _id:'12345671296766',
          email:'shivangi@gmail.com',
          country:'India',
          phone_number:'+911239567800'
        }
      ]
    });
  }
});



server.route({
  method: 'POST',
  path: '/api/Login',
  config: {
    // "tags" enable swagger to document API
    tags: ['api'],
    description: 'Login',
    notes: 'Login',
    // We use Joi plugin to validate request
    validate: {
      payload: {
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
      }
    }
  },
  handler: function (request, reply) {

    // Create mongodb user object to save it into database
    //var user = new UserModel(request.payload);

    // Call save methods to save data into database
    // and pass callback methods to handle error
    //user.save(function (error) {

        reply({
          statusCode: 200,
          message: 'LogedIn Saved Successfully'
        });
      }
    });


server.route({
  method: 'POST',
  path: '/api/Register',
  config: {
    // "tags" enable swagger to document API
    tags: ['api'],
    description: 'Register a new user',
    notes: 'Register ',
    // We use Joi plugin to validate request
    validate: {
      payload: {

        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        email:Joi.string().email(),
        password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
      }
    }
  },
  handler: function (request, reply) {

    // Create mongodb user object to save it into database
    //var user = new UserModel(request.payload);

    // Call save methods to save data into database
    // and pass callback methods to handle error
    //user.save(function (error) {

    reply({
      statusCode: 200,
      message: 'User Registered Successfully'
    });
  }
});



// =============== Start our Server =======================
// Lets start the server
server.start(function () {
  console.log('Server running at:', server.info.uri);
});