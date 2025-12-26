/*<div class="dropdown text-end">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>*/


document.addEventListener('DOMContentLoaded', async function() {
    var vars = {
        user: null,
        host:null
    };
    vars.host = window.location.host;

    
    // check if the user is logged in 
         await fetch('/api/user/logged', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.Result === "noUser") {
                console.log("No user found");
                vars.user = null;
                
            }else{
            vars.user = data;
            console.log(data);
            }
        }

        )
        
   
    
    //set the theme to the user's preference
        if(vars.user !== null){
            if(vars.user.isDarkmode){
            var element = document.body;
            element.classList.toggle("dark-mode");
            //change icon to sun
            
            $("#lightmode").innerHTML = `<img src="http://${vars.host}/img/brightness.png" alt="sun" width="32" height="32" class="rounded-circle">`;
            $("#lightmode").id = "lightmode";
        }
        else{
            
            //change $("#lightmode") to sun
            
            $("#lightmode").innerHTML = `<img src="http://${vars.host}/img/night-mode.png" alt="sun" width="32" height="32" class="rounded-circle">`;
            $("#lightmode").id = "darkmode";
        }
// if the user is logged in, display the user's profile picture and username
            $('#header').append(`<div class="dropdown text-end">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">Units</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="/logout">Sign out</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" id="lightmode" href="#"><img src="http://${vars.host}/img/brightness.png" alt="sun" width="32" height="32" class="rounded-circle"></a></li>
          </ul>
        </div>`);
        }
        else{
            $('#header').append(`<div class="col-md-3 text-end">
        <button type="button" class="btn btn-outline-primary me-2" ><a href="/login">Login</a></button>
        <button type="button" class="btn btn-primary"><a href ="/register">Sign-Up</a></button>
      </div>`);
            
        }



    // if the user is not logged in, display a login button /register button

    // if the darkmode button is clicked, change the theme to darkmode and save the user's preference in the database 
    $('#darkmode').click(function(){
        // if the user is logged in, change the user's darkmode preference in the database
        if(vars.user !== null){
            fetch('/api/user/darkmode', {
                method: 'POST',

                headers: {


                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isDarkmode: true  
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        var element = document.body;
        element.classList.toggle("dark-mode");
        //change icon to sun
        
        $("#darkmode").innerHTML = `<img src="http://${vars.host}/img/brightness.png" alt="sun" width="32" height="32" class="rounded-circle">`;
        $("#darkmode").id = "lightmode";

    });

    // if the lightmode button is clicked, change the theme to lightmode and save the user's preference in the database
    $('#lightmode').click(function(){
        // if the user is logged in, change the user's darkmode preference in the database
        if(vars.user !== null){
            fetch('/api/user/darkmode', {
                method: 'POST',

                headers: {


                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  isDarkmode: false  
              })
          })
          .then(response => response.json())
          .then(data => {
              console.log(data);
          })
          .catch((error) => {
              console.error('Error:', error);
          });
      }
      var element = document.body;
      element.classList.toggle("dark-mode");
      //change icon to sun
      
      $('#lightmode').innerHTML = `<img src="http://${vars.host}/img/night-mode.png" alt="sun" width="32" height="32" class="rounded-circle">`;
      $('#lightmode').id = "darkmode";

  });

    






    });

    

    


