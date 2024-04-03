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
      { username: "director", password: "test123", userType: "staff" },
      { username: "accounts", password: "test123", userType: "staff" },
      { username: "procurement", password: "test123", userType: "staff" },
      { username: "sitter", password: "test123", userType: "staff" },

    ];

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      switch (user.username) {
        case "admin":
          window.location.href = "/pages/admin.html";
          break;
        case "parent":
          window.location.href = "/pages/baby.html";
          break;
        case "director":
          window.location.href = "/pages/director.html";
          break;
          case "accounts":
            window.location.href = "/pages/accounts.html";
            break;
            case "procurement":
              window.location.href = "/pages/procurement.html";
              break;  
          case "sitter":
            window.location.href = "/pages/sitter.html";
            break;  
        default:
          break;
      }
    } else {
      console.error("Invalid username or password");
    }
  });
  
});