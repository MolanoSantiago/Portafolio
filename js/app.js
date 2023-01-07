const menu = document.querySelector(".menu");
const openMenuBtn = document.querySelector(".open-menu");
const closeMenuBtn = document.querySelector(".close-menu");

function toggleMenu() {
  menu.classList.toggle("menu_opened");
}

openMenuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);

const menuLinks =document.querySelectorAll('.menu a[href^="#"]')

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id")
    const menuLink = document.querySelector(`.menu a[href="#${id}"]`)

    if (entry.isIntersecting) {
      document.querySelector(".menu a.selected").classList.remove("selected")
      menuLink.classList.add("selected")
    }
  });
}, {rootMargin: "-25% 0px -75% 0px"});

menuLinks.forEach(menuLink => {
  menuLink.addEventListener("click", function(){
    menu.classList.remove("menu_opened");
  })

  const hash = menuLink.getAttribute("href");
  const target = document.querySelector(hash);
  if (target) {
    observer.observe(target)
  }

})

if(document.querySelector('#container-slider')){
  setInterval('fntExecuteSlide("next")',5000);
}
//------------------------------ LIST SLIDER -------------------------
if(document.querySelector('.listslider')){
  let link = document.querySelectorAll(".listslider li a");
  link.forEach(function(link) {
     link.addEventListener('click', function(e){
        e.preventDefault();
        let item = this.getAttribute('itlist');
        let arrItem = item.split("_");
        fntExecuteSlide(arrItem[1]);
        return false;
     });
   });
}

function fntExecuteSlide(side){
   let parentTarget = document.getElementById('slider');
   let elements = parentTarget.getElementsByTagName('li');
   let curElement, nextElement;

   for(var i=0; i<elements.length;i++){

       if(elements[i].style.opacity==1){
           curElement = i;
           break;
       }
   }
   if(side == 'prev' || side == 'next'){

       if(side=="prev"){
           nextElement = (curElement == 0)?elements.length -1:curElement -1;
       }else{
           nextElement = (curElement == elements.length -1)?0:curElement +1;
       }
   }else{
       nextElement = side;
       side = (curElement > nextElement)?'prev':'next';

   }
   //RESALTA LOS PUNTOS
   let elementSel = document.getElementsByClassName("listslider")[0].getElementsByTagName("a");
   elementSel[curElement].classList.remove("item-select-slid");
   elementSel[nextElement].classList.add("item-select-slid");
   elements[curElement].style.opacity=0;
   elements[curElement].style.zIndex =0;
   elements[nextElement].style.opacity=1;
   elements[nextElement].style.zIndex =1;
}