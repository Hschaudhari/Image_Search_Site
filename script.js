const apiKey = 'fTtxf1Ow7MHsGY3NowI7WwU_ZH-ai5Xn30oUpKPDW1k';
const formELe = document.querySelector("form")
const input = document.getElementById("search-field")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-btn")


let inputData = "";
let page = 1;

async function searchImages(){
    inputData = input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`

     const res = await fetch(url)
     const data = await res.json();
     const results = data.results; //converting json data into images so we store in result

     if(page === 1){
        searchResults.innerHTML = "";
     }
     results.map((result)=>{
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add('image-section');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imgLink = document.createElement('a');
        imgLink.href = result.links.html;
        imgLink.target = "_blank";
        imgLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imgLink);
        searchResults.appendChild(imageWrapper)
     })
     
     page++

     if(page>1){
        showMore.style.display = 'block';
     }
    
}

formELe.addEventListener("submit",(event)=>{
    event.preventDefault()
    page = 1;
    searchImages()
    input.innerHTML = ""
})

showMore.addEventListener("click",()=>{
    
    searchImages()
})