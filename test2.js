// utilities for testing

// this function just adds the test result to the page
function addTestDom(element, color, text) {
  var body = document.getElementsByTagName("body")[0];
  var elem = document.createElement(element);
  elem.style.color = color;
  elem.innerHTML = text;
  body.appendChild(elem);
}

// this it() function describes a group of tests
function it(description, contents) {
  var body = document.getElementsByTagName("body")[0];
  var elem = document.createElement("h3");
  elem.innerHTML = "It " + description;
  body.appendChild(elem);
  console.log("\n\n It " + description + "");
  contents();
}

// checks strict equality of expectation and target for passing test
// eg. expect(calvin.mood).tobe("happy");
function expect(expectation) {
  return {
      tobe: function(target) {
        if (target === expectation) {
          var passTxt = "PASSED " + "Expected " + target + " to be " + expectation;
          addTestDom("p", "green", passTxt);
          console.log('\n   %cPASSED', 'color:green;', 'Expected', target, 'to be', expectation );
        return true;
        } else {
          var failTxt = "FAILED " + "Expected " + target + " to be " + expectation;
          addTestDom("p", "red", failTxt);
          console.log('\n     %cFAILED', 'color:red;', 'Expected', target, 'to be', expectation );
          return false;
        }
      }
    };
}



///////////


//Trade constructor
function Trade(name, costPerUnit){
  this.name = name;
  this.costPerUnit = costPerUnit;
}
  Trade.prototype.incomePerUnit = function(targConsumer){
    var roughIncPerUnit = targConsumer.pricePerUnit - this.costPerUnit;
    return roughIncPerUnit;
  };

//targetConsumer constructor
function targetConsumer(name, pricePerUnit){
  this.name = name;
  this.pricePerUnit = pricePerUnit;
}

///////////

var painting = new Trade("painting", 150);
var photography = new Trade("photography", 125);
var accessible = new targetConsumer("accessible", 350);
var exclusive = new targetConsumer("exclusive", 800);

///////////

it("should make rough income equal to 650", function() {
  expect(painting.incomePerUnit(exclusive)).tobe(650);
});

it("should expect photography to have a name of 'photography'", function() {
  expect(photography.name).tobe("photography");
});

it("should expect price per unit of accessible to be 350", function() {
  expect(accessible.pricePerUnit).tobe(350);
});
