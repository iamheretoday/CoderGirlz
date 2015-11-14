/** EMAIL SETUP CAN BE LOADED AFTER DOM_CONTENT TO SPEED LOAD*/

myVar = setInterval(wait,4000);

function wait() {

    console.log('email');

    obj_app.email_client = new mandrill.Mandrill(atob("ZUNKYmRjcUdoS2NwSlpRMlowZ3kzUQ=="));

    obj_app.email_client.method_random_code = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        this["random_code"] = text;
    };

    obj_app.email_client.method_send_email = function () {
        console.log(this);
        this.messages.send(this.params, function (res) {
            console.log(res);
        }, function (err) {
            console.log(err);
        });
    };

    obj_app.email_client.method_params = function () {

        number = parseInt(obj_app.number_id_json.number);
        number++;
        obj_app.number_id_json.number = number;
        obj_app.number_id_object_read.files["number_id.JSON"].content = JSON.stringify(obj_app.number_id_json);

        obj_app.number_id_object_unread.update(obj_app.number_id_object_read, function () {

        });
        console.log(this);
        obj_app.email_client.method_random_code();
        this.html_string = "Congradulations  " + crud_input_username.value + "! Your username will be geekwiseuser" + number + '\ <br />' + "PASSWORD : code12345 "+ '\ <br />' +
        "Here are some links we will be working with today: "+ '\ <br />' +
        " \ <a href='https://github.com/'> Github</a>" + '\ <br />' +
        " \ <a href='https://c9.io/' > Cloud 9</a>" + '\ <br />' + " \ <a href='http://jperez4509.github.io/bootcamp2/links.html'>Handy Links </a>";
        this.params = {
            "message": {
                "from_email": "vinsonfernandez27@gmail.com",
                "to": [{"email": crud_input_email.value}],
                "subject": "Coder Girlz",
                "html": this.html_string
            }
        };


        console.log(obj_app);

        obj_app.user_database_json[crud_input_username.value] = {};
        obj_app.user_database_json[crud_input_username.value].school = crud_input_school.value;
        obj_app.user_database_json[crud_input_username.value].email = crud_input_email.value;

        obj_app.user_database_object_read.files["user_database.JSON"].content = JSON.stringify(obj_app.user_database_json);

        obj_app.user_database_object_unread.update(obj_app.user_database_object_read, function () {
            /**
             * sending email to new user
             */
            alert('updated gist');
            obj_app.email_client.method_send_email();
            alert('sent email verification');
        });
    };
    clearInterval(myVar);
}




