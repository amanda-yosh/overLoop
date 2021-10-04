let inputLocation = document.getElementById('localizacao')
let inputRole = document.getElementById('cargo-empresa')
let btnSearch = document.getElementById('search')
let sectionContent = document.querySelector('section.content')
let forms = document.querySelector('.formulario')



function callAPI(params = `{ keywords: 'it' }`) {
    var url = "https://jooble.org/api/";
    var key = "e03cb2fc-44fa-493f-b3f0-582fb8f39288";
    //  location: '${inputLocation.value}' 

    //create xmlHttpRequest object
    var http = new XMLHttpRequest();
    //open connection. true - asynchronous, false - synchronous
    http.open("POST", url + key, true);

    //Send the proper header information
    http.setRequestHeader("Content-type", "application/json");
        
    //Callback when the state changes
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            // console.log(JSON.parse(http.responseText));
            showVagas(JSON.parse(http.responseText).jobs);
            // console.log(JSON.parse(http.responseText).jobs.slice(0, 9))
        }
    }

    //Send request to the server
    http.send(params);
}
callAPI()

function showVagas(listVagas) {

    listVagas.forEach(element => {
        console.log(element)
        let { title, location, company, link, snippet } = element
        // updated

        let articleElement = document.createElement('article')
        articleElement.classList.add('job')

        articleElement.innerHTML = `
            <div class="job-info">
                <div class="text">
                    <a href="${link}" target="_blank"><h2>${title}</h2></a>
                    <small>${company}<small>
                    <p>
                        ${snippet}
                    </p>
                    <span class="location">${location}</span>
                </div>
            </div>
        `

        sectionContent.appendChild(articleElement)
    });
}

btnSearch.addEventListener('click', (event) => {
    event.preventDefault()

    params = `{ keywords: '${inputRole.value}, it', location: '${inputLocation.value}' }`
    sectionContent.innerHTML = ''
    callAPI(params)
})

forms.onmouseover = (event) => {
    forms.style.cssText = "box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.3); transition: all .4s"
}

forms.onmouseout = (event) => {
    forms.style.cssText = "box-shadow: none; transition: all .4s "
}

console.log(forms);