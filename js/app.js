'use strict';

//Helper functions
var _random = function(min, max){
    return Math.floor(Math.random()*(max - min) + min);
}

//========================================
//Starts constructor function. Acts similar to an object, in that I can call elements from it below, and feed
//them to my specific objects. 
var Salmon_cookies = function (store_name, location, min_cust, max_cust, store_open, store_close, avg_cookies_per_cust){
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


//makes a function to print an indivual store
/*Salmon_cookies.prototype.render_one_stores_as_table = function (){

    //what if I stick all this in a for loop?
//takes the number generated from my cookies sold per hour function and stores them in the HTML store-table section
    this.calculate_cookies_sold_each_hour();
    var target = document.getElementById('store-table'); 

//makes a table row element
    var store_row = document.createElement('tr');

//adds the info from name to the page and tacks it onto the store_row section of the table
    var name_td = document.createElement('td');
    name_td.textContent = this.store_name;
    store_row.appendChild(name_td);

//will iterate over the array that was made earlier for cookies sold each hour, create a table data
//element for each one, and add it to the store_row element
    for (var i = 0; i < this.cookies_sold_each_hour.length; i++){
    var cookie_hour_td = document.createElement('td');
    cookie_hour_td.textContent = this.cookies_sold_each_hour[i];
    store_row.appendChild(cookie_hour_td);
    }
    target.appendChild(store_row);
}

*/
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

    for(var j = 0; j < all_stores.length; j++){
    //getting elements
     all_stores[j].calculate_cookies_sold_each_hour();
     var target = document.getElementById('store-table');
     //creates <tr></tr>
     var store_row = document.createElement('tr');
     //creates <td></td>
     var name_td = document.createElement('td');
     //puts text into the tags
     name_td.textContent = this.store_name;
     //adds <td> to <tr>
     store_row.appendChild(name_td);

     //formatting is now weird on the pike place one_store_as_table

     var cookie_hour_td = document.createElement('td');
     cookie_hour_td.textContent = all_stores[j].cookies_sold_each_hour;
     store_row.appendChild(cookie_hour_td); 


//need this to add the stuff from the array it's iterating over somewhere
//need some type of name[j]++ thing to happen
    }
   target.appendChild(store_row);
}


for(var k = 0; k < all_stores.length; k++){
    all_stores[k].render_all_stores();
}

//this will only show one store because it's only set to render one as a table. This prints
//pike_store.render_one_stores_as_table();

//when I call this it messes with the formatting on my pike place store





//need to figure out how to render all of these at once

/*prototype adds render function to constructor and new objects. Attaches methods to an object class.
Now lives under the protoype Salmon_cookies. Think of prototype like a cloud attached to Salmon_cookies.

Once a new Salmon_cookie exists, there's a copy of that render method in that Salmon_cookie
Salmon_cookies.prototype.render = function (){
    this.calculate_cookies_sold_each_hour();
    var target = document.getElementById('store-table');
    var tr_el = document.createElement('tr');
    var td_el = document.createElement('td');

    td_el.textContent = this.store_name;
    tr_el.appendChild(td_el);

   
    If I add another  tr_el = document.createElement('tr'); here, it hides the this.store_name element. Why?
    I would like to be able to add more space between the td elements. I still need to figure out how to add hours
    and how to use the total cookies functions I created earlier to give me the total number of cookies, though
    I have some idea, involviong the variables listed inside the constructor function
    td_el = document.createElement('td');
    td_el.textContent = this.location;
    tr_el.appendChild(td_el);

    td_el = document.createElement('td');
    td_el.textContent = this.min_cust;
    tr_el.appendChild(td_el);

    td_el = document.createElement('td');
    td_el.textContent = this.max_cust;
    tr_el.appendChild(td_el);

    td_el = document.createElement('td');
    td_el.textContent = this.open_hour;
    tr_el.appendChild(td_el);

    td_el = document.createElement('td');
    td_el.textContent = this.close_hour;
    tr_el.appendChild(td_el);

    for(var i = 0; i < this.cookies_sold_each_hour.length; i++){
        td_el = document.createElement('td');
        td_el.textContent = this.cookies_sold_each_hour[i];
        tr_el.appendChild(td_el);
    }

    target.appendChild(tr_el);
}
*/
