$(document).ready(function () {

    // handle the forms appearing and hiding events
    $('#openFormBtn').click(function () {
        $('#formContainer').show();
        $('.overlay').show();
    });

    $('#cancelFormBtn').click(function () {
        hideFormAndOverlay();
    });

    $('#cancelTabelConfigFormBtn').click(function () {
        hideFormAndOverlay();
    });

    $('.overlay').click(function () {
        hideFormAndOverlay();
    })

    $('#tableConfigButton').click(function () {
        $('#formConfigContainer').show();
        $('.overlay').show();
    });

    // hide the form and overlay when the document is loaded
    hideFormAndOverlay();

    function hideFormAndOverlay() {
        $('#formContainer').hide();
        $('#formConfigContainer').hide();
        $('.overlay').hide();
    }

    //handle the form submit and the append data logic
    $('#dataForm').submit(function (event) {
        event.preventDefault();

        //store the fields values
        let fullNameFieldValue = $('#nameField').val();
        let jobFieldValue = $('#jobField').val();
        let salaryFieldValue = $('#salaryField').val();
        let ageFieldValue = $('#ageField').val();
        let genderFieldValue = $('#genderField').val();
        let addressFieldValue = $('#addressField').val();

        if (!validateForm(fullNameFieldValue, jobFieldValue, salaryFieldValue, ageFieldValue, genderFieldValue, addressFieldValue)) {
            return; // if validation fails, the function stops
        }

        //create a new row inside the table
        let newRow = $('<tr></tr>');
        let fieldValues = new Array(fullNameFieldValue, jobFieldValue, salaryFieldValue, ageFieldValue, genderFieldValue, addressFieldValue);

        fieldValues.forEach(fieldValue => {
            newRow.append(`<td>${fieldValue}</td>`);
        })

        $('#dataTable tbody').append(newRow);

        //edit the table fields logic
        newRow.find('td').dblclick(function () {
            let inputFieldValue = $(this).text();
            let editField = $(`<input type="text" class="editable-field" value="${inputFieldValue}" placeholder="Editar este campo...">`);
            $(this).html(editField);
            editField.focus();

            // handle enter event
            editField.keydown(function (event) {
                if (event.which === 13) {
                    let confirmEdit = confirm('¿Quieres editar este campo?');
                    if (confirmEdit) {
                        let newInputValue = event.target.value;
                        $(this).parent().text(newInputValue);
                    }
                }
            });
        });

        // hide the form and overlay
        hideFormAndOverlay();
    });
    function validateForm(fullNameFieldValue, jobFieldValue, salaryFieldValue, ageFieldValue, genderFieldValue, addressFieldValue) {
        if (
            fullNameFieldValue === '' ||
            jobFieldValue === '' ||
            salaryFieldValue === '' ||
            ageFieldValue === '' ||
            genderFieldValue === '' ||
            addressFieldValue === ''
        ) {
            alert('Debes llenar todos los campos');
            return false;
        } else {
            return true;
        }
    }

    // Edit table form 
    $('#editTableForm').submit(function (event) {
        event.preventDefault();

        let newTableColorValue = $('#newTableColorInput').val();
        changeTableColor(newTableColorValue)
    })
    // Change the table color 
    function changeTableColor(colorInput) {
        $('#dataTable th').css('background-color', colorInput)
    }
});
