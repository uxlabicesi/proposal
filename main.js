'use strict'

let comercialTeam = [];
let expertsTeam = [];
let activities = [];
let activityConfigs = [];

let typeOfProject = 0;


async function buildConfigForm() {
    await updateValues();
    await buildExpertsSelection();
    await buildCommercialSelection();
    await buildActivitiesSelection();
}

function Component(data) {
    return {
        parent: data.parent,
        name: data.name,
        type: data.type,
        group: data.group,
        description: data.description,
        options: [],
        addOption: function (option) {
            this.options.push(option);
        }
    }
}

function Subcomponent(data) {
    return {
        parent: data.parent,
        name: data.name,
        description: data.description,
        type: data.type,
        group: data.group,
        defaultvalue: "",
        localcontent: [],
        addLocalItem: function (config) {
            if (config.parent === this.parent &&
                config.localparent === this.localparent) {
                this.localcontent.push(config);
            }
        }
    }
}

async function buildExpertsSelection() {
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

async function buildCommercialSelection() {
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

function transfomSelectorsConfiguration() {
    // obtain max group value
    let maxGroup = -1;
    for (let index = 0; index < activityConfigs.length; index++) {
        if (activityConfigs[index].group > maxGroup) {
            maxGroup = activityConfigs[index].group;
        }
    }
    let selectors = [];
    for (let index = 0; index <= maxGroup; index++) {
        let grupo = activityConfigs.filter((config) => config.group === index);
        for (let i = 0; i < grupo.length; i++) {
            if (grupo[i].type === "selector-item") {
                selectors.push(new Component(grupo[i]));
                for (let j = i + 1; j < grupo.length; j++) {
                    selectors[selectors.length - 1].addOption(new Subcomponent(grupo[j]));
                }
                break;
            }
        }
    }
    return selectors;
}

function transfomCountersConfiguration() {
    // obtain max group value
    let maxGroup = -1;
    for (let index = 0; index < activityConfigs.length; index++) {
        if (activityConfigs[index].group > maxGroup) {
            maxGroup = activityConfigs[index].group;
        }
    }
    let counters = [];
    for (let index = 0; index <= maxGroup; index++) {
        let grupo = activityConfigs.filter((config) => config.group === index);
        for (let i = 0; i < grupo.length; i++) {
            if (grupo[i].type === "count") {
                counters.push(new Component(grupo[i]));
            }
        }
    }
    return counters;
}

function buildHTMLSelectors(selectors, parentActivity) {
    let assignedSelectors = selectors.filter((selector) => selector.parent === parentActivity);
    let view = `<div class="container">`;
    assignedSelectors.forEach((selector) => {
        view += `<label for="ux-fc-project-type" class="form-label">${selector.name}</label>`;
        view += `<select class="form-select" aria-label="Default select example" id="ux-fc-project-type">`
        selector.options.forEach((option, index) => {
            let valueText = option.name + " (" + option.description + ")";
            view += `<option value="${index}">${valueText}</option>`;
        });
        view += `</select></div>`
    });
    return view;
}

function buildHTMLCounters(counters, parentActivity) {
    let assignedCounters = counters.filter((counter) => counter.parent === parentActivity);
    let view = `<div class="container">`;
    assignedCounters.forEach((counter) => {
        view += `<div id="ux-fc-project-hours-container" class="mb-3  p-1">
                    <label for="ux-fc-project-hours" class="form-label">${counter.name}</label>
                    <input type="number" class="form-control" id="ux-fc-project-hours"
                        placeholder="${counter.description}">
                </div>`
    });
    view += `</div>`
    return view;
}

async function buildActivitiesSelection() {
    const activitiesSelectorContainerTag = document.querySelector("#ux-form-activities-container");
    activitiesSelectorContainerTag.innerHTML = "";
    let transformedSelectors = transfomSelectorsConfiguration();
    let transformedCounters = transfomCountersConfiguration();
    activities.forEach((activity) => {
        // build each activity selector checkbox
        let activityItem =
            `<div class="form-check">
                <input class="form-check-input" type="checkbox" id="ux-test-${activity.nick}-check">            
                <label class="form-check-label" for="ux-test-${activity.nick}-check">${activity.name}</label>
            </div>        
            <div class="mb-3 p-1 m-1 visually-hidden" id="ux-test-${activity.nick}-container">
                <label for="" class="form-label h6">Estimación</label>
            </div> `;
        activitiesSelectorContainerTag.innerHTML += activityItem;
        // build the config items
        let configContainer = document.querySelector(`#ux-test-${activity.nick}-container`);
        configContainer.innerHTML += buildHTMLSelectors(transformedSelectors, parseInt(activity.id));
        configContainer.innerHTML += buildHTMLCounters(transformedCounters, parseInt(activity.id));
    });
    activities.forEach((activity) => {
        // assign behavior with checkbox
        let checkboxContainer = document.querySelector(`#ux-test-${activity.nick}-check`);        
        let configContainer = document.querySelector(`#ux-test-${activity.nick}-container`);
        checkboxContainer.addEventListener("click", function () {                
            if (checkboxContainer.checked === true) {
                configContainer.classList.remove('visually-hidden');
            } else {
                configContainer.classList.add('visually-hidden');
            }
        });
    });
}

async function assignPresetValues() {

}

window.addEventListener("load", function () {
    buildConfigForm();

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