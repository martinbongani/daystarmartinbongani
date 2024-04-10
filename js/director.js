document.addEventListener("DOMContentLoaded", function() {
  const cardContent = document.getElementById("cardContent");

  function updateCardContent(content) {
      cardContent.textContent = content;
  }

  const menuItems = document.querySelectorAll(".dash a");

  menuItems.forEach(item => {
      item.addEventListener("click", function(event) {
          event.preventDefault();

          const target = this.getAttribute("href").substring(1);

          switch (target) {
              case "babyApplications":
                  updateCardContent("Displaying Baby Applications Content");
                  break;
              case "jobApplications":
                    updateCardContent("Displaying Job Applications Content");
                    break;
              case "financial":
                  updateCardContent("Displaying Financial Records Content");
                  break;
              case "programs":
                  updateCardContent("Displaying Programs Content");
                  break;
              case "dashboard":
                  updateCardContent("Displaying Announcements and Updates Content");
                  break;
              case "yourProfile":
                  updateCardContent("Displaying Your Profile Content");
                  break;
              case "logout":
                window.location.href = /pages/login.html;
                  break;     
              default:
                  updateCardContent("Content Not Found");
                  break;
          }
      });
  });
});