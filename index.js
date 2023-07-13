// data store
const seats = [
  {
    occupied: false,
    booked: false
  },
  {
    occupied: true,
    booked: false
  },
  {
    occupied: false,
    booked: false
  },
  {
    occupied: false,
    booked: false
  },
  {
    occupied: false,
    booked: false
  }
]
// helpers for data to/from localstorage
function jsonSeatsToLocalStorage(arr) {
  let jsonSeats = JSON.stringify(arr);
  localStorage.setItem('jsonSeats', jsonSeats);
}
const jsonLocalSeats = localStorage.getItem('jsonSeats');
let parsedLocalSeats = JSON.parse(jsonLocalSeats);
console.log(parsedLocalSeats);
// on page load, read localstorage values and add true values for 'booked' as DOM classes
document.addEventListener('DOMContentLoaded', ()=> { 
  if (parsedLocalSeats !== null) {
    parsedLocalSeats.map((seat, index) => {
      if (seat.booked == true) {
        document.querySelector(`#seat${index + 1}`).classList.add('booked');
      }
    });
  }
});
// data mapping
seats.map((seat, index) => {
  if (seat.occupied == true) {
    document.querySelector(`#seat${index + 1}`).classList.add('occupied');
  }
});

// event listeners
const domSeats = [
  document.querySelector("#seat1"), 
  document.querySelector("#seat2"), 
  document.querySelector("#seat3"), 
  document.querySelector("#seat4"), 
  document.querySelector("#seat5")
]
domSeats.forEach((domSeat, index) => {
  domSeat.addEventListener('click', () => {
    if (!domSeat.classList.contains('occupied')) {
      if (domSeat.classList.contains('booked')) {
        domSeat.classList.remove('booked');
      } else {
        domSeat.classList.add('booked');
      }
    }
    if (parsedLocalSeats === null) {
      seats.forEach((seat, index2) => {
        if (index == index2) {
          if (domSeat.classList.contains('booked')) {
            seat.booked = true
          } else {
            seat.booked = false
          }
        }
      });
      jsonSeatsToLocalStorage(seats);
    } else {
      parsedLocalSeats.forEach((seat, index2) => {
        if (index == index2) {
          if (domSeat.classList.contains('booked')) {
            seat.booked = true
          } else {
            seat.booked = false
          }
        }
      });
      jsonSeatsToLocalStorage(parsedLocalSeats);
    }
  });
});