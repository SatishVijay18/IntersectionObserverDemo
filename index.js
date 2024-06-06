const cards = document.querySelectorAll(".card");

const cardContainer = document.querySelector(".card-wrapper");

function getNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "new card";
    card.classList.add("card");
    observer.observe(card);
    cardContainer.append(card);
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      //   if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  {
    root: document.querySelector(".card-wrapper"),
  }
);

const observeLastCard = new IntersectionObserver((entries) => {
  const lastcard = entries[0];
  if (!lastcard.isIntersecting) return;
  getNewCards();
  observeLastCard.unobserve(lastcard.target);
  observeLastCard.observe(document.querySelector(".card:last-child"));
});

observeLastCard.observe(document.querySelector(".card:last-child"));

cards.forEach((card) => {
  observer.observe(card);
});
