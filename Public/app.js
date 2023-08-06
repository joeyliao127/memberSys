const checkbox = document.querySelector("#contract");
const submit = document.querySelector("#submit");
const alert = document.querySelector(".alert p");
const num = document.querySelector(".calculator input");
const num_alert_text = document.querySelector(".calcu_alert");
const calcForm = document.querySelector("#square");

submit.addEventListener("click", (event) => {
  if (checkbox.checked) {
    console.log("checkbox已勾選");
  } else {
    console.log("checkbox未勾選");
    alert.style.display = "block";
    event.preventDefault();
  }
});

calcForm.addEventListener("submit", (event) => {
  if (num.value % 1 != 0) {
    event.preventDefault();
    num_alert_text.textContent = "(請輸入正整數)";
    num_alert_text.style.display = "block";
    setTimeout(() => {
      num_alert_text.style.display = "none";
    }, 3000);
  } else if (!num.value) {
    event.preventDefault();
    num_alert_text.textContent = "(請輸入數字)";
    num_alert_text.style.display = "block";
    setTimeout(() => {
      num_alert_text.style.display = "none";
    }, 3000);
  } else if (num.value < 0) {
    event.preventDefault();
    num_alert_text.textContent = "(請輸入大於0的整數)";
    num_alert_text.style.display = "block";
    setTimeout(() => {
      num_alert_text.style.display = "none";
    }, 3000);
  } else {
    event.preventDefault();
    url = `/square/${num.value}`;
    window.location.href = url;
  }
});

// calcForm.addEventListener("submit", (event) => {
//   if (num.value % 1 != 0) {
//     event.preventDefault();
//     num_alert_text.textContent = "(請輸入正整數)";
//     num_alert_text.style.display = "block";
//
//   } else if (!num.value) {
//     event.preventDefault();
//     num_alert_text.textContent = "(請輸入數字)";
//     num_alert_text.style.display = "block";
//     setTimeout(() => {
//       num_alert_text.style.display = "none";
//     }, 3000);
//   } else if (num.value < 0) {
//     event.preventDefault();
//     num_alert_text.textContent = "(請輸入大於0的整數)";
//     num_alert_text.style.display = "block";
//     setTimeout(() => {
//       num_alert_text.style.display = "none";
//     }, 3000);
//   } else {

//     this.submit();
//   }
// });
