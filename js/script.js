import regeneratorRuntime, { async } from 'regenerator-runtime';
import fetchMeta from 'fetch-meta-tags' // To remove, this just doesn't work
import JSConfetti from 'js-confetti'





const randomSentences = [
    "Do not the cat",
    "Ya like jazz?",
    "Toast!",
    "As seen on TV!",
    "Classy!",
    "Now with 30% more HTML!",
    "At least 30% bug free!",
    "Déjà vu!",
    "What's up?",
]


const christmasSentences = [
    "Merry Christmas!",
    "Happy Holidays!",
    "Happy New Year!",
    "It's that time of the year again!",
]

// august 23rd 2003
const birthday = new Date(2003, 7, 23);
let yearsAmount = new Date(Date.now() - birthday.getTime()).getUTCFullYear() - 1970;

// st, nd, rd, th, etc.
const prefixes = ["st", "nd", "rd", "th"];
let suffix = prefixes[yearsAmount % 10 - 1] || "th";


const birthdaySentences = [
    "Happy Birthday to me!",
    `Today is my ${yearsAmount}${suffix} birthday!`,
    `Today I turn ${yearsAmount}!`,
]


const randomGradients = [
    "linear-gradient(to top right, #EC38AD, #6f10dc)",
    "linear-gradient(to top right, #FC5C7D, #6A82FB)",
    "linear-gradient(to top right, #7F00FF, #E100FF)",
    "linear-gradient(to top right, #ff9966, #ff5e62)",
    "linear-gradient(to top right, #4568DC, #B06AB3)",
    "linear-gradient(to top right, #A770EF, #CF8BF3, #FDB99B)",
    "linear-gradient(to top right, #E96443, #904E95)",
    "linear-gradient(to top right, #FF5F6D, #FFC371)",


    // Unused Gradients

    // "linear-gradient(to top right, #8A2387, #E94057, #F27121)",
    // "linear-gradient(to top right, #DA4453, #89216B)",
    // "linear-gradient(to top right, #642B73, #C6426E)",

]

let sectionNum = 0;


document.addEventListener('DOMContentLoaded', async function() { 
    // scroll to the top
    window.scrollTo(0, 0);
    


    // check if today is christmas
    if (new Date().getMonth() == 11 && new Date().getDate() == 24) {
        document.getElementById("sentence").innerHTML = christmasSentences[Math.floor(Math.random() * christmasSentences.length)];
    } else if(new Date().getMonth() == 7 && new Date().getDate() == 23) {
        document.getElementById("sentence").innerHTML = birthdaySentences[Math.floor(Math.random() * birthdaySentences.length)];
    } else {
        document.getElementById("sub").innerHTML = randomSentences[Math.floor(Math.random() * randomSentences.length)];
    }
    
    document.documentElement.style.setProperty('--gradient', randomGradients[Math.floor(Math.random() * randomGradients.length)]);

    let sections = document.getElementsByClassName("content");



    // find the current section on page load
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top < window.scrollY) {
            sectionNum = i;
        } 
    }


    // scroll dot
    document.getElementsByClassName("scrollIndicator")[0].innerHTML = ""
        for (let i = 0; i < sections.length; i++) {
            
            document.getElementsByClassName("scrollIndicator")[0].innerHTML += `
            <a href="#${sections[i].id}" data-number="${i}"><div class="dot" data-active="${i == sectionNum ? true : false}"><div id="tooltip">${sections[i].id.charAt(0).toUpperCase() + sections[i].id.slice(1)}</div></div></a> 
        `
    }   


    

    


    // add onscroll event listener
    window.addEventListener('scroll', async function() {

        let sectionNum = Math.floor(((window.scrollY / (document.body.scrollHeight - window.innerHeight + 5)) * 100) / (100 / sections.length));
        console.log(sectionNum)


        let indicators = document.getElementsByClassName("scrollIndicator")[0].children;
        for (let i = 0; i < indicators.length; i++) {
            indicators[i].children[0].dataset.active = false;
        }

        indicators[sectionNum].children[0].dataset.active = true;
        // set the page's title to the section's title
        // document.title = sections[sectionNum].id;


        // screen specific effects

        if(sectionNum == 0) {
            document.getElementById("scrolldownPrompt").style.opacity = 1;
            document.getElementsByClassName("navbar")[0].dataset.fluid = false;
        } else {
            document.getElementById("scrolldownPrompt").style.opacity = 0;
            document.getElementsByClassName("navbar")[0].dataset.fluid = true;
        }

    })


    // if the user holds down the left mouse button on the #propic element and moves the mouse, move the #propic element to the cursor position
    let dragImg = false;
    document.addEventListener('mousedown', function(e) {
        if(e.target.id == "propic") {
            dragImg = true;
        }
    })

    // Easter Egg
    document.addEventListener('mousemove', function(e) {
        if(!dragImg){
            document.getElementById("propic").style.transform = `translate(0px, 0px)`;
            this.documentElement.style.cursor = "default";
            return;
        }

        let center = {
            x: document.getElementById("propic").getBoundingClientRect().left + document.getElementById("propic").getBoundingClientRect().width / 2,
            y: document.getElementById("propic").getBoundingClientRect().top + document.getElementById("propic").getBoundingClientRect().height / 2
        }

        let pos = {
            x: e.clientX - center.x,
            y: e.clientY - center.y
        }

        if(e.clientX < 0 || e.clientX > window.innerWidth || e.clientY < 0 || e.clientY > window.innerHeight){
            dragImg = false;
            this.documentElement.style.cursor = "default";
            return;
        }

        document.getElementById("propic").style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        let dist = Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2));
        this.documentElement.style.cursor = "grabbing!important";
    })

    document.addEventListener('mouseup', function(e) {
        dragImg = false;
    })
})



window.wait = async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.fetchPresence = async function () {
    const url = "https://api.lanyard.rest/v1/users/305771483865546752";

    // fetch the JSON from the url
    let response = await fetch(url);
    let data = await response.json();

    // return the presence
    if (!data.success)
        return "Couldn't fetch presence";
    console.log(data);
    return data;
}


