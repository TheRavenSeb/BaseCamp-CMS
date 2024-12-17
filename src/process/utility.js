// Desc: Utility functions for the bot
// Usage:
// const utility = require("./utility.js") || const { functionName } = require("./utility.js")
// utility.functionName()
//

const bkfd2Password = require("pbkdf2-password");

const Users = require('../schemas/User.js');
const mongoose = require('mongoose');



function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


const hash = bkfd2Password();




/**
 * 
 * @param {string} index 
 * @returns 
 */
Array.prototype.insert = function(index) {
	this.splice.apply(this, [index, 0].concat(
		Array.prototype.slice.call(arguments, 1)));
	return this;
};




      
      
    
  

        
    



//utility functions

/**
 * 
 * @param {object} addedTime
 * @param {object} date
 * @returns {object} - Returns the new date with the added time.
 *  
 * 
 * */

function addTimeToDate(addedTime, date){
  let generatedTime = date.getTime();
  if(addedTime.seconds) generatedTime += 1000 * addedTime.seconds; //check for additional seconds 
  if(addedTime.minutes) generatedTime += 1000* 60 * addedTime.minutes; //check for additional minutes 
  if(addedTime.hours) generatedTime += 1000 * 60 * 60 * addedTime.hours; //check for additional hours 
  return new Date(generatedTime);
 }
 




/**
 * Register a new user with the given username and password.
 * @param {string} username
 * @param {string} password
 * @param {function} fn
 * @returns {fn} - Returns an error if the user is already registered, otherwise returns the user.
 */
async function register(username, password,email ,fn) {
    try{
      console.log("registering user");
  
  
      //check is user already registered 
      // store user in db
      var user = await Users.findOne({Username: username, Email: email});
        if(!user){
          hash({ password: password }, async function (err, pass, salt, hash) {
            if (err) return fn(new Error(err));
            // store the salt & hash in the "db"
      
            Users.create({Username: username, Hash: hash, Salt: salt, Email: email}).then((user) => {
                console.log("user created");
                fn(null, user);
            }
            );
              
              
        
        });
      }
          
  
        else if(user.Salt){
          console.log("user already registered");
          return fn(new Error('user already registered'));
        }
        
  
      //return
      
    fn(null, null);}catch(err){
      console.log(err);
    }
  }   

//disocrd functions
/**
 * 
 * @param {string} userId 
 */    

            

module.exports = {
   
    
    register: register,
    addTimeToDate: addTimeToDate,
    sleep: sleep,
    

    


    
}


