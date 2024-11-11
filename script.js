const carousel = document.querySelector(".carousel");
const arrowBtn = document.querySelectorAll(".wrapper i");
const cardWidth = carousel.querySelector(".card").offsetWidth; 

arrowBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -cardWidth : cardWidth;
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.dropdown-btn');

  dropdowns.forEach(button => {
    button.addEventListener('click', function () {
      const dropdown = this.parentElement;

      dropdown.classList.toggle('active');
      
      const dropdownContent = dropdown.querySelector('.dropdown-content');
      
      if (dropdown.classList.contains('active')) {
        dropdownContent.style.display = 'block';
      } else {
        dropdownContent.style.display = 'none';
      }
    });
  });
});
