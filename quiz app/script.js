import { questions } from "./questions.js";


//function that shuffle the order of question
function shuffle(argu) {
  let shuffleQus = argu.sort(() => Math.random() - 0.5);
  return shuffleQus;
}

//tracking points 
const obj1 = {}


//function for counting points 
const countPoints = function(argu){

    let count = 0;
    for (const key in argu) {
      count++
    };
    return count;

}

//function that frequntly update point
function updatePoints() {
  const points = document.getElementById("points");
  let cpoints = points.innerHTML.split(" ");
  setInterval(() => {
    let currPoint = countPoints(obj1);
    if (currPoint !== null) {
      cpoints[1] = currPoint;
      points.innerHTML = cpoints.join(" ");
    }
  }, 100);
}


//variable that stores major elements of question blocks 
const main = document.querySelector(".main");

//function for displaying questions
function displayQes(argu, qNo) {
  main.children[1].firstElementChild.innerHTML = `Question No.${++qNo}`;

  main.children[2].firstElementChild.innerHTML = argu["question"];

  const optionShuffle = argu["options"];
  const optionDiv = main.children[3].children;
  for (let i = 0; i < optionShuffle.length; i++) {
    optionDiv[i].innerHTML = optionShuffle[i].answer;
  }
}

//function that executes at last and displayes score on screen 
function displayScore(nQ){
 let mainElem = Array.from(main.children);
 mainElem.splice(1,3).forEach((v)=>{
  if(!v.classList.contains("navigate")){
    main.removeChild(v);
  }
  }
)
  const scoreElement = document.createElement("div");
  scoreElement.innerHTML=`you scored ${countPoints(obj1)} out of  ${++nQ}`;
  scoreElement.className = "score";
  scoreElement.style.fontWeight="bolder";
  mainElem[0].after(scoreElement);

  const button = mainElem.at(-1).firstElementChild;
  button.innerHTML="replay";
  button.addEventListener("click",()=>{
    window.location.reload(true);
    }
  )
}


//function for verifing answer and indicate wrong and right answers 
function ansValidate(argu) {
  const options = document.querySelector(".options").children;
  const handelEvent = (event) => {
    const a = document.querySelector(".question-no");
    let qno = a.children[0].innerHTML;
    let crt = argu[Number(qno.split(" ")[1].split(".")[1]) - 1].options;
    for (const key in crt) {
      if (crt[key].answer === event.target.innerHTML && crt[key].conditions) {
        obj1[qno]=true;
       
        event.target.style.backgroundColor = "rgb(85, 236, 85)";
        event.target.style.border = "1.5px solid black";

        break;
      } else if (
        crt[key].answer !== event.target.innerHTML &&
        crt[key].conditions
      ) {
       
        event.target.style.backgroundColor = "rgb(241, 74, 74)";
        event.target.style.color = "white";
        event.target.style.border = "1.5px solid black";
        
        for (const x in crt) {
          if (crt[x].conditions) {
            options[x].style.backgroundColor = "rgb(85, 236, 85)";
            options[x].style.border = "1.5px solid black";
           
          }
        }
      };
      
    }

    Array.from(options).forEach((a1) => {
      a1.classList.remove("hover");
      a1.removeEventListener("click", handelEvent);

    });
  };
  Array.from(options).forEach((v) => {
    v.addEventListener("click", handelEvent);
  });
}


//main function - starting point of js script 
function mainFunction(){
  
  const shuffleQus = shuffle(questions);
  let count = 0;
  shuffleQus[count].options.sort(() => Math.random() - 0.5);
  // console.log(shuffleQus[count].options);
  displayQes(shuffleQus[count], count);

  const nextButton = document.getElementById("nextQ");
  const handelNext =  () => {
    if (count !== shuffleQus.length - 1) {
      count++;
      shuffleQus[count].options.sort(() => Math.random() - 0.5);
      displayQes(shuffleQus[count], count);
      const options = document.querySelector(".options").children;
      Array.from(options).forEach((v) => {
        v.style = null;
      });
      
      ansValidate(shuffleQus);
    }else{
      nextButton.removeEventListener("click",handelNext);
       displayScore(count);

    }
  }
  nextButton.addEventListener("click",handelNext);
  updatePoints();
  ansValidate(shuffleQus);
}
mainFunction();
