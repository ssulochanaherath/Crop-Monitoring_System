$(document).ready(function () {
  loadVehicle();
});

var recordIndex;

function loadVehicle() {
  $.ajax({
    url: "http://localhost:5050/green-shadow/api/v1/vehicle",
    type: "GET",
    contentType: "application/json",
    success: function (vehicle) {
      console.log("Vehicle loaded:", vehicle);
      $("#vehicle-table").empty();

      vehicle.forEach(function (vehicle) {
        var record = `
                    <tr style="cursor: pointer">
                        <td class="vehicle-license-value">${vehicle.licensePlateNumber}</td>
                        <td class="vehicle-category-value">${vehicle.vehicleCategory}</td>
                        <td class="vehicle-fuel-value">${vehicle.fuelType}</td>
                        <td class="vehicle-status-value">${vehicle.status}</td>
                        <td class="vehicle-remarks-value">${vehicle.remarks}</td>
                        <td class="vehicle-staff-value">${vehicle.assigned_staff.first_name}</td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
        $("#vehicle-table").append(record);
      });

      $("#vehicle-table").on("click", ".update-button", function () {
        const row = $(this).closest("tr");

        const license_plate_number = row.find(".vehicle-license-value").text();
        const category = row.find(".vehicle-category-value").text();
        const fuel = row.find(".vehicle-fuel-value").text();
        const status = row.find(".vehicle-status-value").text();
        const remarks = row.find(".vehicle-remarks-value").text();
        const staff = row.find(".vehicle-staff-value").text();

        $("#license_plate").val(license_plate_number);
        $("#category").val(category);
        $("#fuel_type").val(fuel);
        $("#status").val(status);
        $("#vehicle_staff_details").val(staff);
        $("#remarks").val(remarks);
      });
    },
    error: function (xhr, status, error) {
      console.error("Failed to load vehicle:", error);
      alert("An error occurred while loading the vehicle data.");
    },
  });
}

$("#vehicle-table").on("click", ".delete-button", function () {
  const row = $(this).closest("tr");

  const licenseNumber = row.find(".vehicle-license-value").text();

  $.ajax({
    url: `http://localhost:5050/green-shadow/api/v1/vehicle/getvehiclecode/${licenseNumber}`,
    method: "GET",
    success: function (vehicleCode) {
      console.log("Fetched vehicle Code:", vehicleCode);

      $.ajax({
        url: `http://localhost:5050/green-shadow/api/v1/vehicle/${vehicleCode}`,
        method: "DELETE",
        contentType: "application/json",
        success: function (results) {
          console.log(results);
          Swal.fire({
            title: "Vehicle Delete",
            text: "Vehicle Successfully Deleted",
            icon: "success"
          });
          loadVehicle();
        },
        error: function (error) {
          console.log("Status:", status);
          console.log("Error:", error);
          Swal.fire({
            title: "Vehicle Delete",
            text: "Vehicle Delete Unsuccessfull",
            icon: "error"
          });
          loadVehicle();
        },
      });
    },
    error: function (error) {
      alert("Error fetching equipment id: " + error.responseText);
      console.error(error);
    },
  });
});

function saveVehicle() {
  var license_plate_number = $("#license_plate").val();
  var vehicle_category = $("#category").val();
  var fuel_type = $("#fuel_type").val();
  var status = $("#status").val();
  var assigned_staff = $("#vehicle_staff_details").val();
  var remarks = $("#remarks").val();

  $.ajax({
    url: " http://localhost:5050/green-shadow/api/v1/vehicle",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      licensePlateNumber: license_plate_number,
      vehicleCategory: vehicle_category,
      fuelType: fuel_type,
      status: status,
      remarks: remarks,
      assigned_staff: {
        first_name: assigned_staff,
      },
    }),
    success: function (result) {
      clearVehicleForm();
      loadVehicle();
      console.log(result);
      Swal.fire({
        title: "Vehicle Save",
        text: "Vehicle Successfully Saved",
        icon: "success"
      });
    },
    error: function (result) {
      clearVehicleForm();
      Swal.fire({
        title: "Vehicle Save",
        text: "Vehicle Save Unsuccessfull",
        icon: "error"
      });
      console.log(result);
    },
  });
}

$("#vehicle-table").on("click", "tr", function () {
  let index = $(this).index();
  recordIndex = index;

  let license_plate_number = $(this).find(".vehicle-license-value").text();
  let category = $(this).find(".vehicle-category-value").text();
  let fuel_type = $(this).find(".vehicle-fuel-value").text();
  let status = $(this).find(".vehicle-status-value").text();
  let remarks = $(this).find(".vehicle-remarks-value").text();
  let staff = $(this).find(".vehicle-staff-value").text();

  $("#license_plate").val(license_plate_number);
  $("#category").val(category);
  $("#fuel_type").val(fuel_type);
  $("#status").val(status);
  $("#vehicle_staff_details").val(staff);
  $("#remarks").val(remarks);
});

function updateVehicle() {
  var licenseNumber = $("#license_plate").val();
  var vehicle_category = $("#category").val();
  var fuel_type = $("#fuel_type").val();
  var status = $("#status").val();
  var assigned_staff = $("#vehicle_staff_details").val();
  var remarks = $("#remarks").val();

  $.ajax({
    url: `http://localhost:5050/green-shadow/api/v1/vehicle/getvehiclecode/${licenseNumber}`,
    type: "GET",
    success: function (vehicleCode) {
      console.log("Fetched vehicle code:", vehicleCode);

      const updatedVehicleData = {
        vehicle_code: vehicleCode,
        licensePlateNumber: licenseNumber,
        vehicleCategory: vehicle_category,
        fuelType: fuel_type,
        status: status,
        remarks: remarks,
        assigned_staff: {
          first_name: assigned_staff,
        },
      };

      $.ajax({
        url: `http://localhost:5050/green-shadow/api/v1/vehicle/${vehicleCode}`,
        type: "PATCH",
        contentType: "application/json",
        data: JSON.stringify(updatedVehicleData),
        success: function () {
          clearVehicleForm();
          Swal.fire({
            title: "Vehicle Update",
            text: "Vehicle Successfully Updated",
            icon: "success"
          });
          loadVehicle();
        },
        error: function (error) {
          clearVehicleForm();
          loadVehicle();
          Swal.fire({
            title: "Vehicle Update",
            text: "Vehicle Update Unsuccessfull",
            icon: "error"
          });
          console.error(error.responseText);
        },
      });
    },
    error: function (error) {
      alert("Error fetching vehicle code: " + error.responseText);
      console.error(error);
    },
  });
}

function clearVehicleForm() {
  $("#license_plate").val("");
  $("#category").val("");
  $("#fuel_type").val("");
  $("#status").val("");
  $("#vehicle_staff_details").val("");
  $("#remarks").val("");
}
