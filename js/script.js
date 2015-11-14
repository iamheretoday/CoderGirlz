console.log('run_script');
var obj_app;
obj_app = new Crud_objects();
obj_app.token = atob("YjgzODY4ZDQ2M2JiN2M2NTM5ZWNjNWQ1MTgwYmQ5ZWNiYThjZTgxMg==");
obj_app.auth_type = 'token';
obj_app.username = 'iamheretoday';
obj_app.github = obj_app.method_github();
obj_app.user = obj_app.method_getuser();
obj_app.gist_list = obj_app.method_usergists();

















var inputs= document.getElementsByTagName('input');

inputs[3].addEventListener('click',function(){
    obj_app.email_client.method_params();

});






