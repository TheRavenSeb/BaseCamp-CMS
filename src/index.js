// convert above to require 


const {addHours, addMinutes, addSeconds, addDays, addWeeks, addMonths, addYears} = require('date-fns');

//const TelegramBot = require('node-telegram-bot-api');


const express = require('express');
const { Client } = require('discord.js');





const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require('path');
var app = express();
const Users = require('./schemas/User.js');
const community = require("./schemas/community.js")
const Division = require("./schemas/Divisions.js")



// require the discord.js module



const fs = require("fs");
const functionDir = path.join(__dirname, 'functions');
const functions = fs.readdirSync(functionDir).filter(file => file.endsWith(".js"));
const eventDir = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventDir).filter(file => file.endsWith(".js"));
const commandsDir = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(commandsDir).filter(file => file.endsWith(".js"));

require('dotenv').config();



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




app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
// logout session after a certain period of time
app.use((req, res, next) => {
  if (req.session) {
    req.session._garbage = Date();
    req.session.touch();
  }
  next();
});

//uses ejs 
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use('/css', express.static(path.join(__dirname, 'assets/css')));
app.use('/js', express.static(path.join(__dirname, 'assets/js')));
app.use('/img', express.static(path.join(__dirname, 'assets/images')));

var Port = 8080;


const { GatewayIntentBits, EmbedBuilder,Collection } = require("discord.js");
const Discord = require("discord.js");




const bot = new Discord.Client({ intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds ] });



bot.commands = new Collection();
for(const file of functions){
  require(`./functions/${file}`)(bot);
}
bot.handleCommands(commandFolders);
bot.handleEvents(eventFiles);
module.bot = bot;




bot.on("guildMemberAdd", async (member) => {
  console.log(`New member joined: ${member.user.tag}`);

});

bot.on("guildMemberRemove", async (member) => {
  console.log(`Member left: ${member.user.tag}`);
 await Users.findOne({ DiscordId: member.user.id.toString() }).then(user => {
   if (user) {
    var unit = user.Units.find(unit => unit.GuildId !== member.guild.id.toString());
    if (unit) {
      user.Units = user.Units.filter(u => u.GuildId !== member.guild.id.toString());
      user.markModified('Units');
      user.save().then(() => {
        console.log(`Removed unit ${unit.Name} from user ${user.Username}`);
      }).catch(err => {
        console.error(`Error removing unit ${unit.Name} from user ${user.Username}:`, err);
      });
    }
   }
   }).catch(err => {
     console.error(`Error finding user with Discord ID ${member.user.id.toString()}:`, err);
   });
   });







bot.on("guildCreate", async (guild) => {
  console.log(`Joined new guild: ${guild.name}`);

  // create an infinite invite link for the guild
  var defaultChannel = guild.channels.cache.find(channel => channel.type === 0 );
  console.log(`Default channel for guild ${guild.name}: ${defaultChannel}`);
  guild.invites.create(defaultChannel.id,{ maxAge: 0, maxUses: 0 ,reason: "BaseCamp CMS Invite Generator"}).then(invite => {
    console.log(`Created an infinite invite link for guild: ${guild.name} - ${invite.url}`);
  
  

  community.findOne({ GuildId: guild.id }).then(server => {
    if (!server) {
      community.create({
        GuildId: guild.id,
        Name: guild.name,
        Owner: guild.ownerId,
        Description: "No description provided",
        DiscordInvite: invite.url
      }).then(() => {
        console.log(`New community created for guild: ${guild.name}`);
      }).catch(err => {
        console.error(`Error creating community for guild: ${guild.name}`, err);
      });
    }
    });
    }).catch(err => {
    console.error(`Error creating invite link for guild: ${guild.name}`, err);
  });
  });













app.listen(process.env.PORT || 5000,"0.0.0.0", async () => {
 console.info(`[Express] Listening on port ${Port}`);
  
 
  bot.login(process.env.token);
  
  /*if(process.env.NODE_ENV == "production"){
  bot.login(process.env.token);}*/
  
  bot.on('guildDelete', async (guild) => {
    const serverData = await community.findOne({ DiscordId: guild.id });
    if(serverData){
      await serverData.deleteOne();
    }
}); 


// SECTION  - Guild Member Update for user permissions








  





  
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
// Session configuration
app.use(session({
  secret: 'nvvorovlkdevfjvohvek jbvevdnevjdcvhebvddvdklkjhbslcsdlkjvdfodcodsihvcbjdncsoidcvhsjcneoi843834903874874050475034750980434073sdnfdcb- hfehvhescscvpipsijdbvpiapviapibv', // Replace with a strong secret
  resave: false,
 
  
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000 // 30 minutes
    
  }
}));

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







app.post('/api/user/darkmode', function(req, res){
  if(req.session && req.session.user){

    Users.findOne({Username: req.session.user.Username}).then((user) => {
      user.isDarkmode = req.body.isDarkmode;
      user.save();
      res.send({Result: "success"});
    })
  }
  else{
    res.send({Result: "noUser"});
  }

});



});


app.post('/register', async (req, res) => {
  const { username, password, email, ingameName, avatar, steamId } = req.body;
  try {
    utility.register(username, password, email, ingameName, steamId, async (err, user) => {
      if (err) {
        req.session.error = err.message;
        return res.redirect('/register');
      }
      if (user) {
        user.Avatar = avatar;
        await user.save();
        req.session.user = user;
        req.session.success = 'User registered successfully';
        return res.redirect('/login');
      }
    });
  } catch (err) {
    console.log(err);
    req.session.error = 'An error occurred during registration';
    return res.redirect('/register');
  }
});

app.get('/register', (req, res) => {
  res.render('auth/register', { message: req.session.message || '' });
});

app.get('/login', (req, res) => {
  res.render('auth/login', { message: req.session.message || '' });
});

app.post('/login', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    utility.authenticate(username, password, email, (err, user) => {
      if (err) {
        req.session.error = err.message;
        return res.redirect('/login');
      }
      if (user) {
        req.session.user = user;
        req.session.success = 'User logged in successfully';
        return res.redirect('/');
      } else {
        req.session.error = 'Invalid username, password, or email';
        return res.redirect('/login');
      }
    });
  } catch (err) {
    console.log(err);
    req.session.error = 'An error occurred during login';
    return res.redirect('/login');
  }
});




