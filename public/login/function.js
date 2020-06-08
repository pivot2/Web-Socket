let btn=document.getElementById("login-button");
let alert=document.getElementById("alert");
btn.addEventListener("click",function(){
  let username=document.getElementById('name').value;
  let password=document.getElementById('password').value;
  fetch('/login/api/',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      'username':username,
      'password':password
    })
  }).then(function(res)
    {
      if (res.ok)
      {
        localStorage.user=username;
        location.href='/chat-board';
      }
      else {
        return res.json();
      }
    })
    .then(function(res){ 
      //let {register,mess}=res.body;
      alert.innerHTML=res.message;
      alert.style.visibility="visible";
    })  
});
