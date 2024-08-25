//get variabls of html code to javascript code===========
let questionDiv = document.querySelector(".question");
let answers = document.querySelector(".answers");
let result = document.querySelector(".result");
let submit_btn = document.getElementById("submit_btn");

//first value for all=========
let currentIndex = 0;
let scorr = 0;
let questionsArray = [];

//contect json fille with js file =====
const contactJsonFile=()=>{
  fetch("products.json")
  .then(response=>response.json())
  .then(data=>{
    questionsArray=data
    console.log(questionsArray);
    starteQuiz()
  })
}
// starte quiz==========
const starteQuiz=()=>{
  currentIndex=0;
  scorr=0;
  submit_btn.innerHTML="next";
  creatAllQuestions()
}
// creat all questions============
const  creatAllQuestions=()=>{
  result.innerHTML="";
  questionDiv.innerHTML="";
  answers.innerHTML="";
  submit_btn.style.display="none";
  let currentValue=questionsArray[currentIndex];
  let currentNum=currentIndex+1;
  questionDiv.innerHTML=`${currentNum}-${currentValue.question}`;

  //creat answers=============
  currentValue.answers.forEach(answer => {
    const parentDiv=document.createElement("div");
    parentDiv.classList.add("Answer");
    parentDiv.innerHTML=answer.text;
    answers.appendChild(parentDiv);

    //whene i click in sum answer===========
    parentDiv.onclick=()=>{
      submit_btn.style.display='inline-block'
      if(answer.correct==true){
        parentDiv.classList.add("true")
        scorr++;
      }else{
        parentDiv.classList.add("false")
      }
      Array.from(answers.children).forEach(btn=>{
        if(btn.innerHTML==answer.text && answer.correct==true){
          btn.classList.add('true')
        }else{
          btn.classList.add("false")
        }
      })
    }
  });
}

// show result ============
const showResult=()=>{
questionDiv.innerHTML="";
answers.innerHTML="";
submit_btn.innerHTML="play again";
result.innerHTML=`your sccored is ${scorr} from ${questionsArray.length}`;
}
// handelResult=======
const handelResult=()=>{
  currentIndex++;
  if(currentIndex<questionsArray.length){
    creatAllQuestions()
  }else{
    showResult()
  }
}
// whene  click in submit btn===========
submit_btn.onclick=()=>{
  if(currentIndex<questionsArray.length){
    handelResult()
  }else{
    starteQuiz()
  }
}
contactJsonFile()