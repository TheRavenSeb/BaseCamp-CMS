/**!SECTION
 * Account related functions
 * @module account
    * @since 1.0.0
    * @version 1.0.0
    @description Account related functions for the accounts page and account settings page
    */ 
 

    var vars = {
        user: null
    };

    function getUserData() {
        // fetch form the /api/user/Logged
        fetch('/api/user/logged', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()).then(data => {
            if(data.Result == "noUser"){
                return window.location.href = "/login";
            }
            vars.user = data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }


    document.addEventListener('DOMContentLoaded', function() {
        // Get the user data
        getUserData();

        // Logout button
        document.getElementById('logout').addEventListener('click', function() {
          return window.location.href = "/logout";

        });

        //TODO - Add the account settings page
        // - add a timeout after a certian 

    });