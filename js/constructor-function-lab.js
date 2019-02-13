'use strict';
//for some reason the css and the stuff from app.js didn't push into my third branch. working here for now.
//This is still super messy. Had some troubles with git while I was working on this, this why it's here instead
//of in a sensible branch.

var Salmon_cookies = function (store_name, location, min_cust, max_cust, store_open, store_close, cookie_order_size){
    this.store_name = store_name;
    this.location = location;
    this.min_cust = min_cust;
    this.max_cust = max_cust;
    this.open_hour = store_open;
    this.close_hour =store_close;
    this.cookie_order_size = cookie_order_size;
};

Salmon_cookies.prototype.render = function (){
    var target = document.getElementById('store-container');
    var tr_el = document.createElement('tr');
    var td_el = document.createElement('td');

    td_el.textContent = this.store_name;
    tr_el.appendChild(td_el);

    /*
    If I add another  tr_el = document.createElement('tr'); here, it hides the this.store_name element. Why?
    I would like to be able to add more space between the td elements. I still need to figure out how to add hours
    and how to use the total cookies functions I created earlier to give me the total number of cookies, though
    I have some idea, involviong the variables listed inside the constructor function*/
    td_el = document.createElement('td');
    td_el.textContent = this.location;
    tr_el.appendChild(td_el);

    td_el = document.createElement('td');
    td_el.textContent = this. min_cust;
    tr_el.appendChild(td_el);

    td_el = document.createElement('td');
    td_el.textContent = this. max_cust;
    tr_el.appendChild(td_el);

    td_el = document.createElement('td');
    td_el.textContent = this. store_open;
    tr_el.appendChild(td_el);

    td_el = document.createElement('td');
    td_el.textContent = this. store_close;
    tr_el.appendChild(td_el);

    target.appendChild(tr_el);
}

//instantiating area
var pike_store = new Salmon_cookies('Salmon Cookies - Pike Place', 'Pike Place Market', 23, 65, '6AM', '8PM', 6.3);
var seatac_store = new Salmon_cookies('Salmon Cookies - Seatac Airport', 'Seatac Airport', 3, 24, '6AM', '8PM', 1.2);
var seattle_center_store = new Salmon_cookies('Salmon Cookies - Seattle Center', 'Seattle, Center', 11, 38, '6 AM', '8AM', 3.7);
var cap_hill_store = new Salmon_cookies('Salmon Cookies - Capitol Hill', 'Capitol Hill', 20, 38, '6AM', '8AM', 2.3);
var alki_store = new Salmon_cookies('Salmon Cookies - Alki', 'Alki Beach', 2, 16, '6AM', '8PM', 4.6);
//make em go
pike_store.render();
seatac_store.render();
seattle_center_store.render();
cap_hill_store.render();
alki_store.render();



