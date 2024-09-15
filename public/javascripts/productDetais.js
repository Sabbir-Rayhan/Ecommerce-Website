let maining = document.getElementById("mainimg");
let smallimg = document.querySelectorAll(".small");

console.log(maining);

// smallimg.forEach((element)=>{
//     element.addEventListener('click',()=>{
//         maining.src = element.src;
//     })
// })

smallimg.forEach((data) => {
  data.addEventListener("click", () => {
    maining.src = data.src;
  });
});

// Payment Method Portion
const productButton = document.querySelector(".productButton");
console.log(productButton);
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

function checkLoginAndRedirect() {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  if (token) {
      window.location.href = '/payment';
  } else {
      alert("Log in first");
  }
}

