'use strict'

let comercialTeam = [];
let expertsTeam = [];
let activities = [];
let activityConfigs = [];

let typeOfProject = 0;


async function buildConfigForm() {
    await updateValues();
    buildExpertsSelection();
    buildCommercialSelection();
    buildActivitiesSelection();

    console.log(Component(activities[0]));
    console.log(Subcomponent(activityConfigs[6]));
    let subTest = Subcomponent(activityConfigs[4]);
    activityConfigs.forEach(config => {
        subTest.addLocalItem(config);
    });
    console.log( subTest.localcontent);
   
}



function Component (data) {
    return {
        id : data.id,
        name : data.name,
        description : data.description,        
        subs : [],
        addSub : function(sub) {
            this.subs.push(sub);
        }
    }
}

function Subcomponent(data) {
    return {
        parent : data.parent,
        name : data.name,
        description : data.description, 
        type : data.type,       
        localparent : data.localparent,        
        defaultvalue : "",
        localcontent : [],
        addLocalItem: function (config) {
            if(config.parent === this.parent &&
                config.localparent === this.localparent ){
                this.localcontent.push(config); 
            }
        }
    }
}

function buildExpertsSelection() {
    const teamSelectorContainerTag = document.querySelector("#ux-form-team-container");
    teamSelectorContainerTag.innerHTML = "";
    expertsTeam.forEach((element, index) => {
        const expertView = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="1" id="ux-team-check-${index}" checked>
                <label class="form-check-label" for="ux-team-check-${index}">${element.name}</label>
            </div>`;
        teamSelectorContainerTag.innerHTML += expertView;
    });
}

function buildCommercialSelection() {
    const commercialTeamSelectorContainerTag = document.querySelector("#ux-form-commercial-team-container");
    commercialTeamSelectorContainerTag.innerHTML = "";
    comercialTeam.forEach((element, index) => {
        const expertView = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="1" id="ux-commercial-team-check-${index}" checked>
                <label class="form-check-label" for="ux-commercial-team-check-${index}">${element.name}</label>
            </div>`;
        commercialTeamSelectorContainerTag.innerHTML += expertView;
    });
}




function buildActivitiesSelection() {
    const activitiesSelectorContainerTag = document.querySelector("#ux-form-activities-container");
    activitiesSelectorContainerTag.innerHTML = "";
    /*let values = [];
    let localValues = [];
    activityConfigs.forEach((config)=>{               
        if(config.parent === 1){
            localValues.push(config);
        }
        values.push(localValues);        
    });
    console.log(values);
    let maxParent = -1;
    activityConfigs.forEach((config) => {
        if (parseInt(config.parent) > maxParent) {
            maxParent = parseInt(config.parent);
        }
    });
    console.log(maxParent);*/
    /*
    let selectorItems = activityConfigs.filter((config) => config.type === "selector-item");
    let selectorItemsParent = selectorItems.filter((config) => config.parent === "1");
    console.log(selectorItemsParent);
    */
    activities.forEach((activity) => {
        let itemConfigs = activityConfigs.filter((config) => config.parent === activity.id);
        const expertView =
        `<div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="ux-test-${activity.nick}-check">            
            <label class="form-check-label" for="ux-test-${activity.nick}-check">${activity.name}</label>
        </div>

        <div id="ux-test-${activity.nick}-container" class="mb-3 visually-hidden">

        </div>`;
        /*visually-hidden*/
        activitiesSelectorContainerTag.innerHTML += expertView;

        const containerIdName = `#ux-test-${activity.nick}-container`;
        const containerConfig = document.querySelector(containerIdName);
        itemConfigs.forEach((config) => {
            if (config.type === "selector-item") {
                containerConfig.innerHTML += `<label for="ux-test-${activity.nick}-selector-${config.optvalue}" class="form-label">${config.name}</label>`;
                containerConfig.innerHTML += `<select class="form-select" aria-label="Default select example" id="ux-test-${activity.nick}-selector-${config.optvalue}"> </select>`;
            }
        });
        /*//let itemConfigSelectorOption = itemConfigs.filter( (config) => config.parent === activity.id );
        const selectorIdName = `#ux-test-${activity.nick}-selector-${"0"}`;        
        const containerSelector = document.querySelector(selectorIdName);        
        containerSelector.innerHTML+=`<label for="ux-test-${activity.nick}-selector-${"0"}" class="form-label">${"0"}</label>`;
        itemConfigs.forEach((configB) => {                        
            if(configB.type==="selector-option"){ 
                containerConfig.innerHTML+=`<select class="form-select" aria-label="Default select example" id="ux-test-${activity.nick}-selector-${configB.optvalue}"> </select>`;                                
            }
        });*/
        /*
        <!-- <option selected>Selecciona el tipo de programa</option> -->
        <option value="1">Diagnóstico</option>
        <option value="2">Bolsa de horas</option>
        <option value="3">A la medida</option>
        */


        containerConfig.appendChild(document.createElement('p'));

        /*`
        
        <div class="container">
            <div class="form-check">
                <label for="ux-test-ut-number" class="form-label">Número de usuarios</label>
                <input type="number" class="form-control" id="ux-test-ut-number"
                    placeholder="¿Número de usuarios?">
            </div>
            <div class="form-check">
                    <label for="ux-test-ut-duration" class="form-label">Tiempo por usuario (en
                    minutos)</label>
                    <input type="number" class="form-control" id="ux-test-ut-duration" placeholder="60">
                </div>
            </div>
        `;*/

    });
}



async function assignPresetValues() {

}

window.addEventListener("load", function () {

    buildConfigForm();
    assignPresetValues();

    let clientNameTag = document.querySelector("#ux-form-client-name");
    let projectNameTag = document.querySelector("#ux-form-project-name");
    let clientNameTags = document.querySelectorAll(".ux-report-client-name");
    let projectNameMainTitleTag = document.querySelector("#ux-report-program-name");

    clientNameTag.value = "Coomeva"
    projectNameTag.value = "Proyecto de Prueba"
    projectNameMainTitleTag.innerHTML = "Proyecto de Prueba";

    let projectHoursTag = document.querySelector("#ux-fc-project-hours");
    let projectPriceTag = document.querySelector("#program-value-text");
    let projectTypeSelectorTag = document.querySelector("#ux-fc-project-type");

    /*
         let usabilityTestCheckTag = document.querySelector("#ux-test-ut-check");
         usabilityTestCheckTag.addEventListener("change", function () {
             let container = document.querySelector("#ux-test-ut-container");
             if (usabilityTestCheckTag.checked === true) {
                 container.classList.remove('visually-hidden');
             } else {
                 container.classList.add('visually-hidden');
             }
         });

         let heuristicTestCheckTag = document.querySelector("#ux-test-ht-check");
         heuristicTestCheckTag.addEventListener("change", function () {
             let container = document.querySelector("#ux-test-ht-container");
             if (heuristicTestCheckTag.checked === true) {
                 container.classList.remove('visually-hidden');
             } else {
                 container.classList.add('visually-hidden');
             }
         });*/

    let hasHoursSwitchTag = document.querySelector("#ux-hour-switch");
    hasHoursSwitchTag.addEventListener("change", function () {
        let container = document.querySelector("#ux-fc-project-hours-container");
        if (hasHoursSwitchTag.checked === true) {
            container.classList.remove('visually-hidden');
        } else {
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

        // Project Main Title
        let projectNameMainTitleTag = document.querySelector("#ux-report-program-name");
        projectNameMainTitleTag.innerHTML = projectNameTag.value;

        // Client name update
        clientNameTags.forEach(element => {
            element.innerHTML = "<b>" + clientNameTag.value + "</b>"
        });

        // Program price update
        let programValue = 0;
        let pricePerHour = 350000;

        if (hasHoursSwitchTag.checked === true) {
            let numberOfHours = parseInt(projectHoursTag.value);
            programValue = numberOfHours * pricePerHour;
            projectPriceTag.innerHTML = "$" + programValue.toLocaleString();
        } else {
            /*if (heuristicTestCheckTag.checked === true) {
                const number = parseInt(document.querySelector("#ux-test-ht-number").value);
                const duration = parseInt(document.querySelector("#ux-test-ht-duration").value);
                programValue += number * (duration / 60) * pricePerHour;
                projectPriceTag.innerHTML = "$" + programValue.toLocaleString();
            }
            if (usabilityTestCheckTag.checked === true) {
                const number = parseInt(document.querySelector("#ux-test-ut-number").value);
                const duration = parseInt(document.querySelector("#ux-test-ut-duration").value);
                programValue += number * (duration / 60) * pricePerHour;
                projectPriceTag.innerHTML = "$" + programValue.toLocaleString();
            }*/
        }

        updateExpertTeamReport();
        updateCommercialTeamReport();
        updateActivitiesReport();
    });


    function updateActivitiesReport() {
        //form         
        let formActivitiesSelectorContainerTag = document.querySelector("#ux-form-activities-container");
        let activitySelectorContainerTags = formActivitiesSelectorContainerTag.querySelectorAll(".form-check-input");

        // report
        let reportActivitiesContainerTag = document.querySelector("#ux-report-activities-container");
        reportActivitiesContainerTag.innerHTML = '';
        activitySelectorContainerTags.forEach((activity, index) => {
            if (activity.checked === true) {
                const view = `
                <div class="ux-report-activity-container container">
                    <div class="ux-report-activity-title">
                        <b>${activities[index].name}</b>
                    </div>
                    <div class="ux-report-activity-description">
                        <p>${activities[index].description}</p>
                    </div>
                </div>`;
                reportActivitiesContainerTag.innerHTML += view;
            }
        });
    }

    function updateExpertTeamReport() {
        // form
        let formTeamSelectorContainerTag = document.querySelector("#ux-form-team-container");
        let teamSelectorContainerTags = formTeamSelectorContainerTag.querySelectorAll(".form-check-input");
        // report
        let reportTeamMembersContainerTag = document.querySelector("#ux-report-experts-container");
        reportTeamMembersContainerTag.innerHTML = '';
        teamSelectorContainerTags.forEach((expert, index) => {
            if (expert.checked === true) {
                const view = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${expertsTeam[index].name}</h5>
                    <p class="card-subtitle">${expertsTeam[index].level}</p>
                    <p class="card-text">${expertsTeam[index].description}</p>
                </div>
            </div>`;
                reportTeamMembersContainerTag.innerHTML += view;
            }
        });
    }

    function updateCommercialTeamReport() {
        // form
        let formCommercialSelectorContainerTag = document.querySelector("#ux-form-commercial-team-container");
        let CommercialSelectorContainerTags = formCommercialSelectorContainerTag.querySelectorAll(".form-check-input");
        // report
        let reportCommercialMembersContainerTag = document.querySelector("#ux-report-commercial-container");
        reportCommercialMembersContainerTag.innerHTML = '';
        CommercialSelectorContainerTags.forEach((commercial, index) => {
            if (commercial.checked === true) {
                const member = document.createElement('p');
                const commercialView =
                    `<b>${comercialTeam[index].name}</b>
                    <br>
                    ${comercialTeam[index].level}<br>
                    ${comercialTeam[index].phone}<br>
                    ${comercialTeam[index].mail}<br>                    
                    ${comercialTeam[index].mobile}<br>                    
                    <br>`;
                member.innerHTML = commercialView;
                reportCommercialMembersContainerTag.appendChild(member);
            }
        });
    }

    let btnGeneratePDF = document.querySelector("#ux-btn-pdf");
    btnGeneratePDF.addEventListener("click", function () {
        const element = document.getElementById('ux-main-container');
        const opt = {
            margin: 2.0,
            filename: projectNameTag.value + '_propuesta.pdf',
            image: {
                type: 'jpeg',
                quality: 1
            },
            html2canvas: {
                scale: 1
            },
            jsPDF: {
                unit: 'cm',
                format: 'letter',
                orientation: 'portrait'
            },
            pagebreak: {
                mode: ['avoid-all', 'css', 'legacy']
            },
        };
        html2pdf().set(opt).from(element).save();
    });

});