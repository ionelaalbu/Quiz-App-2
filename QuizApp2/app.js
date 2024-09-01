const URL="https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"

let quizzes=[]
let currentQuestionIndex=0
let questionParent=document.querySelector(".question-container")
let optionParent=document.querySelector(".option-container")
let nextBtn=document.querySelector(".next")
let score=0
let category=document.querySelector(".quiz-category")
let countQuestion=document.querySelector(".qns-count")
let curentScore=document.querySelector(".score")
let finalContainer=document.querySelector(".finalContainer")
let quizContainer=document.querySelector(".quizContainer")
let backBtn=document.querySelector(".back")
let startBtn=document.querySelector(".start")
let quitBtn=document.querySelector(".quit")
let lastP=document.querySelector(".lastP")


const getData= async (url) =>{
    try{
        const { data: {results} }= await axios.get(url)
       return results
        
    }catch(err){
        console.log(err);   
    }
}
// the getData from above return a promise, that why must to create
// another function and an empty array and put the results inside that array

const getQuizzes=async()=>{
    quizzes=await getData(URL)
    console.log(quizzes);
}
getQuizzes()

function creatingGames(quizzes,index){
    //quiz info
    category.innerText=quizzes[index].category
    countQuestion.innerText=`Q${index+1} / ${quizzes.length}`
    questionParent.innerText=quizzes[index].question
    // options
    let options=[quizzes[index].correct_answer, ...quizzes[index].incorrect_answers].sort(()=>
    Math.random()-0.5)
    // looping over the entire array and creating the option btn
    for(let option of options){
        const optionBtn=document.createElement("button")
        optionBtn.classList.add("selectBtn")
        optionBtn.setAttribute("name", option)
        optionBtn.innerText=option
        optionParent.appendChild(optionBtn)
    }
}

startBtn.addEventListener("click", ()=>{
    quizContainer.style.display="block"
    currentQuestionIndex = 0;
    lastP.innerText=""
    questionParent.innerText = "";
    optionParent.innerText = "";
    score = 0;
    nextBtn.innerText="Next"
    creatingGames(quizzes, currentQuestionIndex);
})

// add event to next btn, every time when is clicked, new question come
nextBtn.addEventListener("click", ()=>{
    if(nextBtn.innerText==="Next"){
        currentQuestionIndex++;
        questionParent.innerText=""
        optionParent.innerHTML=""
        creatingGames(quizzes, currentQuestionIndex)
        if(currentQuestionIndex === 9){
            nextBtn.innerText="Submit";
            return;
        }
    }
    if(nextBtn.innerText === "Submit"){
        quizContainer.style.display="none"
        finalContainer.style.display="block"
        //let finalP=document.createElement("p")
        lastP.innerText=`Your score is: ${score}`
        //finalP.innerText=`Your score is: ${score}`
       // finalContainer.appendChild(finalP)
    }
})
backBtn.addEventListener("click", ()=>{
    finalContainer.style.display="none"
    quizContainer.style.display="none"
    currentQuestionIndex = 0;
    curentScore.innerText=""
    questionParent.innerText = "";
    optionParent.innerText = "";
    score = 0;
    creatingGames(quizzes, currentQuestionIndex);
})

quitBtn.addEventListener("click", ()=>{
    quizContainer.style.display="none"
    currentQuestionIndex = 0;
    curentScore.innerText=""
    questionParent.innerText = "";
    optionParent.innerText = "";
    score = 0;
    creatingGames(quizzes, currentQuestionIndex);
})

// add even to parent of answer btns
optionParent.addEventListener("click", (e)=>{
    
    if(e.target.name === quizzes[currentQuestionIndex].correct_answer){
        e.target.classList.add("correct")
        score++;
        curentScore.innerText=`Score: ${score}`
        disabled()
    }else if(e.target.name !== quizzes[currentQuestionIndex].correct_answer){
        score
        e.target.classList.add("incorrect")
        disabled()
    }
})
//disabled btn 
function disabled(){
    document.querySelectorAll(".selectBtn").forEach((button)=>(button.disabled=true))
}

setTimeout(()=>creatingGames(quizzes, currentQuestionIndex), 2000)