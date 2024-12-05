$(document).ready(function () {
  fetchFieldNames("field_details");
  fetchFieldNames("staff_field_details");
  fetchFieldNames("log_field_details");
  fetchStaffNames("log_staff_details");
  fetchStaffNames("vehicle_staff_details");
  fetchFieldNames("equip_field_details");
  fetchStaffNames("equip_staff_details");
});

function fetchFieldNames(targetElementId) {
  $.ajax({
    url: "http://localhost:5050/green-shadow/api/v1/field/getallfieldnames",
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      console.log("Field name: ", response);

      $(`#${targetElementId}`)
        .empty()
        .append($("<option>", { value: "", text: "Select Field" }));

      response.forEach((field) => {
        console.log(field);
        $(`#${targetElementId}`).append(
          $("<option>", { value: field, text: field })
        );
      });
    },
    error: function (xhr, status, error) {
      console.error("Error fetching field names:", status, error);
    },
  });
}

function fetchStaffNames(targetElementId) {
  $.ajax({
    url: " http://localhost:5050/green-shadow/api/v1/staff/getallstaffnames",
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      console.log("Staff name: ", response);

      $(`#${targetElementId}`)
        .empty()
        .append($("<option>", { value: "", text: "Select Staff Member" }));

      response.forEach((staff) => {
        console.log(staff);
        $(`#${targetElementId}`).append(
          $("<option>", { value: staff, text: staff })
        );
      });
    },
    error: function (xhr, status, error) {
      console.error("Error fetching staff member names:", status, error);
    },
  });
}
