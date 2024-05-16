
let playersName=0;
function form() {
  const input = document.querySelector("input");
  const button = document.querySelector("button");
  

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    
    if (playersName !== 2) {
      if (input.value.trim() === "") {
        document.querySelector("h1").innerHTML = "please enter valid name";
      } else {
        const value = input.value.trim();
        e.preventDefault();
        sessionStorage.setItem(input.previousElementSibling.innerHTML,value);
        input.previousElementSibling.innerHTML = "player 2";
        input.value = "";
        playersName++
        
        console.log(playersName)
        if (playersName === 2) {
          input.previousElementSibling.innerHTML = "play";
          input.remove();
          button.innerHTML = "<a href='./play.html'>play</a>";
         
        }
      }
    }
  });
  const inputDiv = document.getElementById("input");
  inputDiv.addEventListener("click", () => {
    inputDiv.lastElementChild.innerHTML = "";
    
  });
}

async function main() {
  form();
  
}

main();
