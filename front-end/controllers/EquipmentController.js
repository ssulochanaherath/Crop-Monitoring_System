$(document).ready(function () {
  loadEquipment();
});

var recordIndex;

function loadEquipment() {
  $.ajax({
    url: "http://localhost:5050/green-shadow/api/v1/equipment",
    type: "GET",
    contentType: "application/json",
    success: function (equipment) {
      console.log("Equipment loaded:", equipment);
      $("#equipment-table").empty();

      equipment.forEach(function (equipment) {
        var record = `
                    <tr>
                        <td class="equip-name-value">${equipment.name}</td>
                        <td class="equip-type-value">${equipment.type}</td>
                        <td class="equip-status-value">${equipment.status}</td>
                        <td class="equip-staff-value">${equipment.assigned_staff.first_name}</td>
                        <td class="equip-field-value">${equipment.assigned_field.field_name}</td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
        $("#equipment-table").append(record);
      });
      $("#equipment-table").on("click", ".update-button", function () {
        const row = $(this).closest("tr");

        const equip_name = row.find(".equip-name-value").text();
        const equip_type = row.find(".equip-type-value").text();
        const equip_status = row.find(".equip-status-value").text();
        const equip_assigned_staff = row.find(".equip-staff-value").text();
        const equip_assigned_field = row.find(".equip-field-value").text();

        $("#equipment_name").val(equip_name);
        $("#equipment_type").val(equip_type);
        $("#equipment_status").val(equip_status);
        $("#equip_staff_details").val(equip_assigned_staff);
        $("#equip_field_details").val(equip_assigned_field);
      });
    },
    error: function (xhr, status, error) {
      console.error("Failed to load equipment:", error);
      alert("An error occurred while loading the equipment data.");
    },
  });
}

$("#equipment-table").on("click", ".delete-button", function () {
  const row = $(this).closest("tr");

  const equipmentName = row.find(".equip-name-value").text();

  $.ajax({
    url: `http://localhost:5050/green-shadow/api/v1/equipment/getequipId/${equipmentName}`,
    method: "GET",
    success: function (equipmentId) {
      console.log("Fetched equipment Code:", equipmentId);

      $.ajax({
        url: `http://localhost:5050/green-shadow/api/v1/equipment/${equipmentId}`,
        method: "DELETE",
        contentType: "application/json",
        success: function (results) {
          console.log(results);
          Swal.fire({
            title: "Equipment Delete",
            text: "Equipment Successfully Deleted",
            icon: "success"
          });
          loadEquipment();
        },
        error: function (error) {
          console.log("Status:", status);
          console.log("Error:", error);
          Swal.fire({
            title: "Equipment Delete",
            text: "Equipment Delete Unsuccessfull",
            icon: "error"
          });
          loadEquipment();
        },
      });
    },
    error: function (error) {
      alert("Error fetching equipment id: " + error.responseText);
      console.error(error);
    },
  });
});

function saveEquipment() {
  var equipment_name = $("#equipment_name").val();
  var equipment_type = $("#equipment_type").val();
  var equipment_status = $("#equipment_status").val();
  var assigned_staff = $("#equip_staff_details").val();
  var assigned_field = $("#equip_field_details").val();

  $.ajax({
    url: " http://localhost:5050/green-shadow/api/v1/equipment",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      name: equipment_name,
      type: equipment_type,
      status: equipment_status,
      remarks: remarks,
      assigned_staff: {
        first_name: assigned_staff,
      },
      assigned_field: {
        field_name: assigned_field,
      },
    }),
    success: function (result) {
      clearEquipForm();
      loadEquipment();
      console.log(result);
      Swal.fire({
        title: "Equipment Save",
        text: "Equipment Successfully Saved",
        icon: "success"
      });
    },
    error: function (result) {
      clearEquipForm();
      Swal.fire({
        title: "Equipment Save",
        text: "Equipment Save Unsuccessfull",
        icon: "error"
      });
      console.log(result);
    },
  });
}

function updateEquipment() {
  var equipmentName = $("#equipment_name").val();
  var equipment_type = $("#equipment_type").val();
  var equipment_status = $("#equipment_status").val();
  var assigned_staff = $("#equip_staff_details").val();
  var assigned_field = $("#equip_field_details").val();

  $.ajax({
    url: `http://localhost:5050/green-shadow/api/v1/equipment/getequipId/${equipmentName}`,
    type: "GET",
    success: function (equipmentId) {
      console.log("Fetched equip id:", equipmentId);

      const updatedEquipData = {
        equipment_id: equipmentId,
        name: equipment_name,
        type: equipment_type,
        status: equipment_status,
        assigned_staff: {
          first_name: assigned_staff,
        },
        assigned_field: {
          field_name: assigned_field,
        },
      };

      $.ajax({
        url: `http://localhost:5050/green-shadow/api/v1/equipment/${equipmentId}`,
        type: "PATCH",
        contentType: "application/json",
        data: JSON.stringify(updatedEquipData),
        success: function () {
          clearEquipForm();
          Swal.fire({
            title: "Equipment Update",
            text: "Equipment Successfully Updated",
            icon: "success"
          });
          loadEquipment();
        },
        error: function (error) {
          clearEquipForm();
          Swal.fire({
            title: "Equipment Update",
            text: "Equipment Update Unsuccessfull",
            icon: "error"
          });
          console.error(error.responseText);
        },
      });
    },
    error: function (error) {
      alert("Error fetching equipment id: " + error.responseText);
      console.error(error);
    },
  });
}

function clearEquipForm() {
  $("#equipment_name").val("");
  $("#equipment_type").val("");
  $("#equipment_status").val("");
  $("#equip_staff_details").val("");
  $("#equip_field_details").val("");
}
