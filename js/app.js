'use strict';

//Helper functions
var _random = function(min, max){
    return Math.floor(Math.random()*(max - min) + min);
}

//========================================
//Starts constructor function. Acts similar to an object, in that I can call elements from it below, and feed
//them to my specific objects. 
var Salmon_cookies = function (store_name, location, min_cust, max_cust, store_open, store_close, avg_cookies_per_cust, store_hours_list){
    this.store_name = store_name;
    this.store_type = 'Salmon Cookies';
    this.location = location;
    this.min_cust = min_cust;
    this.max_cust = max_cust;
    this.open_hour = store_open;
    this.close_hour =store_close;
    this.cookies_sold_each_hour = [];
    this.avg_cookies_per_cust = avg_cookies_per_cust || 6.3;
};


//got this printing, now I just need to make it into a table. Copy and pasted below in case it goes to shit
var salmon_cookies_hours = {
    store_hour_name: 'Store Hours: ',
    full_list: ['6', '7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8'],
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
    var daily_total_td = document.createElement('td');
    
    //creates "Store Name" text
    store_hour_name_row.textContent = this.store_hour_name;
    //creates text for store hours
    hour_list_td.textContent = this.full_list;
    //creates "Daily Location Total" text
    daily_total_td.textContent = this.daily_total;

    //SHOULD add text for daily total to end of the list of store hours - live server not working
    hour_list_td.appendChild(daily_total_td);

    //adds the list of hours next to "Store Name" text
    store_hour_name_row.appendChild(hour_list_td);

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
    for (var i = 0; i < 10; i++){
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

   // for(var j = 0; j < all_stores.length; j++){
        //debugger;
    //getting elements
     this.calculate_cookies_sold_each_hour();
     var target = document.getElementById('store-table');
     //creates <tr></tr>
     var store_row = document.createElement('tr');
     //creates <td></td>
     var name_td = document.createElement('td');
     //puts text into the tags
     //bug lives here, only prints numbers and calculations from pike store, adds ten more to each 
     //store that comes after
     name_td.textContent = this.store_name;

     //adds <td> to <tr>
     store_row.appendChild(name_td);

     //formatting is now weird on the pike place one_store_as_table

     var cookie_hour_td = document.createElement('td');
     cookie_hour_td.textContent = this.cookies_sold_each_hour;
     store_row.appendChild(cookie_hour_td); 


//need this to add the stuff from the array it's iterating over somewhere
//need some type of name[j]++ thing to happen
    //}
   target.appendChild(store_row);
}

//store_hours_list.render_hour_list();

for(var k = 0; k < all_stores.length; k++){
    all_stores[k].render_all_stores();
}


//need toadd the sum function in a way that will print


/*prototype adds render function to constructor and new objects. Attaches methods to an object class.
Now lives under the protoype Salmon_cookies. Think of prototype like a cloud attached to Salmon_cookies.

copy of list containing hours that is capable of printing:
var salmon_cookies_hours = {
    full_list: ['Store Hours', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', 'Daily location total']
}

salmon_cookies_hours.render = function (){
    var target = document.getElementById('store-table');
    //create table elements
    var li_el = document.createElement('li');
    var h2_el = document.createElement('h2');
    var ul_el = document.createElement('ul');

    h2_el.textContent = this.full_list;

    for (var i = 0; i < this.full_list.length; i++){
        var hour_li_el = document.createElement('li');
        //not recognized as a function, breaks loop
        //hour_li_el.textContent(this.full_list[i]);
        ul_el.appendChild(hour_li_el);
    }
    li_el.appendChild(h2_el);
    li_el.appendChild(ul_el);
    target.appendChild(li_el);
}

salmon_cookies_hours.render();

*/

