'use strict';

//Helper functions
var _random = function(min, max){
    return Math.floor(Math.random()*(max - min) + min);
}

//========================================
//Starts constructor function. Acts similar to an object, in that I can call elements from it below, and feed
//them to my specific objects. 
var Salmon_cookies = function (store_name, location, min_cust, max_cust, store_open, store_close, avg_cookies_per_cust, location_cookie_total){
    this.store_name = store_name;
    this.store_type = 'Salmon Cookies';
    this.location = location;
    this.min_cust = min_cust;
    this.max_cust = max_cust;
    this.open_hour = store_open;
    this.close_hour =store_close;
    this.cookies_sold_each_hour = [];
    this.avg_cookies_per_cust = avg_cookies_per_cust || 6.3;
    this.location_cookie_total = [];
};


//got this printing, now I just need to make it into a table. Copy and pasted below in case it goes to shit
var salmon_cookies_hours = {
    store_hour_name: 'Store Hours: ',
    full_list: ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'],
    daily_total: 'Daily Location Total'
}

// gotta string it together
salmon_cookies_hours.render = function (){
    var target = document.getElementById('store-table');
    //creates elements for the 'Store Hours' part of the object
    var store_hour_name_row = document.createElement('tr');
    //creates elements for the list of hours
    var hour_list_td = document.createElement('td');
    //creates elements for "Daily Total"
    var daily_total_td = document.createElement('tr');
    
    //creates "Store Name" text
    store_hour_name_row.textContent = this.store_hour_name;
    //creates text for store hours
    hour_list_td.textContent = this.full_list;
    //creates "Daily Location Total" text
    daily_total_td.textContent = this.daily_total;

    //SHOULD add text for daily total to end of the list of store hours - live server not working
    //hour_list_td.appendChild(daily_total_td);

    //adds the list of hours next to "Store Name" text
    store_hour_name_row.appendChild(hour_list_td)
    store_hour_name_row.appendChild(daily_total_td);
    //hour_list_td.appendChild(daily_total_td);

    for (var i = 0; i < this.full_list.length; i++){
        var hour_list_td = document.createElement('td');
        store_hour_name_row.appendChild(hour_list_td);
    }
    target.appendChild(store_hour_name_row);
    //target.appendChild(hour_row);
}

salmon_cookies_hours.render();
//takes the math to calculate the cookies needed per hour from my basic objects lab. Reads the values
//assigned to different stores below. prototype sayds that is wants the method on the right to be associated
//object on the left
Salmon_cookies.prototype.cookies_per_hour = function() {
    var random_customers = Math.floor(_random(this.min_cust, this.max_cust));
    return Math.floor(this.avg_cookies_per_cust * random_customers);
};

//this uses elements from pike_store.cookies_per_hour function. The for loop tells the program how many hours
//it needs to calculate for before terminating. cookies_sold takes in the number that cookies_per_hour generated
Salmon_cookies.prototype.calculate_cookies_sold_each_hour = function () {
    for (var i = 0; i < 15; i++){
        var cookies_sold = this.cookies_per_hour();
    //takes the number generated above in cookies_sold and adds it to the cookies_sold_each_hour array in the object
        this.cookies_sold_each_hour.push(cookies_sold);
    }
};





//instantiating area
 
var pike_store = new Salmon_cookies('Salmon Cookies - Pike Place', 'Pike Place Market', 23, 65, '6AM', '8PM', 6.3);
var seatac_store = new Salmon_cookies('Salmon Cookies - Seatac Airport', 'Seatac Airport', 3, 24, '6AM', '8PM', 1.2);
var seattle_center_store = new Salmon_cookies('Salmon Cookies - Seattle Center', 'Seattle, Center', 11, 38, '6 AM', '8AM', 3.7);
var cap_hill_store = new Salmon_cookies('Salmon Cookies - Capitol Hill', 'Capitol Hill', 20, 38, '6AM', '8AM', 2.3);
var alki_store = new Salmon_cookies('Salmon Cookies - Alki', 'Alki Beach', 2, 16, '6AM', '8PM', 4.6);


//creates an array for a for loop to iterate over. Will pull info from instantiating area

var all_stores = [pike_store, seatac_store, seattle_center_store, cap_hill_store, alki_store];

Salmon_cookies.prototype.render_all_stores = function(){
//want to be able to make this loop over the array of store name and print each one by calling

    //getting elements
     this.calculate_cookies_sold_each_hour();
     var target = document.getElementById('store-table');
     //creates <tr></tr>
     var store_row = document.createElement('tr');
     //creates <td></td>
     var name_td = document.createElement('td');
     //puts text into the tags

     //store that comes after
     name_td.textContent = this.store_name;

     //adds <td> to <tr>
     store_row.appendChild(name_td);

     //adds table data for cookies_sold_each_hour
     var cookie_hour_td = document.createElement('td');
     cookie_hour_td.textContent = this.cookies_sold_each_hour;
     store_row.appendChild(cookie_hour_td); 

 //sums up the total cookie number for each store. breaks if I move it above store_row.appendChild(name)
  //something with a double for loop. will have to attach to list of hours object. Works and can access things
  //because it lives in a Salmon_cookies.prototype. Breaks when I take it out of prototype.
 var location_cookie_total = 0;
   for(var i = 0; i < this.cookies_sold_each_hour.length; i++){
       location_cookie_total += this.cookies_sold_each_hour[i];
   }

   //meant to print total sum for each store, but doesn't right now
   var cookie_total_td = document.createElement('td');
   cookie_total_td.textContent = location_cookie_total;
   //
   store_row.appendChild(cookie_total_td);

    //adds store_row to the necessary part of the page
    target.appendChild(store_row);
}

for(var k = 0; k < all_stores.length; k++){
    all_stores[k].render_all_stores();
}


//need to add the sum function in a way that will print and console.log for testing. The loopy function above
//should work for adding in new stores once I get the footer in for that

/*ADDING FORMS*/
//form bits added in index.html -- will the table to a sales file later


var button = document.getElementById('button-clicker');
var handle_button_press = function(event){
    alert('You have submitted cookies');
}

//button clicker alert works. Not set to log anything yet though.
button.addEventListener('click', handle_button_press);

//gets the html form from the other page

var form = document.getElementById('new-salmon-cookies');
//is it best practice to match ip the variables on the left with the ones from my constructor function?

form.addEventListener('submit', function(formSubmit){
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
        salmonCookiesName : store_name,
        salmonCookiesLocation : store_location,
        salmonCookiesMinCust : min_cust,
        salmonCookiesMaxCust : max_cust,
        salmonCookiesOpen : store_open,
        salmonCookiesClose : store_close,
        salmonCookiesSoldHour : sold_each_hour,
        salmonCookiesPerCust : avg_cookie_order
    });
});



//not getting it to print to the console just yet. problem for when I'm fresher. Has logged one input so far, but
//hasn't logged others when I refreshed the live-server