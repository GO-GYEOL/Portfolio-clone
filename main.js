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
    // target은 엘리먼트 가져오고 dataset은 그 엘리먼트의 dom가져오고 그 값인 link.
    // 여기서 link는 html의 데이터 중(클래스나 아이디같은) data-link임
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    //link가 없다면, undefined이나 null이라면 리턴
    console.log(event.target.dataset.link);
    //이제 navbar메뉴 눌러도 아무것도 안나옴.

    const scrollTo = document.querySelector(link);
    // 여기서의 scrollTo는 #home, #work 등의 아이디를 가진 엘리먼트를 의미한다.
    scrollTo.scrollIntoView({behavior:"smooth"});
    // scrollIntoView는 그 엘리먼트를 포함하는 부모엘리먼트로 이동시켜준다.
    behavior
    // 이부분 다시 한번 공부해보자. 되게 유용한 방법인듯
})