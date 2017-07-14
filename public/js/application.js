

// submit the calculation and open the calculator handler
function openCalculatorHandler(event) {
  console.log("hello");
  event.preventDefault();

  // spinner actions
  $('.spinner').fadeIn();
  $('.overlay').fadeIn();

  //clear all calculators
  // $('#calculator').remove();

  // prepare request
  var that = this;
  var url = $(this).attr("action");
  var data = $(this).serialize();

  // post request
  $.post(url, data)
    .done(function(json) {
      // hide button
      $(that).find('.button-primary').hide();

      // create beer div
      console.log(json);
      beerDiv = "<div class='beer-div'><h3 class='beer-title'><a class='title-link beer-name-title'>" + json.beer + "</a></h3><p class='beer-details-p' style='display: none;'>" + json.description + "</p></div>"
      console.log(beerDiv)
      b = $(beerDiv).hide();
      console.log(b);
      $('#main-div').append(b);
      b.fadeIn(600);


      // fetch the designated calculator div
      var elt = document.getElementById('calculator');

      // options object for the calculator
      var options = {
        // turn off the topbar in the expressions
        expressionsTopbar: false
      };
      // instantiate a calculator inside the div element, and pass it the options obj
      var calculator = Desmos.GraphingCalculator(elt, options);
      // create the expressions that will be inside the calculator
      calculator.setExpression({id:'expression', latex: ['y= ' + json.expression]});
      calculator.setExpression({id:'result', latex: ['y= ' + json.result]});

      var r = $(elt).hide();
      // console.log(r);
      $(that).closest('#main-div').append(r);
      $(r).css("height", "500px");
      setTimeout(function(){
        r.fadeIn(800);
      }, 800);

    })
  .always( function() {
    // spinner actions
    $('.spinner').fadeOut();
    $('.overlay').fadeOut();
  });
};


// toggle beer description
function openBeerDescriptionHandler(event) {
  console.log(this);
  descrip = $(this).parent().find('p');
  console.log(descrip);
  descrip.fadeToggle(400);
}


var bindEvents = function() {

  // open calculator handler
  $('#calculation-form').on("submit", openCalculatorHandler);

  $('#main-div').on("mouseenter", ".beer-title", openBeerDescriptionHandler).on("mouseleave", ".beer-title", openBeerDescriptionHandler);
}

$(document).ready(function() {

  // bind events;
  bindEvents();
  // scroll listener for nav
  $(window).scroll(function(){
    if ($(this).scrollTop() > 170) {
      $('#nav').fadeIn(150);
    } else {
      $('#nav').fadeOut(150);
    }
  });

  // DESMOS API INFO
  // var elt = document.getElementById('calculator');
  // var calculator = Desmos.GraphingCalculator(elt);
  // calculator.setExpression({id:'graph1', latex:'y=x^2'});
});
