$(document).ready(function () {
  loadStaff();
});

var recordIndex;

function loadStaff() {
  $.ajax({
    url: "http://localhost:5050/green-shadow/api/v1/staff",
    type: "GET",
    contentType: "application/json",
    success: function (staff) {
      console.log("Staff loaded:", staff);
      $("#staff-table").empty();

      staff.forEach(function (staff) {
        const fullName = staff.first_name + " " + staff.last_name;
        var record = `
                    <tr style="cursor: pointer">
                        <td class="staff-name-value">${fullName}</td>
                        <td class="staff-designation-value">${staff.designation}</td>
                        <td class="staff-gender-value">${staff.gender}</td>
                        <td class="staff-joinedDate-value">${staff.joined_date}</td>
                        <td class="staff-dob-value">${staff.dob}</td>
                        <td class="staff-address-value">${staff.address}</td>
                        <td class="staff-contact-value">${staff.contact_no}</td>
                        <td class="staff-email-value">${staff.email}</td>
                        <td class="staff-role-value">${staff.role}</td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
        $("#staff-table").append(record);
      });

      $("#staff-table").on("click", ".update-button", function () {
        const row = $(this).closest("tr");

        const fullName = row.find(".staff-name-value").text();
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ");
        const staffDesignation = row.find(".staff-designation-value").text();
        const staffGender = row.find(".staff-gender-value").text();
        const staffJoinedDate = row.find(".staff-joinedDate-value").text();
        const staffDob = row.find(".staff-dob-value").text();
        const staffAddress = row.find(".staff-address-value").text();
        const staffContact = row.find(".staff-contact-value").text();
        const staffEmail = row.find(".staff-email-value").text();
        const staffRole = row.find(".staff-role-value").text();

        $("#first_name").val(firstName);
        $("#last_name").val(lastName);
        $("#designation").val(staffDesignation);
        $("#gender").val(staffGender);
        $("#joinedDate").val(staffJoinedDate);
        $("#dob").val(staffDob);
        $("#address").val(staffAddress);
        $("#contact").val(staffContact);
        $("#email").val(staffEmail);
        $("#role").val(staffRole);
      });
    },
    error: function (xhr, status, error) {
      console.error("Failed to load staff:", error);
      alert("An error occurred while loading the staff data.");
    },
  });
}

$("#staff-table").on("click", ".delete-button", function () {
  const row = $(this).closest("tr");

  const fullName = row.find(".staff-name-value").text();
  const firstName = fullName.split(" ")[0];

  $.ajax({
    url: `http://localhost:5050/green-shadow/api/v1/staff/getstaffid/${firstName}`,
    method: "GET",
    success: function (id) {
      console.log("Fetched staff id:", id);

      $.ajax({
        url: `http://localhost:5050/green-shadow/api/v1/staff/${id}`,
        method: "DELETE",
        contentType: "application/json",
        success: function (results) {
          fetchStaffNames("vehicle_staff_details")
          console.log(results);
          Swal.fire({
            title: "Staff Member Delete",
            text: "Staff Member Successfully Deleted",
            icon: "success"
          });
          loadStaff();
        },
        error: function (error) {
          console.log("Status:", status);
          console.log("Error:", error);
          Swal.fire({
            title: "Staff Member Delete",
            text: "Staff Member Delete Unsuccessfull",
            icon: "error"
          });
          loadStaff();
        },
      });
    },
    error: function (error) {
      alert("Error fetching staff id: " + error.responseText);
      console.error(error);
    },
  });
});

function saveStaff() {
  var first_name = $("#first_name").val();
  var last_name = $("#last_name").val();
  var designation = $("#designation").val();
  var gender = $("#gender").val();
  var joined_date = $("#joined_date").val();
  var dob = $("#dob").val();
  var address = $("#address").val();
  var contact = $("#contact").val();
  var email = $("#email").val();
  var role = $("#role").val();
  var field_name = $("#staff_field_details").val();

  const fields = field_name ? [{ field_name: field_name }] : [];

  $.ajax({
    url: " http://localhost:5050/green-shadow/api/v1/staff",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      designation: designation,
      gender: gender,
      joined_date: joined_date,
      dob: dob,
      address: address,
      contact_no: contact,
      email: email,
      role: role,
      fields: fields,
    }),
    success: function (result) {
      clearStaffForm();
      fetchStaffNames("vehicle_staff_details")
      console.log(result);
      Swal.fire({
        title: "Staff Member Save",
        text: "Staff Member Successfully Saved",
        icon: "success"
      });
      loadStaff();
    },
    error: function (result) {
      clearStaffForm();
      Swal.fire({
        title: "Staff Member Save",
        text: "Staff Member Save Unsuccessfull",
        icon: "error"
      });
      console.log(result);
      loadStaff();
    },
  });
}

function updateStaff() {
  var firstName = $("#first_name").val();
  var last_name = $("#last_name").val();
  var designation = $("#designation").val();
  var gender = $("#gender").val();
  var joined_date = $("#joined_date").val();
  var dob = $("#dob").val();
  var address = $("#address").val();
  var contact = $("#contact").val();
  var email = $("#email").val();
  var role = $("#role").val();
  var field_name = $("#staff_field_details").val();

  const fields = field_name ? [{ field_name: field_name }] : [];

  $.ajax({
    url: `http://localhost:5050/green-shadow/api/v1/staff/getstaffid/${firstName}`,
    type: "GET",
    success: function (staffId) {
      console.log("Fetched staff id:", staffId);

      const updatedStaffData = {
        id: staffId,
        first_name: firstName,
        last_name: last_name,
        designation: designation,
        gender: gender,
        joined_date: joined_date,
        dob: dob,
        address: address,
        contact_no: contact,
        email: email,
        role: role,
        fields: fields,
      };

      $.ajax({
        url: `http://localhost:5050/green-shadow/api/v1/staff/${staffId}`,
        type: "PATCH",
        contentType: "application/json",
        data: JSON.stringify(updatedStaffData),
        success: function () {
          clearStaffForm();
          Swal.fire({
            title: "Staff Member Update",
            text: "Staff Member Successfully Updated",
            icon: "success"
          });
          loadStaff();
        },
        error: function (error) {
          clearStaffForm();
          Swal.fire({
            title: "Staff Member Update",
            text: "Staff Member Update Unsuccessfull",
            icon: "error"
          });
          console.error(error.responseText);
        },
      });
    },
    error: function (error) {
      alert("Error fetching staff id: " + error.responseText);
      console.error(error);
    },
  });
}

function clearStaffForm() {
  $("#first_name").val("");
  $("#last_name").val("");
  $("#designation").val("");
  $("#gender").val("");
  $("#joined_date").val("");
  $("#dob").val("");
  $("#address").val("");
  $("#contact").val("");
  $("#email").val("");
  $("#role").val("");
  $("#staff_field_details").val("");
  $("#vehicle_name").val("");
}
