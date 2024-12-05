$(document).ready(function () {
  loadCrops();
});

var recordIndex;

function loadCrops() {
  $.ajax({
    url: "http://localhost:5050/green-shadow/api/v1/crop",
    type: "GET",
    contentType: "application/json",
    success: function (crops) {
      console.log("Crops loaded:", crops);
      $("#crop-table").empty();

      crops.forEach(function (crop) {
        var record = `
                    <tr style="cursor: pointer">
                        <td class="crop-image-value">
                            <img src="data:image/png;base64,${crop.crop_image}" alt="Field Image 1" style="width: 100px; height: 100px; object-fit: cover;">
                        </td>
                        <td class="crop-name-value">${crop.common_name}</td>
                        <td class="crop-scientific-value">${crop.scientific_name}</td>
                        <td class="crop-category-value">${crop.category}</td>
                        <td class="crop-season-value">${crop.season}</td>
                        <td class="crop-field-value">${crop.field.field_name}</td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
        $("#crop-table").append(record);
      });
      $("#crop-table").on("click", ".update-button", function () {
        const row = $(this).closest("tr");

        const crop_name = row.find(".crop-name-value").text();
        const scientific_name = row.find(".crop-scientific-value").text();
        const category = row.find(".crop-category-value").text();
        const season = row.find(".crop-season-value").text();
        const field_name = row.find(".crop-field-value").text();

        $("#crop_name").val(crop_name);
        $("#crop_scientific_name").val(scientific_name);
        $("#crop_category").val(category);
        $("#crop_season").val(season);
        $("#crop_field").val(field_name !== "Unassigned" ? field_name : "");
      });
    },
    error: function (xhr, status, error) {
      console.error("Failed to load vehicle:", error);
      alert("An error occurred while loading the crop data.");
    },
  });
}

$("#crop-table").on("click", ".delete-button", function () {
  const row = $(this).closest("tr");

  const commonName = row.find(".crop-name-value").text();

  $.ajax({
    url: `http://localhost:5050/green-shadow/api/v1/crop/getcropcode/${commonName}`,
    method: "GET",
    success: function (cropCode) {
      console.log("Fetched crop Code:", cropCode);

      $.ajax({
        url: `http://localhost:5050/green-shadow/api/v1/crop/${cropCode}`,
        method: "DELETE",
        contentType: "application/json",
        success: function (results) {
          console.log(results);
          Swal.fire({
            title: "Crop Delete",
            text: "Crop Successfully Deleted",
            icon: "success"
          });
          loadCrops();
        },
        error: function (error) {
          console.log("Status:", status);
          console.log("Error:", error);
          Swal.fire({
            title: "Crop Delete",
            text: "Crop Delete Unsuccessfull",
            icon: "error"
          });
          loadCrops();
        },
      });
    },
    error: function (error) {
      alert("Error fetching crop id: " + error.responseText);
      console.error(error);
    },
  });
});

function saveCrop() {
  const formData = new FormData();

  formData.append("common_name", $("#crop_common_name").val());
  formData.append("scientific_name", $("#crop_scientific_name").val());
  formData.append("crop_image", $("#crop_image")[0].files[0]);
  formData.append("category", $("#crop_category").val());
  formData.append("season", $("#crop_season").val());
  formData.append("field_name", $("#field_details").val());

  $.ajax({
    url: " http://localhost:5050/green-shadow/api/v1/crop",
    method: "POST",
    contentType: false,
    processData: false,
    data: formData,
    success: function (result) {
      clearFields();
      console.log(result);
      Swal.fire({
        title: "Crop Save",
        text: "Crop Successfully Saved",
        icon: "success"
      });
      loadCrops();
    },
    error: function (result) {
      clearFields();
      console.log(result);
      Swal.fire({
        title: "Crop Save",
        text: "Crop Save Unsuccessfull",
        icon: "error"
      });
      loadCrops();
    },
  });
}

function updateCrop() {
  const formData = new FormData();

  formData.append("common_name", $("#crop_common_name").val());
  formData.append("scientific_name", $("#crop_scientific_name").val());
  formData.append("crop_image", $("#crop_image")[0].files[0]);
  formData.append("category", $("#crop_category").val());
  formData.append("season", $("#crop_season").val());
  formData.append("field_name", $("#field_details").val());

  const commonName = $("#crop_common_name").val();
  const url = `http://localhost:5050/green-shadow/api/v1/crop/${commonName}`;

  $.ajax({
    url: url,
    method: "PATCH",
    contentType: false,
    processData: false,
    data: formData,
    success: function (result) {
      clearFields();
      console.log(result);
      Swal.fire({
        title: "Crop Update",
        text: "Crop Successfully Updated",
        icon: "success"
      });
      loadCrops();
    },
    error: function (result) {
      clearFields();
      console.log(result);
      Swal.fire({
        title: "Crop Update",
        text: "Crop Update Unsuccessfull",
        icon: "error"
      });
      loadCrops();
    },
  });
}

function clearFields() {
  $("#crop_common_name").val("");
  $("#crop_scientific_name").val("");
  $("#crop_image").val("");
  $("#crop_category").val("");
  $("#crop_season").val("");
}
