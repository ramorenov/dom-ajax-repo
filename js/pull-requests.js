const pullPromise = fetch(
  "https://api.github.com/repos/codeyourfuture/js-exercises/pulls"
);
const pullWrap = document.getElementById("pull-requests-list");
const pullBtn = document.querySelectorAll(".nav-link")[2];
const pullSearch = document.getElementById("search");

const prom = pullPromise.then(response => response.json());

function renderData(promise) {
  promise
    .then(data => {
      const html = data
        // .filter(fil => fil.user.login == "minotad66")
        .map(pull => {
          return `<li class="pull">
                <a target="b_blank" href= "${pull.html_url}"> ${pull.title} </a>
                </li>`;
        });
      return html.join(""); // el metodo join concatena todos los elementos del array
    })
    .then(htmlList => {
      pullWrap.innerHTML = htmlList;
    });
}

function renderDataFilter(promise, user) {
  promise
    .then(data => {
      const html = data
        .filter(fil => fil.user.login.includes(user))
        .map(pull => {
          return `<li class="pull">
                <a target="b_blank" href= "${pull.html_url}"> ${pull.title} </a>
                </li>`;
        });
      return html.join(""); // el metodo join concatena todos los elementos del array
    })
    .then(htmlList => {
      pullWrap.innerHTML = htmlList;
    });
}

pullBtn.addEventListener("click", function() {
  renderData(prom);

  event.preventDefault();
});

pullSearch.addEventListener("keyup", function(e) {
  const user = e.target.value;
  console.log(user);
  if (user === "") {
    renderData(prom);
  } else {
    renderDataFilter(prom, user);
  }
});
