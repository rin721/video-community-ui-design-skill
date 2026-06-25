const cardGrid = document.querySelector("#card-grid");
const stateBlock = document.querySelector("#state-block");
const toast = document.querySelector("#toast");
const searchInput = document.querySelector("#search-input");

const stateCopy = {
  loading: {
    title: "Loading fresh picks",
    body: "A compact skeleton keeps layout dimensions stable while content arrives.",
    role: "status",
  },
  empty: {
    title: "No matching media yet",
    body: "Try a broader query or reset filters to continue browsing.",
    role: "status",
  },
  error: {
    title: "Content could not load",
    body: "Explain the cause, preserve the layout, and offer a clear recovery action.",
    role: "alert",
  },
};

let items = [];
let currentState = "ready";

async function loadFixtures() {
  const response = await fetch("./data/fixtures.json");
  items = await response.json();
  render();
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = items.filter((item) =>
    [item.title, item.creator, item.category].some((value) => value.toLowerCase().includes(query)),
  );

  if (currentState === "loading" || currentState === "empty" || currentState === "error") {
    showState(currentState);
    return;
  }

  stateBlock.hidden = true;
  cardGrid.hidden = false;
  const visibleItems = filtered.length ? filtered : [];
  if (!visibleItems.length) {
    showState("empty");
    return;
  }
  cardGrid.innerHTML = visibleItems.map(renderCard).join("");
}

function renderCard(item) {
  return `
    <article class="media-card">
      <div class="media-card__thumb" role="img" aria-label="${item.thumbnailAlt}">
        <span>${item.duration}</span>
      </div>
      <div class="media-card__body">
        <p class="media-card__category">${item.category}</p>
        <h2>${item.title}</h2>
        <p class="media-card__meta">
          <span>${item.creator}</span>
          <span>${item.views} views</span>
          <span>${item.date}</span>
        </p>
      </div>
    </article>
  `;
}

function showState(state) {
  const copy = stateCopy[state];
  cardGrid.hidden = true;
  stateBlock.hidden = false;
  stateBlock.className = `state-block state-block--${state}`;
  stateBlock.setAttribute("role", copy.role);
  stateBlock.innerHTML = `
    <div aria-hidden="true" class="state-block__mark"></div>
    <h2>${copy.title}</h2>
    <p>${copy.body}</p>
    <button class="button button--primary" type="button" data-state="ready">Reset view</button>
  `;
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-state]");
  if (!button) return;
  currentState = button.dataset.state;
  toast.hidden = currentState !== "success";
  if (currentState === "success") currentState = "ready";
  render();
});

toast.querySelector("button").addEventListener("click", () => {
  toast.hidden = true;
});

searchInput.addEventListener("input", () => {
  currentState = "ready";
  render();
});

loadFixtures().catch(() => {
  currentState = "error";
  render();
});
