'use strict';


//Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark')
    }
});

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu')
navbarMenu.addEventListener('click', (event) => {
    // target은 event가 이루어진 엘리먼트 가져오고 dataset은 그 엘리먼트의 dom가져오고 그 값인 link.
    // 여기서 link는 html의 데이터 중(클래스나 아이디같은) data-link임
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    newScrollIntoView(link);
    // scrollIntoView는 그 엘리먼트를 포함하는 부모엘리먼트로 이동시켜준다.
    // 이부분 다시 한번 공부해보자. 되게 유용한 방법인듯
})

//혼자해본 contact me 버튼 누르면 contact로 이동기능
// const contactMe = document.querySelector('.home__contact')
// contactMe.addEventListener('click', (event)=>{
//     const target = event.target;
//     const link = target.dataset.link;
//     const scrollTo = document.querySelector(link);
//     scrollTo.scrollIntoView({behavior:"smooth"});
// })
const homeContactBtn = document.querySelector('.home__contact')
homeContactBtn.addEventListener('click', ()=>{
    newScrollIntoView('#contact');
}); 


// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', ()=>{
    if(window.scrollY > homeHeight /2){
        arrowUp.classList.add('visible');
    } else{
        arrowUp.classList.remove('visible');
    }
})



// Make home slowly fade to transparent as the windwo scrolls down.
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{
    home.style.opacity = 1 - window.scrollY / homeHeight
})


// Handle Click on the "arrow up" button
arrowUp.addEventListener('click', () => {
    newScrollIntoView('#home');
})

function newScrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:"smooth"});
}