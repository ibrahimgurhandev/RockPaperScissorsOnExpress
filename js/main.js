let buttons = document.querySelectorAll("button")

buttons.forEach(x => x.addEventListener('click', myFunction))
let h2 = document.getElementById('h2')


function myFunction(e) {
  // console.log(e.target.value)
  let chosenButton = e.target.value
  console.log(chosenButton)
  fetch(`/api?choices=${chosenButton}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector('h2').innerHTML = `${data.answer}`
    })

  // .catch(err => {
  //   console.log("erro");
  // })

}