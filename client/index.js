document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadPosts();
    const userForm = document.querySelector('#addUserForm');
    userForm.addEventListener('submit', addUserFormSubmitted);
    const postForm = document.querySelector('#addPostForm');
    postForm.addEventListener('submit', addPostFormSubmitted);
});

// Users
async function loadUsers() {
    const usersList = document.querySelector('#usersList');
    usersList.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/users/all`);
    response.data.users.forEach((user) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${user.firstname} ${user.lastname}, age ${user.age}`;
        usersList.appendChild(listItem);
    });
}

async function addUserFormSubmitted(event) {
    event.preventDefault();    
    const firstname = document.querySelector('#firstNameInput').value;
    const lastname = document.querySelector('#lastNameInput').value;
    const age = document.querySelector('#ageInput').value;
    let response = await axios.post(`http://localhost:3000/users/register`, { firstname, lastname, age });
    loadUsers();
}

// Posts
async function loadPosts() {
    const postsList = document.querySelector('#postsList');
    postsList.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/posts/all`);
    console.log(response.data)
    response.data.posts.forEach((post) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${post.poster_id}: ${post.body}`;
        postsList.appendChild(listItem);
    });
}

async function addPostFormSubmitted(event) {
event.preventDefault();
const poster_id = document.querySelector('#userId').value;
const body = document.querySelector('#postInput').value
let response = await axios.post(`http://localhost:3000/posts/register`, {poster_id, body});
loadPosts();
}
