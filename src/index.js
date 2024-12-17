
// convert above to require 
const cookieParser = require('cookie-parser');

const {addHours, addMinutes, addSeconds, addDays, addWeeks, addMonths, addYears} = require('date-fns');

//const TelegramBot = require('node-telegram-bot-api');


const express = require('express');
const { Client } = require('discord.js');





const bodyParser = require("body-parser");
const path = require('path');
var app = express();
const Users = require('./schemas/User.js');



// require the discord.js module



const fs = require("fs");
const functionDir = path.join(__dirname, 'functions');
const functions = fs.readdirSync(functionDir).filter(file => file.endsWith(".js"));
const eventDir = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventDir).filter(file => file.endsWith(".js"));
const commandsDir = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(commandsDir).filter(file => file.endsWith(".js"));





const utility = require('./process/utility.js');
 /**
  * 
  * @param {*} addedTime 
  * @returns 
  */
 Date.prototype.addTime = function(addedTime){
  return utility.addTimeToDate(addedTime, this);
 }

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}





//https://github.com/meister03/discord-linked-roles/
const bkfd2Password = require("pbkdf2-password");
const hash = bkfd2Password();
const session = require('express-session');



Array.prototype.insert = function(index) {
	this.splice.apply(this, [index, 0].concat(
		Array.prototype.slice.call(arguments, 1)));
	return this;
	
};
//insert into an object with a key
Object.prototype.insert = function(key, value) {
  this[key] = value;
  return this;
  
}






var Port = 8080;


const { GatewayIntentBits, EmbedBuilder,Collection } = require("discord.js");
const Discord = require("discord.js");

const token = process.env.D_TOKEN;
const bot = new Discord.Client({ intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds ] });



bot.commands = new Collection();
for(const file of functions){
  require(`./functions/${file}`)(bot);
}
bot.handleCommands(commandFolders);
bot.handleEvents(eventFiles);
module.bot = bot;



app.listen(process.env.PORT || 5000,"0.0.0.0", async () => {
 console.info(`[Express] Listening on port ${Port}`);
  
 
  
  
  if(process.env.NODE_ENV == "production"){
  bot.login(process.env.token);}
  
  bot.on('guildDelete', async (guild) => {
    const serverData = await Server.findOne({ DiscordId: guild.id });
    if(serverData){
      await serverData.deleteOne();
    }
}); 


// SECTION  - Guild Member Update for user permissions



});
  
    
     












  





  
//const swaggerDocs = swaggerJsdoc(swaggerOptions);
// express stuff
app.enable('trust proxy')

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use('/css', express.static(path.join(__dirname, 'assets/css')));
app.use('/js', express.static(path.join(__dirname, 'assets/js')));
app.use('/img', express.static(path.join(__dirname, 'assets/images')));
//app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {explorer: true}));
//const swStats = require('swagger-stats');



//const apiSpec = swaggerJsdoc(swaggerOptions);

//app.use('/manifest.webmanifest', express.static(path.join(__dirname, 'manifest.webmanifest')));
//app.use(swStats.getMiddleware({swaggerSpec:apiSpec}));



// parse application/json
app.use(bodyParser.json())


app.use(express.urlencoded({ extended: false }))
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
  
}));
app.use(cookieParser(
  'shhhh, very secret'
));

var UN = "";
// Session-persisted message middleware




app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  var user = req.session.user;
  delete req.session.error;
  delete req.session.success;
	
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  if (user) res.locals.user = user;
  next();
});










  /**
   * 
   * @description verifies if token exsists and is valid
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
   
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      // Forbidden
      return res.sendStatus(403);
    }
   }
// Authenticate using our plain-object database of doom!
/**
 * 
 * @param {String} name 
 * @param {String} pass 
 * @param {Function} fn 
 */
function authenticate(name, pass,email, fn) {
  try{
  if (!module.main) console.info('authenticating user', {user: name});
  if(name){
  Users.findOne({Username: name}).then((user) => {
  // query the db for the given username
  if (!user) return fn(null, null)

  
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  
  hash({ password: pass, salt: user.Salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.Hash) {
      
      return fn(null, user) }
    fn(null, null)
  });
});
}
if(email){
  Users.findOne({Email: email}).then((user) => {
  // query the db for the given username
  if (!user) return fn(null, null)

  
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  
  hash({ password: pass, salt: user.Salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.Hash) {
      
      return fn(null, user) }
    fn(null, null)
  });
});}

}catch(err){
 console.error('issue with authenticating user', {msg: err});
}
};


/**
 * @description checks if user is logged in
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    return res.redirect('/login/Magic');
  }
}

function restrictUserByAuth(req, res, next) {
  const auth = req.headers.authorization;
  Users.findOne({Username: user}).then((user) => {
    if(!user) return res.send("no user found");
    if(!user) return res.send({ Result: "no user found" });
    if(!auth) return res.send({ Result: "no auth found" });
    if(auth != user.Hash.split(" ")[1]) return res.send({ Result: "denied access" });
  })
}


function restrictDev(req, res, next) {

  if (req.session.user) {
    next();
  }
  else {
    req.session.error = 'Access denied!';
    return res.redirect('/login/1942');
  }
}
app.get('/login', function(req, res){
  res.render('auth/login');
});








/**
* @swagger
* /:
*  get:
*     description: Get homepage
*     tags:
*      - Site
*     responses:
*       200:
*         description: A homepage
*/
app.get("/", function(req, res){
    res.render('homepage');
})




// dev restart 
app.post('/dev/restart',verifyToken ,(req, res) => {
  if(req.token == process.env.authCode){
   console.info("Restarting from wanderign guide");
    res.send("Restarting from wanderign guide");
    process.exit();
  }else{
   console.error("not authorized");
    res.status(503).send("not authorized");
  }
})










app.get('/api/user/Logged',function(req,res){
  if(req.session && req.session.user){
    res.send(req.session.user);
  }
  else{
    res.send({Result:'noUser'});
  }
});





  
      


  



app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    return res.redirect('/');
  });
});





app.get('/register', function(req, res){
  res.render('auth/register');
});





app.post('/login', function (req, res, next) {


  authenticate(req.body.username, req.body.password, req.body.email, function(err, user){
    if (err) return next(err)
    if (user) {
    
	    
      // Regenerate session when signing in
      // to prevent fixation
	    
      req.session.regenerate(function(){

        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.Username;
        return res.redirect('/');
      });
    }
    else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.';
      return res.redirect('/login');
    }
        
    
    
  })
}



);


app.post('/register',  function (req, res, next) {
  utility.register(req.body.username, req.body.password, req.body.email, function(err, user){
    if (err) {
      req.session.error = 'Registration failed: ' + err;
      return res.redirect('/register');
    }
    
    if (user != null) {
      // Regenerate session when signing in
      
      // to prevent fixation
      req.session.regenerate(function(){
        req.session.success = 'Registration successful';
        req.session.user = user;
        return res.redirect('/');
      });
      
      
    }
  });
});



