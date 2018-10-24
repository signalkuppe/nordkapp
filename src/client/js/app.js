
(function () {
  new SmoothScroll('a[href*="#"]', {offset: 0})
  stickybits('.nav',{useStickyClasses: true, stickyBitStickyOffset: -1})

  function slideIndex() {
    var current = this.currentSlide
    let links = document.querySelectorAll('.ristorante-carosello-pager')
    Array.from(links).forEach(function (l, i){
      l.classList.remove('js-is-active')
      if (i === current) {
        l.classList.add('js-is-active')
      }
    })
  }
  var mySiema = new Siema({
    loop: true,
    onChange: slideIndex
  });

  // slideshow
  Siema.prototype.addArrows = function() {
    // make buttons & append them inside Siema's container
    this.prevArrow = document.createElement('button');
    this.nextArrow = document.createElement('button');
    this.prevArrow.innerHTML = '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path></svg>';
    this.nextArrow.innerHTML = '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path></svg>';
    this.selector.appendChild(this.prevArrow)
    this.selector.appendChild(this.nextArrow)
    
    // event handlers on buttons
    this.prevArrow.addEventListener('click', () => this.prev());
    this.nextArrow.addEventListener('click', () => this.next());
  }
  
  Siema.prototype.addPagination = function() {
    for (let i = 0; i < this.innerElements.length; i++) {
      var btn = document.createElement('a');
      btn.classList.add('ristorante-carosello-pager')
      btn.innerHTML = '&#9632;';
      if (i === 0) {
        btn.classList.add('js-is-active')
      }
      var _this = this
      btn.addEventListener('click', function (e) {
        _this.goTo(i)
        let links = document.querySelectorAll('.ristorante-carosello-pager')
        Array.from(links).forEach(function (l){
          l.classList.remove('js-is-active')
        })
        e.target.classList.toggle('js-is-active')

      })
      this.selector.appendChild(btn);
    }
  }
  
  // Trigger pagination creator
  mySiema.addPagination();
  mySiema.addArrows();
  gumshoe.init()

  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();

  // orari
  document.getElementById('orari-open').addEventListener('click', function (e) {
    document.getElementById('orari').classList.toggle('js-is-open')
  })
  
})()
