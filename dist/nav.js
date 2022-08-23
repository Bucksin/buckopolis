/**
 * Page Navigation --------------------------------------------------
 */

//constants
const aboutMeButton = document.getElementById('about-me-button');
const educationButton = document.getElementById('education-button');
const workButton = document.getElementById('work-button');
const projectsButton = document.getElementById('projects-button');
const greenHighlightBar = document.getElementById('green-bar');
const greyhighlightBar = document.getElementById('grey-bar');
const linkButtons = document.querySelectorAll('.nav-button');
const navMenu = document.getElementById('nav-buttons');
const menuButton = document.getElementById('menu-button');
const loadingScreen = document.getElementById('loading-screen');
let mobileView = null;
let scrollAction = null;
let highlightAction = null;
let currentPage = 0;

//nav button event listeners
for(const object of linkButtons) {
    object.addEventListener('mouseover', (e) => {
        highlightPageTitle(e.currentTarget)
    })
    object.addEventListener('mouseleave', (e) => {
        highlightPageTitle('revert');
    })
}

aboutMeButton.addEventListener('click', (e)=> {
pageScroll(0);
})

educationButton.addEventListener('click', (e)=> {
pageScroll(1);
})

workButton.addEventListener('click', (e)=> {
pageScroll(2);
})

projectsButton.addEventListener('click', (e)=> {
pageScroll(3);
})

//page scroll function
function pageScroll (pagenum) {

    currentPage = pagenum;

    if(scrollAction) {
        clearInterval(scrollAction);
    }

    let scrollPosition = window.scrollX;
    // console.log('scrollPosition ' + scrollPosition);

    const windowWidth = window.innerWidth > 1200 || window.innerWidth <= 600 ? window.innerWidth:1200;
    let scrollTarget = windowWidth * pagenum;
    // console.log('scrollTarget ' + scrollTarget);

    let scrollDirection = (scrollTarget - scrollPosition) / Math.abs(scrollPosition - scrollTarget);
    // console.log('scrollDirection ' + scrollDirection);

    let scrollRate = scrollDirection * Math.abs(scrollTarget - scrollPosition) * 0.05;

    // console.log('scrollRate ' + scrollRate);

    for(const link of linkButtons) {
        link.style.opacity = '0.8';
    }
    linkButtons[currentPage].style.opacity = '1';

    scrollAction = setInterval( () => {
        window.scrollBy(scrollRate, 0);
        scrollPosition = window.scrollX;
        if(Math.abs(scrollTarget - scrollPosition) < 100 ) {
            clearInterval(scrollAction);
            window.scrollTo(scrollTarget,0);
        }
    }, 10);

    if(mobileView) {
        toggleMobileMenu();
    }

}




//page resizing function
window.addEventListener('resize', windowSizeCheck);

function windowSizeCheck () {
    const windowWidth = window.innerWidth > 1200 || window.innerWidth <= 600 ? window.innerWidth:1200;
    window.scrollTo(currentPage * windowWidth, 0);
    highlightPageTitle('revert');
    console.log(mobileView);
    if(windowWidth <= 600 && !mobileView) {
        changeLayoutConfig('mobile');
    }
    if(windowWidth >= 600 && mobileView) {
        changeLayoutConfig('desktop');
    }
}

//navbar highlighting positioning
function highlightPageTitle (target) {
    const windowWidth = window.innerWidth > 1200 ? window.innerWidth:1200;

    if(target === 'revert') {

        let greenWidth = Math.round(linkButtons[currentPage].getBoundingClientRect().right / windowWidth * 100);
        let greyWidth = Math.round( (windowWidth - linkButtons[currentPage].getBoundingClientRect().left) / windowWidth * 100)
        greenHighlightBar.style.width = greenWidth + '%';
        greyhighlightBar.style.width = greyWidth + '%';
    } else {

        // console.log('target.getBoundingClientRect()  ');
        // console.log(target.getBoundingClientRect());
        let greenWidth = Math.round(target.getBoundingClientRect().right / windowWidth * 100);
        let greyWidth = Math.round( (windowWidth - target.getBoundingClientRect().left) / windowWidth * 100)
        greenHighlightBar.style.width = greenWidth + '%';
        greyhighlightBar.style.width = greyWidth + '%';
    }

}

//config for elements in mobileview vs. desktop-view
function changeLayoutConfig (layout) {
    if(layout === 'desktop') {
        mobileView = false;
        navMenu.style.height = '100%';
        navMenu.style.transition = 'none';
        console.log('changing to desktop');
        highlightPageTitle('revert');


    } else if (layout === 'mobile') {
        mobileView = true;
        console.log('changing to mobile');
        navMenu.style.height = '0px';
        menuButton.scrollTop = 32;
        navMenu.style.transition = '0.2s';

    }
}



//mobile-view menu button toggle
menuButton.addEventListener('click', toggleMobileMenu
)

function toggleMobileMenu () {
    const position = menuButton.scrollTop;
    console.log(position);

    if(position < 16) {
        navMenu.style.height = '0';
        const buttonScroll = setInterval(()=> {
            menuButton.scrollTop +=2
            if(menuButton.scrollTop >= 32) {
                menuButton.scrollTop = 32;
                clearInterval(buttonScroll);
            }
        }, 10)
    } else {
        navMenu.style.height = '300px';
        const buttonScroll = setInterval(()=> {
            menuButton.scrollTop -=2
            if(menuButton.scrollTop <= 0) {
                menuButton.scrollTop = 0;
                clearInterval(buttonScroll);
            }
        }, 10)
    }
}

//initialize navigation elements
function initializeNavigation () {
    mobileView = window.innerWidth <= 600 ? true : false;
    if(mobileView) {changeLayoutConfig('mobile')};
    if(!mobileView) {changeLayoutConfig('desktop')};

    pageScroll(0);
    windowSizeCheck();



}

window.addEventListener('load', initializeNavigation);


//initialize page 1
function initailizePage1 () {

}

function toggleScrollArrowIndicator (input) {
    if(input === 'show') {

    } else if (input === 'hide') {

    }
}