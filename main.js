'use strict'

const javier = {
    name: "JAVIER A. AGUIRRE",
    level: "Ph.D Diseño & Creación",
    description: "Diseño Social - Innovación Social - Diseño y nuevas Interfaces - Interacción Persona Ordenador - Desarrollo de Nuevos Productos - Apropiación tecnológica."
};

const jose = {
    name: "JOSÉ A. MONCADA",
    level: "MSc. Tecnologías de la Información y Comunicaciones | MSc. Ciencia de Datos",
    description: "Interacción Persona Ordenador - Análisis de datos - Programación - Ingeniería de Software -    Agile - Ecosistemas de aplicaciones."
};

const nestor = {
    name: "NÉSTOR A. TOBAR",
    level: "Ma. Diseño de Experiencia de Usuario | Ma. Gestión de Innovación",
    description: " Experiencia de Usuario - Arquitectura de la información - Diseño de Interacción - Gestión de    la Innovación - Diseño de interfaz de Usuario."
};

const daniel = {
    name: "DANIEL GÓMEZ",
    level: "test",
    description: "test"
};

const experts = [
    daniel, javier, jose, nestor
];


const monica = {
    name: "DANIEL GÓMEZ",
    level: "test",
    description: "test"
};


const angela = {
    name: "DANIEL GÓMEZ",
    level: "test",
    description: "test"
};

const patricia = {
    name: "DANIEL GÓMEZ",
    level: "test",
    description: "test"
};

const comercialTeam = {
    angela, monica, patricia
}


let typeOfProject = 0;

window.addEventListener("load", function () {
    

    let clientNameTags = document.querySelectorAll(".client-text");
    let clientNameTag = document.querySelector("#ux-fc-client");
    clientNameTag.value = "Coomeva"

    let projectNameTag = document.querySelector("#ux-fc-project");
    projectNameTag.value = "Proyecto de Prueba"

    let projectNameMainTitleTag = document.querySelector("#ux-program-name");
    projectNameMainTitleTag.innerHTML = projectNameTag.value;
    
    let hasHoursSwitchTag = document.querySelector("#ux-hour-switch");

    let projectHoursTag = document.querySelector("#ux-fc-project-hours");
    let projectPriceTag = document.querySelector("#program-value-text");
    let projectTypeSelectorTag = document.querySelector("#ux-fc-project-type");
    
    let teamSelectorContainerTag = document.querySelector("#ux-team-container");
    let teamSelectorContainerTags = teamSelectorContainerTag.querySelectorAll(".form-check-input");

    let teamMembersContainerTag = document.querySelector("#ux-experts-container");


    hasHoursSwitchTag.addEventListener("change", function () {        
        let container = document.querySelector("#ux-fc-project-hours-container");        
        if(hasHoursSwitchTag.checked === true){            
            container.classList.remove('visually-hidden');
        }else{
            container.classList.add('visually-hidden');
        }
    });

    projectTypeSelectorTag.addEventListener("change", function () {
        switch (projectTypeSelectorTag.value) {
            case '1': // Diagnostico
                typeOfProject = 1;
                    console.log("Diagnóstico");

                break;
            case '2': // Bolsa de horas
                typeOfProject = 2;
                    console.log("Bolsa de horas");
                break;
            case '3': // A la medida
                typeOfProject = 3;
                    console.log("A la medida");
                break;
        }
    });


    let btnUpdate = document.querySelector("#ux-btn-update");
    btnUpdate.addEventListener("click", function () {
        // project Main Title         
        projectNameMainTitleTag.innerHTML = projectNameTag.value;

        // Client name update
        clientNameTags.forEach(element => {
            element.innerHTML = "<b>" + clientNameTag.value + "</b>"
        });

        // Program price update
        if(hasHoursSwitchTag.checked === true){            
            let numberOfHours = parseInt(projectHoursTag.value);
            let pricePerHour = 333000;
            let programValue = numberOfHours * pricePerHour;
            projectPriceTag.innerHTML = "$" + programValue.toLocaleString();
        }else{
            projectPriceTag.innerHTML = "PENDIENTE"
        }

        // Expert team update
        teamMembersContainerTag.innerHTML = '';
        teamSelectorContainerTags.forEach( (element, index) => {   
            //console.log(element, index)         
            if(element.checked === true){

                const cardItem = document.createElement('div');
                cardItem.classList.add('card');

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title');
                cardTitle.innerText = experts[index].name;

                const cardSubtitle = document.createElement('p');
                cardSubtitle.classList.add('card-subtitle');
                cardSubtitle.innerText = experts[index].level;

                const cardText = document.createElement('p');
                cardText.classList.add('card-text');
                cardText.innerText = experts[index].description;

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardSubtitle);
                cardBody.appendChild(cardText);
                cardItem.appendChild(cardBody);
                teamMembersContainerTag.appendChild(cardItem);
            }
        });

        // Comercial team update


    });

    let btnGeneratePDF = document.querySelector("#ux-btn-pdf");
    btnGeneratePDF.addEventListener("click", function () {       
        const element = document.getElementById('ux-main-container');
        const opt = {
            margin:       2.0,
            filename:     projectNameTag.value + '_propuesta.pdf',
            image:        { type: 'png', quality: 1 },
            html2canvas:  { scale: 1 },
            jsPDF:        { unit: 'cm', format: 'letter', orientation: 'portrait' },
            pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] },
          };          
          html2pdf().set(opt).from(element).save();
    });
   
});


