
async function getData(category, search, page = 1) {
        let params = new URLSearchParams({
                category: category,
                q: search,
                from: "2026-09-25",
                sortBy: "publishedAt",
                apiKey: "c823d92bd2b4425383c627e1f11217a9",
                pageSize: 10,
                page: page
        });

        let response = await fetch(`https://newsapi.org/v2/top-headlines?${params.toString()}`);
        
        let myData = await response.json();
        
        console.log(myData)

        showData(myData, page)
}


function showData(data, currentPage) {
        
        let pages = Math.ceil(data.totalResults / 10),
        news = data.articles,
        $dataContainer = $(".news .row");
        
        $dataContainer.html("");
        
        if (news.length > 0) {
                for (let item of news) {
                        $dataContainer.append(returnCard(item));
                }
                $("nav .pagination").html(preparePagination(currentPage, pages));
        }
}

function preparePagination(currentPage, totalPages) {

        let Lis = `<li class="page-item"><a class="page-link ${(currentPage == 1) ? 'disabled' : ''}" onclick="paginate(${(currentPage > 1) ? (currentPage - 1) : 1 })">Previous</a></li>`;

        for (let i = 1; i <= totalPages; i++) {
                Lis += `<li class="page-item ${(currentPage == i) ? 'active' : ''}"><a class="page-link" href="#" onclick="paginate(${i})">${i}</a></li>`;
        }

        Lis += `<li class="page-item"><a class="page-link ${(currentPage == totalPages) ? 'disabled' : ''}" onclick="paginate(${(currentPage < totalPages) ? (currentPage + 1) : totalPages})">Next</a></li>`;
        
        return Lis;
}

function paginate(page) {
        let category = $("select#category").val(),
                search = $("input#search").val();
        getData(category, search, page);
}

function returnCard(item) {
        return `
                <div class="col-lg-4 col-md-6 mb-5">
                        <div class="item m-auto">
                                <div class="card m-auto text-light overflow-hidden">
                                        <img class="mb-4" src="${(item.urlToImage) ? item.urlToImage : './images/download.webp'}" onerror="this.src='./images/download.webp'" alt="" style="aspect-ratio: 16/9" onclick="window.location.href='${item.url}'">
                                        <div class="layout px-4">
                                                <h4 class="mb-3 title text-center">${item.title.slice(0, 25)}...</h2>
                                                <h6 class="mb-3 description" ${(item.description != null) ? '' : 'style="height: 65px;"'}>${(item.description != null) ? item.description : 'failed to load description'}...</h6>
                                                <h6 class="mb-3 publishedAt">Publication Date : ${item.publishedAt}</h6>
                                                <h6 class="mb-3 source">Source : ${item.source.name}</h6>
                                        </div>
                                        <a href="${item.url}" target="_blank" class="btn d-block m-auto mt-2 mb-4">
                                                <span>See More</span>
                                        </a>
                                </div>
                        </div>
                </div>
        `;
}

getData("business", '');