//due to some errors here '.js' is used
import reddit from "./redditapi.js";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// for advanced search
// creating drop down menu
document.getElementById("drop-btn").addEventListener("click",toggleMenu)

function toggleMenu() {
  document.getElementById("dropdown-content").classList.toggle("show");
}

window.onclick = function(e) {
  // to hide when click outside menu
  if (!e.target.matches('.drop-btn')) {
    document.getElementById("dropdown-content").classList.remove("show");
  }
}


// on search click getting search result and show on screen
searchForm.addEventListener("submit", (e) => {
  const searchTerm = searchInput.value;
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const searchLimit = document.getElementById("limit").value;

  if (searchTerm === "") {
    showMessage("Please add a search term", "alert-danger");
  }
  reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
    console.log(results);
    let output = "<div>";
    results.forEach((post) => {
      const imageTag = post.preview
        ? `<img class="card-img-top" src="${post.preview.images[0].source.url}" height="100" alt="Card image cap">`
        : "";
      output += `
      <div class="card card-item">
        <div class="card-body card-item-link">
          <div class="flow-row">
            <figure class="image-div">
              ${imageTag}
            </figure>
            <div class="description">
              <h5 class="card-title">${truncateText(post.title, 100)}</h5>
              <p class="card-text">${truncateText(post.selftext, 100)}</p>
            </div>
          </div>
          <hr>
          <div class="flow-row">
            <div class="badge badge-dark">${post.score}</div>
            <div class="read-more">
              <a href="${
                post.url
              }" target="_blank" class="btn btn-primary">Read More</a>
            </div>
          </div>
        </div>
      </div>
            `;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });
  //   searchTerm = "";
  e.preventDefault();
});

//show alert message for blank search
function showMessage(message, className) {
  //create div
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  //add element
  const searchContainer = document.getElementById("search-container");
  const search = document.getElementById("search");
  searchContainer.insertBefore(div, search);

  //remove after few seconds
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// to sorten text
function truncateText(text, limit) {
  const shortened = text.indexOf(" ", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened) + "...";
}
