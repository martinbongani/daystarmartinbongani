document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    const username = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;
    const userType = document.querySelector("select.form-select").value;
    const rememberMe = document.getElementById("remember").checked;
    
    // login data
    const users = [
      { username: "admin", password: "123", userType: "admin" },
      { username: "parent", password: "test123", userType: "parent" },
      { username: "staff", password: "test123", userType: "staff" },
    ];

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      switch (user.userType) {
        case "admin":
          window.location.href = "/pages/admin.html";
          break;
        case "parent":
          window.location.href = "/pages/baby.html";
          break;
        case "staff":
          window.location.href = "/pages/director.html";
          break;
        default:
          break;
      }
    } else {
      console.error("Invalid username or password");
    }
  });
  
});