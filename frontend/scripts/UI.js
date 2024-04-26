//When a card is clicked, it should move into view

//import { apiFetch } from "./api.js";

const servCards = document.querySelectorAll('.servCard');
const servContent = document.querySelector('.servContent');

servCards.forEach((card) => {
  card.addEventListener('click', () => {
    //card.style.transform = 'translateX(30vw)';
    servContent.scrollWidth = '40px'
  })
});

//When hamburger menu is clicked, it should transform into a 'x'
//when clicked, menu contents should showup

const menu = document.querySelector('.menu');
const menuCancel = document.querySelector('.menu-cancel');
const menuContent = document.querySelector('.menu-content');

let clicked = false;

 menu.addEventListener('click', () => {
  
  if(!clicked) {
  menuContent.style.zIndex = '5';
  clicked = true;
  } else {
  menuContent.style.zIndex = '-5';
  clicked = false;
  }
});

menuCancel.addEventListener('click', () => {
  
  if(!clicked) {
  menuContent.style.zIndex = '5';
  clicked = true;
  } else {
  menuContent.style.zIndex = '-5';
  clicked = false;
  }
}); 

    //When any link is clicked, it should scroll to the requested view

      function scrollToElement(elementClass) {
      const elementToScrollToView = document.querySelector(elementClass);
      const elementStyle = getComputedStyle(elementToScrollToView);
    
        if(elementStyle.display == 'none') {
           elementToScrollToView.style.display = 'flex';
        }
           elementToScrollToView.scrollIntoView({scrollBehavior:"smooth"});
    }


    //when card apply button clicked, select the learners on the form by defualt
    
    const applyFromCard = (license) => {
      if(typeof license === 'number')
      document.querySelector('#license').selectedIndex = license;
      scrollToElement('.section-application');
    }

  //Gets input valuesand validates

  function inputValue(inputID) {

    var input = document.querySelector(`#${inputID}`);

    if (!input.value) {
      input.style.border = '3.2px solid #e35252';
      input.placeholder = 'provide info';
    } else {
      input.style.border = 'unset';
      return input.value;
    }
  }

//submits the form info when form button is clicked
//recieves a json object as response

document.getElementById('application-submit').addEventListener('click', async() => {
  const gender = document.querySelector('input[name="gender"]:checked');
  const genderLabel = document.querySelector('.gender-label');

  const objPutData = {
    id: '00',
    name: inputValue('name'),
    lastname: inputValue('lastname'),
    gender: 'male',
    email: inputValue('email'),
    phone: inputValue('phone'),
    license: 'learners'
  }
  
  for(let [key, value] of Object.entries(objPutData)) {
    if(!(value.length > 0) || value == undefined) {
      return
    }
  }
  if (!gender) { 
    genderLabel.style.color = '#e35252';
    return
  } else {
    genderLabel.style.color = 'unset';
  }
  
    await apiFetch('PUT', 'application', objPutData)
    .then((res) => {

      document.querySelector('.application').style.display = 'none';
      document.querySelector('.section-application').innerText = `Application Submitted`;

      if(res.success) {
        Dialogue('Application Submitted',
        `${res.success}`,
        'Okay',
        undefined,
        () => {});
      } else {
      Dialogue('Application Submitted',
      `${res}`,
      'Okay',
      undefined,
      () => {}
    );
      }
  }).catch((error) => {
    if(error.error) {
      Dialogue('Error, Sorry Application Cancelled',
      `${error.error}`,
      undefined,
      'Okay',
      undefined,
      () => {});
      } else {
        Dialogue('Error, Sorry Application Cancelled',
        `${error}`,
        undefined,
        'Okay',
        undefined,
        () => {});
      }     
  })

})

//Function shows dialogue when called
const Dialogue = (diati, diamsg, diapos, dianeg, funpositive, funnegative) => {

  const dialoguebg = document.querySelector('.dialogue-bg');
  const dialogue = document.querySelector('.dialogue');
  const title = dialogue.firstElementChild;
  title.innerText = diati;
  const message = title.nextElementSibling;
  message.innerText = diamsg
  const btnpositive = message.nextElementSibling.firstElementChild;  

    if(typeof diapos === 'string') {
      console.log('Enabling pose');

      btnpositive.innerText = diapos;
      btnpositive.style.display = 'flex'
      dialoguebg.style.display = 'flex';

      btnpositive.addEventListener('click', () => { 
        if(funnegative) {funpositive();}

        console.log('Reverting pose');
        btnpositive.style.display = 'none';
        dialoguebg.style.display = 'none';
      });
  }

  
  if(dianeg) {
    console.log('Enabling nega');
    const btnnegative = btnpositive.nextElementSibling;
    btnnegative.innerText = dianeg;
    btnnegative.style.display = 'flex'
    dialoguebg.style.display = 'flex'

    btnnegative.addEventListener('click', () => { 
      if(funnegative) {funnegative();}
      
      console.log('Reverting nega');
      btnnegative.style.display = 'none';
      dialoguebg.style.display = 'none'
    });
  }
}