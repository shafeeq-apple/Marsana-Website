// --- FIX 1: Added code for the Entry Screen ---
// Get the main elements
const entryScreen = document.getElementById("entry");
const mainContent = document.getElementById("main");
const enterButton = document.getElementById("enterBtn");

// When the "ENTER" button is clicked
enterButton.addEventListener("click", () => {
  // Add a fading out class (optional, but smooth)
  entryScreen.style.opacity = "0"; 
  
  // After the fade, hide the entry screen and show the main content
  setTimeout(() => {
    entryScreen.style.display = "none";
    mainContent.classList.remove("hidden"); // Show the main content
  }, 400); // 400ms matches the fade
});


// --- FIX 2: Corrected the "Book Now" button logic ---
document.querySelectorAll(".book-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    // Get the car name from the data attribute
    const carName = e.target.closest(".car-card").getAttribute("data-car");
    
    // CORRECTED: The ID in your HTML is "carField", not "selectedCar"
    document.getElementById("carField").value = carName; 
    
    // Show the popup
    document.getElementById("popup").classList.remove("hidden");
    // Use 'flex' for display as per your CSS
    document.getElementById("popup").style.display = "flex"; 
  });
});

// Close popup
document.getElementById("closePopup").onclick = function () {
  document.getElementById("popup").style.display = "none";
  document.getElementById("popup").classList.add("hidden");
};

// --- FIX 3: Corrected the form data saving ---
document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // CORRECTED: Use the 'name' attributes from your index.html
  const booking = {
    name: this.user_name.value,     // Was 'this.name.value'
    mobile: this.user_mobile.value, // Was 'this.mobile.value'
    date: this.pickup_date.value,   // Was 'this.date.value'
    car: this.selected_car.value,   // Was 'this.car.value'
    timestamp: new Date().toLocaleString()
  };

  // Get existing bookings
  const existing = JSON.parse(localStorage.getItem("marsana_bookings") || "[]");

  // Add new booking
  existing.push(booking);

  // Save back to local storage
  localStorage.setItem("marsana_bookings", JSON.stringify(existing));

  alert("Booking successfully received!");

  this.reset();
  document.getElementById("popup").style.display = "none";
});