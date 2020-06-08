let btn=document.getElementById("signup-button");
let alert=document.getElementById("alert");

btn.addEventListener("click",function(){
  let username=document.getElementById('username').value;
  let password=document.getElementById('password').value;
  let rwpass=document.getElementById('rewrite-password').value;
  if (username.length<6||password.length<6)
  {
    alert.innerHTML="Tên đăng nhập và mật khẩu không được ít hơn 6 kí tự";
    alert.style.visibility="visible";
    return false;
  }
  if (rwpass.trim()!=password.trim())
  {
    alert.innerHTML="Nhập lại mật khẩu sai";
    alert.style.visibility="visible";
    return false;
  }
  alert.style.visibility="hidden";
  fetch('/signup/api/',{
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
        location.href='/login';
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
