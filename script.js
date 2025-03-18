const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

const accessKey = "b4bIJYzu82oMS85VTMuBZZth4o-UDC2H2Z1cDQBcHXM";


let keyword = " ";
let page = 1;
async function searchImages(){
    keyword= searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const response= await fetch(url);
    const data = await response.json();

    if(page==1){
        searchResult.innerHTML = '';
        showMoreBtn.style.display = 'none';
        
    }
    const results = data.results;
    results.map((result)=>{
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target="_blank";
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    showMoreBtn.style.display = results.length >= 12? 'block' : 'none';
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page=1;
    searchImages();
});

showMoreBtn.addEventListener('click', ()=>{
    page++;
    searchImages();
});