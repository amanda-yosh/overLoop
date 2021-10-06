window.onload = function () {
    let inputLocation = document.getElementById("localizacao");
    let inputRole = document.getElementById("cargo-empresa");
    let btnSearch = document.getElementById("search");
    let sectionContent = document.querySelector("section.content");
    let arrayObjJson = [];

    let numberOfItems = 9;
    const numberPerPage = 9;
    let currentPage = 1;
    let numberOfPages = 1;

    const containerPaginacao = document.querySelector(".container-paginacao .paginacao");

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
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                // console.log(JSON.parse(http.responseText));
                // showVagas(JSON.parse(http.responseText).jobs);
                arrayObjJson = JSON.parse(http.responseText).jobs;
                // console.log(JSON.parse(http.responseText).jobs)

                numberOfItems = arrayObjJson.length;
                numberOfPages = Math.ceil(numberOfItems / numberPerPage);

                buildPagination(currentPage, arrayObjJson, numberOfItems)
                // buildPage(currentPage);
            }
        };

        //Send request to the server
        http.send(params);
    }
    callAPI();

    function showVagas(listVagas) {
        listVagas.forEach((element) => {
            // console.log(element)
            let { title, location, company, link, snippet } = element;
            // updated

            let articleElement = document.createElement("article");
            articleElement.classList.add("job");

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
        `;

            sectionContent.appendChild(articleElement);
        });
    }

    btnSearch.addEventListener("click", (event) => {
        event.preventDefault();

        params = `{ keywords: '${inputRole.value}, it', location: '${inputLocation.value}' }`;
        sectionContent.innerHTML = "";
        callAPI(params);
    });

    // function buildPage(currentPage) {
    //     const trimStart = (currentPage - 1) * numberPerPage;
    //     const trimEnd = trimStart + numberPerPage;
    //     // console.log(arrayObjJson.slice(trimStart, trimEnd))
    //     return arrayObjJson.slice(trimStart, trimEnd);
    // }

    function buildPagination(currentPage, arrayObjJson, numberOfItems) {
        // console.log(typeof numberOfItems)

        paginate(arrayObjJson, numberOfItems, currentPage)
        containerPaginacao.innerHTML = "";
        const currPageNum = accomodatePage(currentPage)

        for (let i = 1; i < numberOfItems + 1; i++) {
            const buttonEl = document.createElement("button"); //`<button></button>`
            buttonEl.value = `${currentPage.pages[i]}`;
            buttonEl.innerHTML = `${currentPage.pages[i]}`; //`<button>${i+1}</button>`
            buttonEl.setAttribute('value', `${currentPage.pages[i]}`)
            containerPaginacao.appendChild(buttonEl);

            // containerPaginacao.append(`<button value="${i+1}">${i+1}</button>`)
        }
        
        // if (numberOfPages >= 3) {
        //     for (let i = -1; i < 2; i++) {
        //         const buttonEl = document.createElement("button"); //`<button></button>`
        //         buttonEl.value = `${currPageNum + 1}`;
        //         buttonEl.innerHTML = `${currPageNum + 1}`; //`<button>${i+1}</button>`
        //         buttonEl.setAttribute('value', `${i+1}`)
        //         containerPaginacao.appendChild(buttonEl);
    
        //         // containerPaginacao.append(`<button value="${i+1}">${i+1}</button>`)
        //     }
        // } else {
        //     // para quando forem mais de 3 paginas
        //     for (let i = 0; i < numberOfPages; i++) {
        //         const buttonEl = document.createElement("button"); //`<button></button>`
        //         buttonEl.value = `${1 + i}`;
        //         buttonEl.innerHTML = `${1 + i}`; //`<button>${i+1}</button>`
        //         buttonEl.setAttribute('value', `${i+1}`)
        //         containerPaginacao.appendChild(buttonEl);

        //         // containerPaginacao.append(`<button value="${currentPage+i}">${currentPage+i}</button>`)
        //     }
        // }
    }

    function accomodatePage(clickedPage) {
        if (clickedPage <= 1) { return clickedPage + 1}
        if (clickedPage >= numberOfPages) { return clickedPage -1}
        return clickedPage
    }

    //escutando o evento de clique

    // buildPage(1);
    buildPagination(paginate(numberOfItems));
    const buttonPaginado = containerPaginacao.querySelector('button')
    
    buttonPaginado.addEventListener("click", (e) => {
        let clickedPage = parseInt(e.target.value);
        // buildPage(clickedPage);
        buildPagination(paginate(numberOfItems));
    });

    function paginate(
        listVagas = [],
        totalItems,
        currentPage = 1,
        pageSize = 9,
        maxPages = 6
    ) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
    
        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }
    
        let startPage, endPage;
        if (totalPages <= maxPages) {
            // total pages less than max so show all pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // total pages more than max so calculate start and end pages
            let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
            let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                // current page near the start
                startPage = 1;
                endPage = maxPages;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                // current page near the end
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            } else {
                // current page somewhere in the middle
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }
    
        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    
        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
};
