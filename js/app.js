const usersWrapperEl = document.querySelector(".users-wrapper")
const usersSkeletonEl = document.querySelector(".users-skeleton")
console.log(usersSkeletonEl);

function fetchData(endpoint, callback, closeSkeleton){
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
        .finally(()=> {
            closeSkeleton()
        })
}
fetchData("/users?limit=5", createUser, closeUserSkeleton)

function closeUserSkeleton() {
    usersSkeletonEl.style.display = "none"
}
function createUser(data){
    console.log(data);
    
    data?.users?.forEach((item) => {
        const cardEl = document.createElement("div")
        cardEl.className = "users-card"

        cardEl.innerHTML = `
              <div class="users-card__header">
                    <img src="${item.image}" alt="" class="users-card__image">
                    <div>
                        <h3>${item.firstName} ${item.lastName}</h3>
                        <span class="users-card__age">${item.age}yosh</span>
                    </div>
                </div>
                <div class="users-card__body">
                    <p><strong>Gender:</strong>${item.gender}</p>
                    <p><strong>Email:</strong> ${item.email}</p>
                    <p><strong>Telefon:</strong> ${item.phone}</p>
                    <p><strong>Tug‘ilgan sana:</strong>${item.birthDate}</p>
                    <p><strong>Manzil:</strong> ${item.address.city}, ${item.address.country}</p>
                    <p><strong>Kompaniya:</strong> ${item.company.name} – ${item.company.title}</p>
                    </div>
        `
        usersWrapperEl.appendChild(cardEl)
    })
}
let offset = 0
let totalShown = 0;

function seeMore() {
    offset++;
    usersSkeletonEl.style.display = "grid"
    fetchData(`/users?limit=5&skip=${offset * 5}`, (data) => {
      if (totalShown >= 10) {
        usersWrapperEl.innerHTML = ""; 
        totalShown = 0; 
      }
  
      createUser(data);
  
      totalShown += data.users.length;
    }, closeUserSkeleton);
}

const siderEl = document.querySelector(".sidebar");
console.log(siderEl);

function toggleSidebar() {
    siderEl.classList.toggle("show");
}