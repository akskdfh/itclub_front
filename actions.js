function scrollTo(element) {
    window.scroll({
      left: 0, 
      top: element.offsetTop, 
      behavior: 'smooth'
    })
  }
  
  var button = document.querySelector('a');
  var footer = document.querySelector('#team');
  
  button.addEventListener('click', () => {
    scrollTo(footer);
  })