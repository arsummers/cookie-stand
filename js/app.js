'use strict';

//Helper functions
var _random = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

//========================================
//Starts constructor function. Acts similar to an object, in that I can call elements from it below, and feed
//them to my specific objects.
var Salmon_cookies = function(store_name, location, min_cust, max_cust, store_open, store_close, avg_cookies_per_cust
) {
  this.store_name = store_name;
  this.store_type = 'Salmon Cookies';
  this.location = location;
  this.min_cust = min_cust;
  this.max_cust = max_cust;
  this.open_hour = store_open;
  this.close_hour = store_close;
  this.cookies_sold_each_hour = [];
  this.avg_cookies_per_cust = avg_cookies_per_cust || 6.3;
};

//Prints as a header above the table of necessary cookie numbers
var salmon_cookies_hours_list =[
  'Store Hours: ', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', 'Daily Location Total'
];

//I have an equation near the end of this section that pushes the total for each hour into this array, and another adding up each part
//of this array.
var daily_cookie_total = [];

// puts the table of hours together
var render_store_hours = function() {
  var target = document.getElementById('store-table');
  //creates elements for the 'Store Hours' part of the object
  var store_hour_name_row = document.createElement('tr');
  //creates elements for the list of hours
  var hour_list_td = document.createElement('td');

  for (var i = 0; i < salmon_cookies_hours_list.length; i++){
    hour_list_td = document.createElement('td');
    hour_list_td.textContent = salmon_cookies_hours_list[i];
    store_hour_name_row.appendChild(hour_list_td);
  }
  target.appendChild(store_hour_name_row);
};

render_store_hours();

//takes the math to calculate the cookies needed per hour from my basic objects lab. Reads the values
//assigned to different stores below. prototype says that is wants the method on the right to be associated
//object on the left
Salmon_cookies.prototype.cookies_per_hour = function() {
  var random_customers = Math.floor(_random(this.min_cust, this.max_cust));
  return Math.floor(this.avg_cookies_per_cust * random_customers);
};

//this uses elements from pike_store.cookies_per_hour function. The for loop tells the program how many hours
//it needs to calculate for before terminating. cookies_sold takes in the number that cookies_per_hour generated
Salmon_cookies.prototype.calculate_cookies_sold_each_hour = function() {
  for (var i = 0; i < 14; i++) {
    var cookies_sold = this.cookies_per_hour();
    //takes the number generated above in cookies_sold and adds it to the cookies_sold_each_hour array in the object
    this.cookies_sold_each_hour.push(cookies_sold);
  }
};

//instantiating area

var pike_store = new Salmon_cookies(
  'Salmon Cookies - Pike Place', 'Pike Place Market', 23, 65, '6AM', '8PM', 6.3
);

var seatac_store = new Salmon_cookies(
  'Salmon Cookies - Seatac Airport', 'Seatac Airport', 3, 24, '6AM', '8PM', 1.2
);

var seattle_center_store = new Salmon_cookies('Salmon Cookies - Seattle Center', 'Seattle, Center', 11, 38, '6 AM', '8AM', 3.7
);

var cap_hill_store = new Salmon_cookies(
  'Salmon Cookies - Capitol Hill', 'Capitol Hill', 20, 38, '6AM', '8AM', 2.3
);
var alki_store = new Salmon_cookies(
  'Salmon Cookies - Alki', 'Alki Beach', 2, 16, '6AM', '8PM', 4.6
);

//creates an array for a for loop to iterate over. Will pull info from instantiating area

var all_stores = [
  pike_store, seatac_store, seattle_center_store, cap_hill_store, alki_store
];

Salmon_cookies.prototype.render_all_stores = function() {
  //want to be able to make this loop over the array of store name and print each one by calling

  //getting elements
  this.calculate_cookies_sold_each_hour();
  var target = document.getElementById('store-table');
  //creates <tr></tr>
  var store_row = document.createElement('tr');
  //creates <td></td>
  var name_td = document.createElement('td');
  //puts text into the tags
  var cookie_hour_td = document.createElement('td');


  //store that comes after
  name_td.textContent = this.store_name;

  //adds <td> to <tr>
  store_row.appendChild(name_td);

  //adds table data for cookies_sold_each_hour

  for (var i = 0; i < 14; i++){
    cookie_hour_td = document.createElement('td');
    cookie_hour_td.textContent = this.cookies_sold_each_hour[i];
    store_row.appendChild(cookie_hour_td);
  }
  target.appendChild(store_row);
 
  //sums up the total cookie number for each store. breaks if I move it above store_row.appendChild(name)
  //something with a double for loop. will have to attach to list of hours object. Works and can access things
  //because it lives in a Salmon_cookies.prototype. Breaks when I take it out of prototype.
  var location_cookie_total = 0;
  for (i = 0; i < this.cookies_sold_each_hour.length; i++) {
    location_cookie_total += this.cookies_sold_each_hour[i];
  }

  //adds the cookie table to the page
  var cookie_total_td = document.createElement('td');
  cookie_total_td.textContent = location_cookie_total;
  //
  store_row.appendChild(cookie_total_td);

  //adds store_row to the necessary part of the page
  target.appendChild(store_row);
};

for (var k = 0; k < all_stores.length; k++) {
  all_stores[k].render_all_stores();
}

//function to print the hourly totals for under each cookie

var render_hourly_totals = function() {
  //want it to run after evertything else has run
  var target = document.getElementById('store-table');
  var word_total_row = document.createElement('tr');
  //var total_hour_footer = document.createElement('tfoot'); will be useful soon
  var total_space_td = document.createElement('td');

  total_space_td.textContent = 'Totals: ';
  word_total_row.appendChild(total_space_td);

  //one for loop to iterate the number of hours. Loop inside that to add the stores at that hour
  for (var i = 0; i < 14; i++) {
    var sum_each_hour = 0;
    for (var j = 0; j < all_stores.length; j++) {
      sum_each_hour += all_stores[j].cookies_sold_each_hour[i];
    }
    //pushes first 14 numbers generated into an array so I can add the array up for my final total
    daily_cookie_total.push(sum_each_hour);

    //prints calculations from sum_each_hour to page
    total_space_td = document.createElement('td');
    total_space_td.textContent = sum_each_hour;
    word_total_row.appendChild(total_space_td);
  }
  target.appendChild(word_total_row);

  //the values for daily_sum live in the array named daily_cookie_total
  for (var q = 0; q < 1; q++){
    var daily_sum = 0;
    daily_sum += daily_cookie_total;
  }

  //adds up the numbers in the daily_cookie_total array.
  var final_cookie_sum = 0;
  for(var f = 0; f < 14; f++){
    final_cookie_sum += daily_cookie_total[f];
  }

  //prints company-wide daily cookie amount to page
  var final_cookie_sum_td = document.createElement('td');
  final_cookie_sum_td.textContent = final_cookie_sum;
  word_total_row.appendChild(final_cookie_sum_td);
};

render_hourly_totals();



//Need to just add daily location total together and append to the footer of the table





/*ADDING FORMS*/
//form bits added in index.html -- will the table to a sales file later

//gets the html form from the other page
var form = document.getElementById('new-salmon-cookies');
//is it best practice to match ip the variables on the left with the ones from my constructor function?

form.addEventListener('submit', function(formSubmit) {
  formSubmit.preventDefault();
  console.log(formSubmit);
  // console.log(formSubmit.target.salmonCookiesName.value);
  var store_name = formSubmit.target.salmonCookiesName.value;
  var store_location = formSubmit.target.salmonCookiesLocation.value;
  var min_cust = formSubmit.target.salmonCookiesMinCust.value;
  var max_cust = formSubmit.target.salmonCookiesMaxCust.value;
  var store_open = formSubmit.target.salmonCookiesOpen.value;
  var store_close = formSubmit.target.salmonCookiesClose.value;
  var sold_each_hour = formSubmit.target.salmonCookiesSoldHour.value;
  var avg_cookie_order = formSubmit.target.salmonCookiesPerCust.value;

  console.log({
    salmonCookiesName: store_name,
    salmonCookiesLocation: store_location,
    salmonCookiesMinCust: min_cust,
    salmonCookiesMaxCust: max_cust,
    salmonCookiesOpen: store_open,
    salmonCookiesClose: store_close,
    salmonCookiesSoldHour: sold_each_hour,
    salmonCookiesPerCust: avg_cookie_order
  });
});
