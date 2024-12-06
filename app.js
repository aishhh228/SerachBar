const searchButton = document.getElementById('searchBtn');
const inputText = document.getElementById('inputText');
const userList = document.getElementById('userList')
const ageGroupDropdown = document.getElementById('ageGroup')

let userData = [];

const fetchData = async () =>
    {
        const data =await  fetch('https://dummyjson.com/users');
        const res = await data.json();
        userData = res.users;
        displayUser(userData);
        console.log(userData)
    } 

const displayUser = (users)=>{
    userList.innerHTML = ''; 
    users.map(user => {
        const listItem = document.createElement('div');
        listItem.classList.add('list'); // Add a CSS class for styling
        listItem.textContent = `${user.id}. ${user.firstName} ${user.lastName}, Age: ${user.age},  Address: ${user.address?.address || 'N/A'}, ${user.address?.city || 'N/A'}`;
        userList.appendChild(listItem);
    });
}

const serachResult = () =>{
    const query = inputText.value.toLowerCase();
    if (query.trim() === '') {
        displayUser(userData);
        return;
    }

    const filterData = userData.filter(user =>
        user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query)
    );
    displayUser(filterData); 

}
searchButton.addEventListener('click',serachResult
)
inputText.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        serachResult();
    }
});

const filterByAge = () =>{
    const selectedAgeGroup = ageGroupDropdown.value;
    let filteredData = userData;
    if (selectedAgeGroup) {
        const [minAge, maxAge] = selectedAgeGroup.split('-').map(Number);

        // If the group is '60+', we handle it separately as it has no max age
        if (selectedAgeGroup === '60+') {
            filteredData = userData.filter(user => user.age >= 60);
        } else {
            filteredData = userData.filter(user => user.age >= minAge && user.age <= maxAge);
        }
    }
        displayUser(filteredData);
}

ageGroupDropdown.addEventListener('change',filterByAge )
fetchData();