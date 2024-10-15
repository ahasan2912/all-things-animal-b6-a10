//categories button load form api
const loadCategoriesBtn = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await res.json();
    displayCategories(data.categories);
}

//all categories picture load form api
const loadAllCategories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await res.json();
    dispalyAllCategories(data.pets);
}

//categorywise data showing
const loadCategoriesWiseData = async (categorie, id) => {
    const categories = categorie.toLowerCase();
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categories}`);
    const data = await res.json();
    removeActiveClass();
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList.add('active');
    spinnerTime();
    const timeOut = setTimeout(() => {
        document.getElementById('lds-facebook').classList.add("hidden");
        dispalyAllCategories(data.data);    }, 2000);
};

//details information
const loadDetailsInfo = async (petId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json(res);
    displayDetailsInfo(data.petData);
}
//dispaly all categories
const dispalyAllCategories = (categories) => {
    //sorting
    document.getElementById('sorting').addEventListener('click', () => {
        spinnerTime();
        setInterval(() => {
            document.getElementById('lds-facebook').classList.add("hidden");
            document.getElementById('lds-facebook').classList.add("hidden");
            const sort = categories.sort((a, b) => {
                return b.price - a.price;
            });
            dispalyAllCategories(sort);
        }, 2000);
    });
    const allCategoryContainer = document.getElementById('all-category-container');
    allCategoryContainer.classList.remove('hidden');
    allCategoryContainer.innerHTML = "";
    if (categories.length === 0) {
        const div = document.createElement('div');
        allCategoryContainer.classList.remove('grid');
        div.innerHTML = `
        <div class="text-center flex flex-col items-center justify-center bg-slate-300 py-10 rounded-xl">
            <img src="images/error.webp">
            <h1 class="text-3xl font-bold">No Information Available</h1>
            <p></p>
        </div>
        `;
        allCategoryContainer.appendChild(div);
    }
    else {
        allCategoryContainer.classList.add('grid');
    }
    categories.forEach((item) => {
        const { petId, breed, category, date_of_birth, price, image, gender, pet_details, vaccinated_status, pet_name } = item;
        const div = document.createElement('div');
        div.classList = ("flex flex-col items-start border p-3 rounded-lg gap-3");
        div.innerHTML = `
        <img class="rounded-xl w-full" src="${image}" alt="Picture" />
        <div class="space-y-1">
            <h4 class="text-2xl font-extrabold">${pet_name}</h4>
            <p class="text-base"><i class="fa-solid fa-border-all"></i> Breed: ${breed ? `${breed}` : `Not Available`}</p>
            <p class="text-base"><i class="fa-solid fa-calendar-days"></i> Birth: ${date_of_birth ? `${date_of_birth}` : `Not Available`}</p>
            <p class="text-base"><i class="fa-solid fa-mercury"></i> Gender: ${gender ? `${gender}` : `Not Available`}</p>
            <p class="text-base"><i class="fa-solid fa-dollar-sign"></i> Price : ${price ? `${price}` : `Not Available`}</p>
            <div class="text-center border-t xl:space-x-2">
                <button class="px-3 py-3 rounded-md bg-[#0E7A81] text-white text-base mt-3 font-semibold hover:bg-gray-400" onclick = "showStoreImage('${image}')"><i class="fa-regular fa-thumbs-up"></i></button>                
                <button id="btn-${petId}" class="px-2 py-3 rounded-md bg-[#0E7A81] text-white text-base font-semibold hover:bg-gray-400" onclick="countDownFunction(${petId})">Adopt</button>
                <button class="px-2 py-3 rounded-md bg-[#0E7A81] text-white text-base font-semibold hover:bg-gray-400" onclick = "loadDetailsInfo(${petId})">Details</button>
            </div>
        </div>
        `;
        allCategoryContainer.appendChild(div);
    });
}

//display Categories
const displayCategories = async (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach((item) => {
        const { id, category, category_icon } = item;
        const div = document.createElement('div');
        div.innerHTML = `
        <div id="btn-${id}" onclick ="loadCategoriesWiseData('${category}',${id})" class="flex gap-1 justify-center items-center border rounded-lg w-[150px] sm:w-60 h-24  hover:ease-in-out catagori-wise-btn">
            <img class="w-14" src="${category_icon}">
            <button class="text-2xl font-bold">${category}</button>
        </div>
        `
        categoryContainer.appendChild(div)
    });
};

const showStoreImage = (image) => {
    const storeImageContainer = document.getElementById('store-image');
    const div = document.createElement('div');
    div.innerHTML = `
    <img class="rounded-lg" src ="${image}">
    `;
    storeImageContainer.appendChild(div);
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('catagori-wise-btn');
    for (let btn of buttons) {
        btn.classList.remove('active');
    }
};

const displayDetailsInfo = (petData) => {
    // document.getElementById('showModalData').click();
    document.getElementById('customModal').showModal();
    const { petId, breed, category, date_of_birth, price, image, gender, pet_details, vaccinated_status, pet_name } = petData;
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <div class="mb-3">
        <img class="w-full rounded-lg" src="${image}">
        <h4 class="text-2xl font-extrabold my-3">${pet_name}</h4>
        <div class="flex space-x-10 items-start mb-2">
            <div class="space-y-1 text-base font-semibold">
                <p class="text-base"><i class="fa-solid fa-border-all"></i> Breed: ${breed ? `${breed}` : `Not Available`}</p>
                <p class="text-base"><i class="fa-solid fa-mercury"></i> Gender: ${gender ? `${gender}` : `Not Available`}</p>
                <p class="text-base"><i class="fa-solid fa-mercury"></i> Vaccinated: ${vaccinated_status ? `${vaccinated_status}` : `Not Available`}</p>
            </div>
            <div class="space-y-1 text-base font-semibold">
                <p class="text-base"><i class="fa-solid fa-calendar-days"></i> Birth: ${date_of_birth ? `${date_of_birth}` : `Not Available`}</p>
                <p class="text-base"><i class="fa-solid fa-dollar-sign"></i> Price : ${price ? `${price}` : `Not Available`}</p>
            </div>
        </div>
        <div class="border-t">
            <h4 class="text-xl font-semibold mt-2">Details Information</h4>
            <p class="text-base mt-2">${pet_details}</p>
        </div>
    </div>
    `
}
const spinnerTime = () => {
    document.getElementById('lds-facebook').classList.remove("hidden");
    document.getElementById('all-category-container').classList.add('hidden');
}

const countDownFunction = ((petId) => {
    document.getElementById('customModal-two').showModal();
    const showTimer = document.getElementById('show-timer');
    const countDown = document.getElementById('show-the-number');
    let number = 3;
    showTimer.classList.remove('hidden');
    const interval = setInterval(() => {
        countDown.innerText = number;
        number--;
        if (number < 0) {
            clearInterval(interval);
            document.getElementById('customModal-two').close();
            countDown.innerText = 3;
        }
    }, 1000);
});

loadCategoriesBtn();
loadAllCategories();
