
$("#login-section").css({ display: "block" });
$("#dashboard-section").css({ display: "none" });
$("#field-section").css({ display: "none" });
$("#crop-section").css({ display: "none" });
$("#staff-section").css({ display: "none" });
$("#monitoring-section").css({ display: "none" });
$("#vehicle-section").css({ display: "none" });
$("#equipment-section").css({ display: "none" });

function login() {
  Swal.fire({
    title: "Welcome",
    text: "You have successfully logged In",
    icon: "success"
  });
  $("#login-section").css({ display: "none" });
  $("#dashboard-section").css({ display: "block" });
  $("#field-section").css({ display: "none" });
  $("#crop-section").css({ display: "none" });
  $("#staff-section").css({ display: "none" });
  $("#monitoring-section").css({ display: "none" });
  $("#vehicle-section").css({ display: "none" });
  $("#equipment-section").css({ display: "none" });

  $("#navbar").css({ display: "block", position: "fixed", top: "0", left: "0", width: "100%", zIndex: "1000", })
  $("#dashboard-section").css({
    marginTop: $("#navbar").outerHeight() + "px",
  });

  $("#field-section").css({
    marginTop: $("#navbar").outerHeight() + "px",
  });

  $("#crop-section").css({
    marginTop: $("#navbar").outerHeight() + "px",
  });

  $("#staff-section").css({
    marginTop: $("#navbar").outerHeight() + "px",
  });

  $("#monitoring-section").css({
    marginTop: $("#navbar").outerHeight() + "px",
  });

  $("#vehicle-section").css({
    marginTop: $("#navbar").outerHeight() + "px",
  });

  $("#equipment-section").css({
    marginTop: $("#navbar").outerHeight() + "px",
  });
}
$("#nav-dashboard").on("click", () => {
  $("#dashboard-section").css({ display: "block" });
  $("#field-section").css({ display: "none" });
  $("#crop-section").css({ display: "none" });
  $("#staff-section").css({ display: "none" });
  $("#monitoring-section").css({ display: "none" });
  $("#vehicle-section").css({ display: "none" });
  $("#equipment-section").css({ display: "none" });
});

$("#nav-field").on("click", () => {
  $("#field-section").css({ display: "block" });
  $("#dashboard-section").css({ display: "none" });
  $("#crop-section").css({ display: "none" });
  $("#staff-section").css({ display: "none" });
  $("#monitoring-section").css({ display: "none" });
  $("#vehicle-section").css({ display: "none" });
  $("#equipment-section").css({ display: "none" });
});

$("#nav-crop").on("click", () => {
  $("#crop-section").css({ display: "block" });
  $("#dashboard-section").css({ display: "none" });
  $("#field-section").css({ display: "none" });
  $("#staff-section").css({ display: "none" });
  $("#monitoring-section").css({ display: "none" });
  $("#vehicle-section").css({ display: "none" });
  $("#equipment-section").css({ display: "none" });
});

$("#nav-staff").on("click", () => {
  $("#staff-section").css({ display: "block" });
  $("#crop-section").css({ display: "none" });
  $("#dashboard-section").css({ display: "none" });
  $("#field-section").css({ display: "none" });
  $("#monitoring-section").css({ display: "none" });
  $("#vehicle-section").css({ display: "none" });
  $("#equipment-section").css({ display: "none" });
});

$("#nav-monitor-log").on("click", () => {
  $("#monitoring-section").css({ display: "block" });
  $("#staff-section").css({ display: "none" });
  $("#crop-section").css({ display: "none" });
  $("#dashboard-section").css({ display: "none" });
  $("#field-section").css({ display: "none" });
  $("#vehicle-section").css({ display: "none" });
  $("#equipment-section").css({ display: "none" });
});

$("#nav-vehicle").on("click", () => {
  $("#vehicle-section").css({ display: "block" });
  $("#monitoring-section").css({ display: "none" });
  $("#staff-section").css({ display: "none" });
  $("#crop-section").css({ display: "none" });
  $("#dashboard-section").css({ display: "none" });
  $("#field-section").css({ display: "none" });
  $("#equipment-section").css({ display: "none" });
});

$("#nav-equipment").on("click", () => {
  $("#equipment-section").css({ display: "block" });
  $("#vehicle-section").css({ display: "none" });
  $("#monitoring-section").css({ display: "none" });
  $("#staff-section").css({ display: "none" });
  $("#crop-section").css({ display: "none" });
  $("#dashboard-section").css({ display: "none" });
  $("#field-section").css({ display: "none" });
});

// // Save the current section to localStorage
// function saveCurrentSection(sectionId) {
//   localStorage.setItem("currentSection", sectionId);
// }

// // Load the saved section from localStorage
// function loadSavedSection() {
//   const savedSection = localStorage.getItem("currentSection") || "login-section";
//   $(".section").css({ display: "none" }); // Hide all sections
//   $(`#${savedSection}`).css({ display: "block" }); // Show the saved section

//   // If the saved section is not the login-section, show the navbar
//   if (savedSection !== "login-section") {
//     $("#navbar").css({
//       display: "block",
//       position: "fixed",
//       top: "0",
//       left: "0",
//       width: "100%",
//       zIndex: "1000",
//     });

//     $(".section").css({
//       marginTop: $("#navbar").outerHeight() + "px",
//     });
//   }
// }

// // On document ready, load the saved section
// $(document).ready(function () {
//   loadSavedSection();
// });

// // Login function
// function login() {
//   Swal.fire({
//     title: "Welcome",
//     text: "You have successfully logged in",
//     icon: "success",
//   });

//   saveCurrentSection("#dashboard-section");
//   loadSavedSection();
// }

// // Navigation button click handlers
// $("#nav-dashboard").on("click", () => {
//   saveCurrentSection("#dashboard-section");
//   loadSavedSection();
// });

// $("#nav-field").on("click", () => {
//   saveCurrentSection("#field-section");
//   loadSavedSection();
// });

// $("#nav-crop").on("click", () => {
//   saveCurrentSection("#crop-section");
//   loadSavedSection();
// });

// $("#nav-staff").on("click", () => {
//   saveCurrentSection("#staff-section");
//   loadSavedSection();
// });

// $("#nav-monitor-log").on("click", () => {
//   saveCurrentSection("#monitoring-section");
//   loadSavedSection();
// });

// $("#nav-vehicle").on("click", () => {
//   saveCurrentSection("#vehicle-section");
//   loadSavedSection();
// });

// $("#nav-equipment").on("click", () => {
//   saveCurrentSection("#equipment-section");
//   loadSavedSection();
// });
