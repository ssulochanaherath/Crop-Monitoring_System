$(document).ready(function () {
  fetchCropNames();
  loadLogs();
});

function fetchCropNames() {
  $.ajax({
    url: " http://localhost:5050/green-shadow/api/v1/crop/getallcropnames",
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      console.log("Crop name: ", response);

      $("#log_crop_details")
        .empty()
        .append($("<option>", { value: "", text: "Select Crop" }));

      response.forEach((crop) => {
        console.log(crop);
        $("#log_crop_details").append(
          $("<option>", { value: crop, text: crop })
        );
      });
    },
    error: function (xhr, status, error) {
      console.error("Error fetching crop names:", status, error);
    },
  });
}

function loadLogs() {
  $.ajax({
    url: "http://localhost:5050/green-shadow/api/v1/log",
    method: "GET",
    contentType: "application/json",
    success: function (log) {
      console.log("Logs loaded:", log);
      $("#log-table").empty();

      log.forEach(function (log) {
        var record = `
                    <tr style="cursor: pointer">
                        <td class="log-date-value">${log.log_date}</td>
                        <td class="log-details-value">${log.log_details}</td>
                        <td class="log-image-value">
                            <img src="data:image/png;base64,${log.observed_image}" alt="Field Image 1" style="width: 100px; height: 100px; object-fit: cover;">
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
        $("#log-table").append(record);
      });

      $("#log-table").on("click", ".update-button", function () {
        const row = $(this).closest("tr");

        const log_date = row.find(".log-date-value").text();
        const log_details = row.find(".log-details-value").text();

        $("#log_date").val(log_date);
        $("#log_desc").val(log_details);
      });
    },
    error: function (xhr, status, error) {
      console.error("Failed to load logs:", error);
      alert("An error occurred while loading the log data.");
    },
  });
}

$("#log-table").on("click", ".delete-button", function () {
  const row = $(this).closest("tr");

  const logDesc = row.find(".log-details-value").text();

  $.ajax({
    url: `http://localhost:5050/green-shadow/api/v1/log/getlogcode/${logDesc}`,
    method: "GET",
    success: function (logCode) {
      console.log("Fetched log Code:", logCode);

      $.ajax({
        url: `http://localhost:5050/green-shadow/api/v1/log/${logCode}`,
        method: "DELETE",
        contentType: "application/json",
        success: function (results) {
          console.log(results);
          Swal.fire({
            title: "Log Delete",
            text: "Log Successfully Deleted",
            icon: "success"
          });
          loadLogs();
        },
        error: function (error) {
          console.log("Status:", status);
          console.log("Error:", error);
          Swal.fire({
            title: "Log Delete",
            text: "Log Delete Unsuccessfull",
            icon: "error"
          });
          loadLogs();
        },
      });
    },
    error: function (error) {
      alert("Error fetching log code: " + error.responseText);
      console.error(error);
    },
  });
});

function saveLog() {
  const formData = new FormData();

  formData.append("logDate", $("#log_date").val());
  formData.append("logDetails", $("#log_desc").val());
  formData.append("observedImage", $("#log_image")[0].files[0]);
  formData.append("fields", $("#log_field_details").val());
  formData.append("crops", $("#log_crop_details").val());
  formData.append("staff", $("#log_staff_details").val());

  $.ajax({
    url: "http://localhost:5050/green-shadow/api/v1/log",
    method: "POST",
    contentType: false,
    processData: false,
    data: formData,
    success: function (result) {
      console.log(result);
      clearLogForm();
      Swal.fire({
        title: "Log Save",
        text: "Log Successfully Saved",
        icon: "success"
      });
      loadLogs();
    },
    error: function (result) {
      console.log(result);
      clearLogForm();
      Swal.fire({
        title: "Log Save",
        text: "Log Save Unsuccessfull",
        icon: "error"
      });
    },
  });
}

function updateLog() {
  const formData = new FormData();

  formData.append("logDate", $("#log_date").val());
  formData.append("logDetails", $("#log_desc").val());
  formData.append("observedImage", $("#log_image")[0].files[0]);
  formData.append("fields", $("#log_field_details").val());
  formData.append("crops", $("#log_crop_details").val());
  formData.append("staff", $("#log_staff_details").val());

  const logDesc = $("#log_desc").val();
  const url = `http://localhost:5050/green-shadow/api/v1/log/getlogcode/${logDesc}`;

  $.ajax({
    url: url,
    type: "GET",
    success: function (logCode) {
      console.log("Fetched log code:", logCode);

      $.ajax({
        url: `http://localhost:5050/green-shadow/api/v1/log/${logCode}`,
        method: "PATCH",
        contentType: false,
        processData: false,
        data: formData,
        success: function (result) {
          clearLogForm();
          console.log(result);
          Swal.fire({
            title: "Log Update",
            text: "Equipment Successfully Updated",
            icon: "success"
          });
          loadLogs();
        },
        error: function (result) {
          clearLogForm();
          console.log(result);
          Swal.fire({
            title: "Log Update",
            text: "Log Update Unsuccessfull",
            icon: "error"
          });
          loadLogs();
        },
      });
    },
    error: function (error) {
      alert("Error fetching log code: " + error.responseText);
      console.error(error);
    },
  });
}

function clearLogForm() {
  $("#log_date").val("");
  $("#log_desc").val("");
  $("#log_image").val("");
  $("#log_field_details").val("");
  $("#log_crop_details").val("");
  $("#log_staff_details").val("");
}
