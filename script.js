// Select relevant DOM elements
const carButtons = document.querySelectorAll(".car button");
const selectedCarList = document.querySelector(".car-list");
const totalPriceElement = document.getElementById("total-price");
const totalVATPriceElement = document.getElementById("total-vat-price");

// Prices per car
const carPrices = {
  1: 140, 
  2: 90,
  3: 100, 
  4: 80,  
  5: 150  
};

// Function to calculate totals
function calculateTotals() {
  const selectedCars = document.querySelectorAll(".selected-car");
  let subTotal = 0;

  selectedCars.forEach(car => {
    const days = parseInt(car.querySelector("select").value);
    const pricePerDay = parseInt(car.getAttribute("data-price"));
    subTotal += days * pricePerDay;
  });

  totalPriceElement.textContent = `$${subTotal.toFixed(2)}`;
  const totalWithVAT = subTotal * 1.15;
  totalVATPriceElement.textContent = `$${totalWithVAT.toFixed(2)}`;
}

// Function to handle deletion of a selected car
function deleteCar(event) {
  const selectedCar = event.target.closest(".selected-car");
  selectedCar.remove();
  calculateTotals();
}

// Add delete button functionality
function addDeleteButtonListener(button) {
  button.addEventListener("click", deleteCar);
}

// Add event listener for "Rent" buttons
carButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const carElement = e.target.closest(".car");
    const carId = carElement.id;
    const carName = carElement.querySelector("h2").textContent;
    const carPrice = carPrices[carId];
    const carImageSrc = carElement.querySelector("img").src;

    // Check if car is already selected
    const existingCar = selectedCarList.querySelector(`.selected-car[data-id="${carId}"]`);
    if (existingCar) {
      alert(`${carName} is already in your selection.`);
      return;
    }

    // Create a new selected car entry
    const selectedCar = document.createElement("div");
    selectedCar.classList.add("selected-car");
    selectedCar.setAttribute("data-id", carId);
    selectedCar.setAttribute("data-price", carPrice);

    selectedCar.innerHTML = `
      <img src="${carImageSrc}" alt="${carName}">
      <img class="delete-button" src="images/icons8-delete-64.png" alt="Delete">
      <div class="selected-car-details">
        <h2>${carName}</h2>
        <p>$${carPrice} / day</p>
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </div>
      <h2 id="price">$${carPrice}</h2>
      
    `;

    // Update totals when days are changed
    selectedCar.querySelector("select").addEventListener("change", (event) => {
      const days = parseInt(event.target.value);
      const carTotalElement = selectedCar.querySelector("#price");
      carTotalElement.textContent = `$${(days * carPrice).toFixed(2)}`;
      calculateTotals();
    });

    // Add delete button functionality
    const deleteButton = selectedCar.querySelector(".delete-button");
    addDeleteButtonListener(deleteButton);

    selectedCarList.insertBefore(selectedCar, document.querySelector(".total-price"));
    calculateTotals();
  });
});


// Form Validation and Submit Functionality
document.getElementById("contactForm").addEventListener("submit", (event) => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const number = document.getElementById("number").value.trim();
  const comment = document.getElementById("comment").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10,15}$/; 

  // Validate fields
  if (!name) {
      alert("Please enter your name.");
      return;
  }

  if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
  }

  if (!number || !phoneRegex.test(number)) {
      alert("Please enter a valid phone number (10-15 digits).");
      return;
  }

  if (!comment) {
      alert("Please enter a comment.");
      return;
  }

  // If all validations pass
  alert("Message sent successfully!");
  document.getElementById("contactForm").reset(); // Clear the form
});

const bookButton = document.querySelector("#book-button");

document.addEventListener("DOMContentLoaded", () => {
  bookButton.addEventListener("click", () => {
    const totalVATPriceElement = document.getElementById("total-vat-price");
    const totalVAT = parseFloat(totalVATPriceElement.textContent.replace('$', ''));

    if (isNaN(totalVAT) || totalVAT <= 0) {
      alert("Your cart is empty or invalid total price.");
      return;
    }

    const confirmation = confirm(`Are you sure you want to spend $${totalVAT.toFixed(2)} on your rental?`);

    if (confirmation) {
      alert("Thank you for your purchase! Proceeding to checkout...");
    } else {
      alert("Purchase canceled. Feel free to make changes to your selection.");
    }

  });

});
