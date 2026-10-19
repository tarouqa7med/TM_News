
async function getData(category = "business", search = "", page = 1) {
        let params = new URLSearchParams({
                category: category,
                q: search,
                from: "2026-09-19",
                sortBy: "publishedAt",
                apiKey: "949a57d32a5a4921919bfbca115627af",
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
                <div class="col-lg-4 mb-5">
                        <div class="item">
                                <div class="card text-light overflow-hidden">
                                        <img class="mb-4" src="${item.urlToImage}" alt="" style="aspect-ratio: 16/9">
                                        <h4 class="px-3 mb-3 title">${item.title.slice(0, 30)}...</h2>
                                        <h6 class="px-3 mb-3 description">${item.description}</h6>
                                        <h6 class="px-3 mb-3 publishedAt">Publication Date : ${item.publishedAt}</h6>
                                        <h6 class="px-3 mb-3 source">Source : ${item.source.name}</h6>
                                        <a href="${item.url}" target="_blank" class="btn d-block m-auto mt-2 mb-4">
                                                <span>See More</span>
                                        </a>
                                </div>
                        </div>
                </div>
        `;
}
getData('business', '');