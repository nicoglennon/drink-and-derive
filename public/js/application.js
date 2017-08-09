

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

      // disable form
      $("#calculation-form input, select").prop("disabled", true);

      // hide submit button
      $(that).find('.button-primary').hide();

      // create refresh button
      var refreshButton = `<button class="button button-primary u-full-width btn refresh-button" id="retry-button">Retry</button>`

      // create beer div
      console.log(json);
      var beerDiv = "<div class='beer-div five columns'><p class='over-beer-div'>Your beer is:</p><h3 class='beer-title'><a class='title-link beer-name-title'>" + json.beer + "</a>" + "<span class='down-arrow'>  ↓</span>" + "</h3><p class='beer-details-p' style='display: none;'>" + json.description + "</p></div>"
      console.log(beerDiv)
      b = $(beerDiv).hide();
      console.log(b);
      $('#main-div').append(b);
      b.fadeIn(600);

      // create solution div
      var solutionDiv = `
      <div class="row" id="solution-div">
        <div class="twelve columns">
          <label for="expression">Solution</label>
          <input class="u-full-width" id="solution" type="text" name="expression" value="` + json.result + `">
        </div>
      </div>`


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
      var s = $(refreshButton).hide();
      var t = $(solutionDiv).hide();

      $('#calculation-form').append(t);
      $(that).closest('#main-div').append(r);
      $(that).closest('#main-div').append(s);

      $(r).css("height", "500px");
      setTimeout(function(){
        t.fadeIn(600);
        r.fadeIn(600);
        s.fadeIn(600);
      }, 500);

    })
    .fail( function () {
      $('.spinner').hide();
      $('.overlay').hide();
      setTimeout(function() {
        alert("Calculation invalid - Make sure you include both an expression and an operation!");
      }, 100);
    })
    .always( function() {
      // spinner actions
      $('.spinner').fadeOut();
      $('.overlay').fadeOut();
    });
};


// open beer description
function openBeerDescriptionHandler(event) {
  $('#overlay').fadeIn(600);
  var descrip = $(this).parent().find('p.beer-details-p');
  descrip.fadeIn(600);
  $(this).toggleClass('beer-div-toggle');
  $('.down-arrow').fadeOut(200);
}

// close beer description
function closeBeerDescriptionHandler(event) {
  console.log(this);
  var descrip = $(this).parent().find('p.beer-details-p');
  descrip.fadeOut(0);
  $(this).toggleClass('beer-div-toggle');
  $('.down-arrow').fadeIn(400);
  $('#overlay').fadeOut(200);
}

// refresh page / retry calculation
function refreshPageHandler(event) {
  $('#calculation-form')[0].reset();
  $('#retry-button').fadeOut(1000, function(){ $(this).remove();});

  // remove the calculator contents
  setTimeout(function(){
    $('.dcg-container').fadeOut(400, function(){ $(this).remove();});
    $('#solution-div').fadeOut(400, function(){ $(this).remove();});
  }, 600);

  // make calculator div 0px high
  setTimeout(function() {
    $('#calculator').css('height', '0px');
  }, 1000);

  // remove beer div
  setTimeout(function(){
    $('.beer-div').fadeOut(800, function(){ $(this).remove();});
  }, 1000);

  // fade in the 'beer me' button to solve expression
  setTimeout(function() {
    $('#solve').fadeIn(800);
  },1600);

  // enable form
  $("#calculation-form input, select").prop("disabled", false);
}

var bindEvents = function() {

  // open calculator handler
  $('#calculation-form').on("submit", openCalculatorHandler);

  // hover over beer handler
  $('#main-div').on("mouseenter", ".beer-div", openBeerDescriptionHandler).on("mouseleave", ".beer-div", closeBeerDescriptionHandler);

  // click on retry button handler
    $('#main-div').on("click", "#retry-button", refreshPageHandler);
}

$(document).ready(function() {
  // bind events;
  bindEvents();
  // scroll listener for nav
  $(window).scroll(function(){
    if ($(this).scrollTop() > 160) {
      $('#nav').fadeIn(150);
    } else {
      $('#nav').fadeOut(150);
    }
  });
});
