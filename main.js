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
    navbarMenu.classList.remove('open')
    // 스크롤될때 항상 classList open 제거해줘서 메뉴창 닫아주기
    newScrollIntoView(link);
    selectNavItem(target);
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

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('open');
    // 이거뭔데? toggle??
    //토글은 해당하는 요소에 이미 클래스가 지정되어져 있다면 remove 하고 만약 클래스가 지정되어져 있지 않다면 add 해주어요 :) 
    // 토글링 한다고 할때는 버튼을 누르는 것처럼 (버튼이 켜져 있다면 꺼지고, 꺼져 있다면 켜지는것처럼) 클래스가 있다면 빼주고 없다면 추가해주는 유용한 API예요 :) 
})


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

    // Remove selection from the previous item and select the new one
    const active = document.querySelector('.category__btn.selected')
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    // 클릭된 노드가 button이면 그대로 e.target을 쓰고, 아니면(span일테니) e.target.parentNode를 쓴다.
    target.classList.add('selected');


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




// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다.
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

// 1.
const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];
const sections = sectionIds.map(id => document.querySelector(id));
// 각각 문자열을 가진 배열인데, map을 이용해 각각의 id를 dom요소로 변환하는 새로운 배열을 만든다.
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
// `[data-link="${id}"]` 이부분 띠용? 어차피 스트링 아닌가? 왜 id앞뒤로 ""를 써줘야하는거지? data-link="#about"처럼. 어찌보면 당연한 것 같기도하고.

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove('active')
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

// 2. 
const observerOptions = {
    root:null,
    rootMargin:'0px',
    threshold:0.3,
}

const observerCallback = (entries, observer) =>{
    entries.forEach(entry=>{
        if(!entry.isIntersecting && entry.intersectionRatio > 0) {// entry가 진입할 때의 반대니까 빠져나가는 section을 가리키고 있다.
            // 페이지 처음 시작하면 intersectionRatio가 하나도 없기 떄문에 entry.intersectionratio>0인 애들중에서만 처리
            // console.log(entry.target); //빠져나가는 section
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // console.log(index, entry.target.id);
            

            // 스크롤링이 아래로 되어서 페이지가 올라옴
            if(entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else{
                selectedNavIndex = index - 1;
            }
        }
    });
}
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if(window.scrollY === 0){ // 제일 위라면
        selectedNavIndex = 0;
    } else if (Math.ceil(window.scrollY + window.innerHeight) >= document.body.clientHeight // 반올림, 제일 밑으로 도달했다면
    // 이거 window.scrollY는 문서가 수직으로 얼마나 스크롤됐는지,
    // window.innerHeight는 스크롤막대의 높이, 즉 창의 내부 높이
    ) {
        selectedNavIndex = navItems.length - 1; 
    }
    selectNavItem(navItems[selectedNavIndex]);
    
});