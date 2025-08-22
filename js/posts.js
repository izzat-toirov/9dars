const postsWrapperEl = document.querySelector(".post-wrapper")


function fetchData(endpoint, callback){
    const promise = fetch(`https://dummyjson.com${endpoint}`) // return Promise
    promise 
        .then(response => {
            if(!response.ok){
                throw new Error('something went wrong')
            }
            return response.json()
        })
        .then(res => callback(res))
        .catch((err) => console.log(err))
        .finally()
}
fetchData("/posts?limit=5", createPosts)

function createPosts(data) {
    console.log(data);

    data?.posts?.forEach((item) => {
        const cardEl = document.createElement("div");
        cardEl.className = "post-card";

        cardEl.innerHTML = `
            <div class="post-card__header">
                <h3 class="post-card__title">${item.title}</h3>
            </div>
            <div class="post-card__body">
                <p class="post-card__text">
                    ${item.body.length > 120 ? item.body.substring(0, 120) + "..." : item.body}
                </p>
            </div>
            <div class="post-card__footer">
                <span>👍 ${item.reactions.likes}</span>
                <span>👎 ${item.reactions.dislikes}</span>
                <span>👁️ ${item.views}</span>
            </div>
        `;

        postsWrapperEl.appendChild(cardEl);
    });
}

let offset = 0
let totalShown = 0;

function seeMore() {
    offset++;
    fetchData(`/posts?limit=5&skip=${offset * 5}`, (data) => {
      if (totalShown >= 10) {
        postsWrapperEl.innerHTML = ""; 
        totalShown = 0; 
      }
  
      createPosts(data);
  
      totalShown += data.posts.length;
    });
}

const siderEl = document.querySelector(".sidebar");
console.log(siderEl);

function toggleSidebar() {
    siderEl.classList.toggle("show");
}