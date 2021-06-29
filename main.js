'use strict'


window.addEventListener("load", function () {



    let clientNameTags = document.querySelectorAll(".client-text");
    let clientNameTag = document.querySelector("#ux-fc-client");

    let projectHoursTag = document.querySelector("#ux-fc-project-hours");
    let projectPriceTag = document.querySelector("#program-value-text");
    let projectTypeSelectorTag = document.querySelector("#ux-fc-project-type");


    projectTypeSelectorTag.addEventListener("change", function () {

        switch (projectTypeSelectorTag.value) {
            case 1: // Diagnostico

                break;
            case 2: // Bolsa de horas

                break;
            case 3: // A la medida

                break;
        }
    });


    let btnUpdate = document.querySelector("#ux-btn-update");
    btnUpdate.addEventListener("click", function () {

        clientNameTags.forEach(element => {
            element.innerHTML = "<b>" + clientNameTag.value + "<b>"
        });

        let numberOfHours = parseInt(projectHoursTag.value);
        let pricePerHour = 333000;
        let programValue = numberOfHours * pricePerHour;
        projectPriceTag.innerHTML = "$" + programValue.toLocaleString()

        var element = document.getElementById('ux-main-container');
        var opt = {
            margin:       2.5,
            filename:     'myfile.pdf',
            image:        { type: 'png', quality: 1.00 },
            html2canvas:  { scale: 1 },
            jsPDF:        { unit: 'cm', format: 'letter', orientation: 'portrait' },
            pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] },
          };

          // New Promise-based usage:
          html2pdf().set(opt).from(element).save();

    });


    
   
});


