window.onload = function () {
    let inputLocation = document.getElementById("localizacao");
    let inputRole = document.getElementById("cargo-empresa");
    let btnSearch = document.getElementById("search");
    let sectionContent = document.querySelector("section.content");
    let arrayObjJson = [];

    let numberOfItems = arrayObjJson.length;
    const numberPerPage = 9;
    let currentPage = 1;
    let numberOfPages = Math.ceil(numberOfItems / numberPerPage);

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
                showVagas(JSON.parse(http.responseText).jobs);
                arrayObjJson = JSON.parse(http.responseText).jobs;
                // console.log(JSON.parse(http.responseText).jobs)

                buildPage(currentPage);
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

    function buildPage(currentPage) {
        const trimStart = (currentPage - 1) * numberPerPage;
        const trimEnd = trimStart + numberPerPage;
        // console.log(arrayObjJson.slice(trimStart, trimEnd))
        return arrayObjJson.slice(trimStart, trimEnd);
    }

    function buildPagination(currentPage) {
        containerPaginacao.innerHTML = "";

        for (let i = 0; i < numberOfPages; i++) {
            const buttonEl = document.createElement("button"); //`<button></button>`
            buttonEl.value = `${i + 1}`;
            buttonEl.innerHTML = `${i + 1}`; //`<button>${i+1}</button>`
            containerPaginacao.appendChild(buttonEl);

            // containerPaginacao.append(`<button value="${i+1}">${i+1}</button>`)
        }

        // para quando forem mais de 3 paginas
        for (let i = 0; i < 3; i++) {
            const buttonEl = document.createElement("button"); //`<button></button>`
            buttonEl.value = `${currentPage + i}`;
            buttonEl.innerHTML = `${currentPage + i}`; //`<button>${i+1}</button>`
            containerPaginacao.appendChild(buttonEl);

            // containerPaginacao.append(`<button value="${currentPage+i}">${currentPage+i}</button>`)
        }
    }

    //escutando o evento de clique

    buildPage(1);
    buildPagination(currentPage);
    const buttonPaginado = containerPaginacao.querySelector('button')
    buttonPaginado.addEventListener("click", () => {
        let clickedPage = parseInt(this.value);
        buildPage(clickedPage);
        buildPagination(numberOfPages);
    });
    //     containerPaginacao.on('click', 'button', function() {
    //         var clickedPage = parseInt($(this).val())
    //         buildPage(clickedPage)
    //         buildPagination(clickedPage, numberOfPages)
    //    });

    // window.onload = function() {
    //     changePage(1);
    // };

    // let current_page = 1;
    // let records_per_page = 9;

    // function prevPage() {
    //     if (current_page > 1) {
    //         current_page--;
    //         changePage(current_page);
    //     }
    // }

    // function nextPage() {
    //     if (current_page < numPages()) {
    //         current_page++;
    //         changePage(current_page);
    //     }
    // }

    // function changePage(page) {
    //     let btn_next = document.getElementById("btn_next");
    //     let btn_prev = document.getElementById("btn_prev");
    //     let listing_table = document.getElementById("listingTable");
    //     let page_span = document.getElementById("page");

    //     // Validate page
    //     if (page < 1) page = 1;
    //     if (page > numPages()) page = numPages();

    //     listing_table.innerHTML = "";

    //     for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
    //         listing_table.innerHTML += objJson[i].adName + "<br>";
    //     }
    //     page_span.innerHTML = page;

    //     if (page == 1) {
    //         btn_prev.style.visibility = "hidden";
    //     } else {
    //         btn_prev.style.visibility = "visible";
    //     }

    //     if (page == numPages()) {
    //         btn_next.style.visibility = "hidden";
    //     } else {
    //         btn_next.style.visibility = "visible";
    //     }
    // }

    // function numPages()
    // {
    //     return Math.ceil(objJson.length / records_per_page);
    // }

    // for (let i = 0; i < numPages(); i++) {
    //     containerPaginacao.innerHTML = `
    //     <button class="button1">${i}</button>
    // `
    // }
};
