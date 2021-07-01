const fetchDatabase = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.text();
        return data;
    } catch (error) {
        console.log('Fetch Error', error);
    };
}

const getDataAsJsonFrom = async (url) => {
    const raw = await fetchDatabase(url);
    const json = await Papa.parse(raw);
    return json.data;
}

async function updateValues() {
    /**
     * Request data from pages
     */
    const dbCommercial = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTslH4hIMxkKp_v42v3rCDvMSFEzjNPXKqekWZB4wX6qDawKHjrUM0umNe1Sy9LgwdTJdRf2YqeK4In/pub?gid=2122177901&single=true&output=csv";
    const dbExperts = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTslH4hIMxkKp_v42v3rCDvMSFEzjNPXKqekWZB4wX6qDawKHjrUM0umNe1Sy9LgwdTJdRf2YqeK4In/pub?gid=0&single=true&output=csv";
    const dbActivities = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTslH4hIMxkKp_v42v3rCDvMSFEzjNPXKqekWZB4wX6qDawKHjrUM0umNe1Sy9LgwdTJdRf2YqeK4In/pub?gid=2024383212&single=true&output=csv"
    const dbActivityConfig = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTslH4hIMxkKp_v42v3rCDvMSFEzjNPXKqekWZB4wX6qDawKHjrUM0umNe1Sy9LgwdTJdRf2YqeK4In/pub?gid=597372748&single=true&output=csv"

    let commercialsArrayData = await getDataAsJsonFrom(dbCommercial);
    commercialsArrayData.forEach((element, index) => {
        if(index!=0){
            comercialTeam.push(buildCommercialFromArray(element));
        }
    });

    let expertsArrayData = await getDataAsJsonFrom(dbExperts);    
    expertsArrayData.forEach((element, index) => {
        if(index!=0){
            expertsTeam.push(buildExpertFromArray(element));
        }
    });

    let activitiesArrayData = await getDataAsJsonFrom(dbActivities);    
    activitiesArrayData.forEach((element, index) => {
        if(index!=0){
            activities.push(buildActivityFromArray(element));
        }
    });

    let activityConfigArrayData = await getDataAsJsonFrom(dbActivityConfig);    
    activityConfigArrayData.forEach((element, index) => {
        if(index!=0){
            activityConfigs.push(buildActivityConfigFromArray(element));
        }
    });
}

function buildExpertFromArray(expertArrayItem) {
    return {
        name: expertArrayItem[1],
        level: expertArrayItem[2],
        description: expertArrayItem[3],
    }
}

function buildCommercialFromArray(commercialArrayItem) {
    return {
        name: commercialArrayItem[1],
        level: commercialArrayItem[2],
        phone: commercialArrayItem[3],
        mobile: commercialArrayItem[4],
        mail: commercialArrayItem[5],
    }
}

function buildActivityFromArray(activityArrayItem) {
    return {
        id: activityArrayItem[0],
        name: activityArrayItem[1],
        description: activityArrayItem[2],
        nick: activityArrayItem[3],
    }
}

function buildActivityConfigFromArray(activityConfigArrayItem) {
    return {       
        parent: activityConfigArrayItem[1],
        name: activityConfigArrayItem[2],
        description: activityConfigArrayItem[3],
        type: activityConfigArrayItem[4],
        localparent: activityConfigArrayItem[5],
        defaultvalue: activityConfigArrayItem[6],
    }
}

