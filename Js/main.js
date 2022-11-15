let container = document.querySelector(".container");
let seats = document.querySelectorAll(".row .seat:not(.occupied)");
let count = document.getElementById("seatNum");
let total = document.getElementById("seatPrice");
let movieSelect = document.getElementById("Movies");
let ticketPrice = movieSelect.value;

getLocalData();

// for save movie and value with refresh
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// update and count
function updateSelectedCount() {
  // bec nodelist == queryall and use it in length
  let selectedSeats = document.querySelectorAll(".row .seat.selected");
  // to get value from nodelist and transform it to array
  // to get index of all selected seat
  // seat will loop in the selectedseats and seats will get values,indexof will get num of seat
  let seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));
  let seatCount = selectedSeats.length;
  count.innerHTML = seatCount;
  total.innerHTML = seatCount * ticketPrice;
}
// when change movie
movieSelect.addEventListener("change", (e) => {
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// get data from localStorage
function getLocalData() {
  let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats != null) {
    // to use array and for
    seats.forEach((seat, index) => {
      // bec indexof return when null = -1
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  let selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Selecting Seats
// container bec it easy in select dom
container.addEventListener("click", (e) => {
  // e will get any value in dom container
  // console.log(e.target);
  //   to select seats and not white
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // to make the seat selected with blue
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// to make the count and number the same when reload
updateSelectedCount();
