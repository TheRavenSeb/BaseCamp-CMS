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
        user: null
    };
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
    // if the user is logged in, display the user's profile picture and username
        if(vars.user !== null){

            $('#header').append(`<div class="dropdown text-end">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="/logout">Sign out</a></li>
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


    });

    // if the user is not logged in, display a login button /register button

    // if the user is logged in, display a dropdown menu with options to create a new project, view settings, view profile, and sign out

    // if the user is not logged in, display a dropdown menu with options to sign in or register

    // if the user is logged in, display the user's profile picture and username in the dropdown menu

    // if the user is not logged in, display a login button /register button in the dropdown menu

    


