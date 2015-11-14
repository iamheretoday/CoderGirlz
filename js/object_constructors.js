console.log('object_constructors');

function Crud_objects() {

    /**DECLARATION*/
    this.username = '';
    this.password = '';
    this.token = '';
    this.auth_type = '';
    /**DECLARATION*/




    /**CREATE CONNECTION TO GITHUB*/
    this.method_github = function () {
        if (this.auth_type === "token") {
            return new Github({
                token: this.token,
                auth: "basic"
            });
        }else{
            return new Github({
                username: this.username,
                password: this.password,
                auth: "basic"
            });
        }
    };
    /**CREATE CONNECTION TO GITHUB*/




    /**CREATE USER OBJECT*/
    this.method_getuser =function(){
        return this.github.getUser();
    };
    /**CREATE USER OBJECT*/


    /**CREATE USER GIST LIST - HAS CALLBACK SO SYNC CAN BE ISSUE [WARNING]*/
    this.method_usergists=function() {
        window['usergist']= this;
        return this.user.userGists.bind(this)(this.username, function (err, res) {
            window['usergist'].gist_list =res;
            window['usergist'].callback_usergists();
        });
    };
    /**CREATE USER GIST LIST - HAS CALLBACK SO SYNC CAN BE ISSUE [WARNING]*/


    /**CALLBACK FOR CREATE USER GIST LIST - THIS WILL RUN WHEN DATA IS RETURNED*/
    this.callback_usergists= function(){
        this.method_getdatabase('number_id');
        this.method_getdatabase('user_database');

    };
    /** THIS GETS ALL DATABASES IN GIST LIST*/
    this.method_getdatabase=function(database){
        window['getdatabase']=this;

        for (var i = 0;i<this.gist_list.length;i++){
            var db = database;
            if (this.gist_list[i].description=== db){
                this[db + "_object_unread"] = this.github.getGist(this.gist_list[i].id);
            }
        }
        this[db +"_object_unread"].read(function(err,res){
            window['getdatabase'][db +"_object_read"] = res;// enables content to be readable
            window['getdatabase'][db +"_json"] = window['getdatabase'][db +"_object_read"].files[db+".JSON"].content;//gets content as string
            window['getdatabase'][db +"_json"] = JSON.parse( window['getdatabase'][db +"_json"] );// turns string into object
            if (db === 'gist_database') {
                all_loaded();
                page_turn('login');
                console.log(db)
            }

        });
    };
}
/**CALLBACK FOR CREATE USER GIST LIST - THIS WILL RUN WHEN DATA IS RETURNED*/




