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


// 1) 쿼리셀렉터올 로 모든 프로젝트 불러오고, 이벤트리스너 클릭으로하고 클릭되면 펑션 발동, 그 펑션은 data-kind가 react, backend인 애들에 display:hidden 추가해주는 펑션이다. style.display:hidden하면될듯?

// const projects = document.querySelectorAll('.project');
// const webpageBtn = document.querySelector('.work__categories');
// webpageBtn.addEventListener('click', ()=>{
//     for(let i=0; i<8; i++){
//         console.log(projects[i]);
//         const kind = projects[i].dataset.kind;
//         console.log(kind);
//         if (kind == 'webpage'){
//             projects[i].classList.remove('hidden');
//         } else {
//             projects[i].classList.add('hidden');
//         }
//     }
// })
// console.log(projects);
// 이런식으로 하면 되느는데 버튼만 all webpage react backend로 나눠서 하면 되는거아냐
// 히든 지우는 것 대신 return 썼었는데 아예 작동조차 안한다. return이 다른 의미인듯.

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project')
workBtnContainer.addEventListener('click', (e)=>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
     // 이렇게 하는 이유는 숫자가 눌리는 경우는 span태그가 눌리는 것이므로 dataset.filter가 지정이 안돼있다. 그래서 부모노드의 dataset.filter 받아오는 것이다.
    if(filter == null){
        return;
    }
    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            console.log(project);
            if (filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
                // forEach는 for(let project of projects){}와 같다.
                // let project;
                // for(let i=0; i < projects.length; i++) {
                //     project = projects[i];
                // }
                // 와도 같다
        });
        projectContainer.classList.remove('anim-out');
    }, 300)
    // 0.3초 뒤에 필터링하고 anim-out을 없애줌
})
// 필터 나오고, 이용해서 dataset.type가 filter와 같으면 히든 지우고 그렇지 않으면 히든 추가한다. 하면 끝일듯.