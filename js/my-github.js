// Write code here to communicate with Github

const repoWrap = document.getElementById("repos-list");
const gitBtn = document.querySelectorAll(".nav-link")[1];
const repoLength = document.getElementById("repos-count");
const uSearchBtn = document.getElementById("usearchbtn");
const gitUsearch = document.getElementById("usearch");
// const prom = Promise.resolve(data)

function promise(user = ramorenov) {
  let userName = user;
  let reposPromise = fetch(`https://api.github.com/users/${userName}/repos`);
  return reposPromise.then(response => response.json());
}

function renderData(promise) {
  promise
    .then(data => {
      const html = data.map(repo => {
        return `<li class="repo"> 
      <a target="b_blank" href= "${repo.html_url}"> ${repo.name} </a>
      </li>`;
      });
      return html.join(""); // el metodo join concatena todos los elementos del array
    })
    .then(htmlList => {
      repoWrap.innerHTML = htmlList;
    });
}

function renderLength(promise) {
  promise
    .then(repos => repos.length)
    .then(html => (repoLength.innerHTML = html));
}

gitBtn.addEventListener("click", function() {
  prom = promise("ramorenov");
  renderLength(prom);
  renderData(prom);

  event.preventDefault();
});

uSearchBtn.addEventListener("click", function() {
  if (gitUsearch.value == "") {
    userName = "ramorenov";
  } else {
    userName = gitUsearch.value;
  }

  console.log(userName);
  prom = promise(userName);
  renderLength(prom);
  renderData(prom);
  event.preventDefault();
});
