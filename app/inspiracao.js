const api_key = 'b600c122-75d0-4c03-bcd2-684c5f16eb3e'

// let url = `https://content.guardianapis.com/sections?q=technology&api-key=${api_key}`

let urlb = `https://content.guardianapis.com/search?section=technology&q=technology&api-key=${api_key}&show-fields=thumbnail,trailText,starRating`
// headline, standfirst, body

const article = document.querySelectorAll('#newsArticle')

getNews(urlb)

async function getNews(url) {
    const res = await fetch(url)
    const data = await res.json()

    console.log(data.response)
    showNews(data.response.results.slice(0,3))
}

function showNews(newsList) {
    article.forEach.innerHTML = ''

    newsList.forEach((news) => {
        const { webTitle, webUrl, webPublicationDate, fields } = news

        const newsElement = document.createElement('article')
        // newsElement.classList.add('movie')

        newsElement.innerHTML = `
            <div class="image"> 
                <img src="${fields.thumbnail}" alt="noticia1" />
            </div>
            <div class="info">
                <div class="text">
                    <h3>${webTitle}</h3>
                    <small>${webPublicationDate.slice(0, 10).split('-').reverse().join('-')}</small>
                </div>
                <p>
                    ${fields.trailText}
                    ${fields.standfirst}
                </p>
                <p>
                    Saiba mais em <a href="${webUrl}" target="_blank"> link</a>.
                </p>
            </div>
        `
        // dia / mes / ano
        console.log(webPublicationDate.slice(0, 10).split('-').reverse().join('-'))
        //typeof -> string

        // console.log(article)
        article[0].appendChild(newsElement)
    });
}


