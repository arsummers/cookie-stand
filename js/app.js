'use strict';

//help functions

var _random = function(min, max){
    return Math.floor(Math.random()*(max - min) + min);
}

//==================================
/*
List of
    List of hours open
    List of cookies sold -- per store

Store objects {

    min_cust
    max_cust
    avg_cookies_per_hour - individual hour
    store_name
    store_open: 8 am
    store_close: 7 pm

    cookies_sold_each_hour[all, cookies, sold]
    calculate_cookies_per_hours (method)
    calculate_cookies_all_hours (method)
    render

}
*/
//first object literal - Pike Place
//this is the object everything we will be pulling from. "this.min_cust", when accessed from functions made
//with the pike_store name will make it pull from the object. The functions below will pull from object names
//inside here.
var pike_store = {
    min_cust: 23,
    max_cust: 65,
    avg_cookies_per_cust: 6.3,
    store_name: 'Salmon Cookies - Pike Place',
    store_open: 8,
    store_close: 19,
    cookies_sold_each_hour: []
}


//"this" refers back to parent element, pike_store in this case
//calculates cookies sold per hour using Math.random function, which is stored above in my helper functions.
//This function calculates the cookies sold per hour. Takes pike_store, gives it the method cookies_per_hour.
//random_customers generates a random number of customers using min/max from pike_store object, and with
//Math.floor, essentially rounds up to the nearest integer from number it generates.
//it returns the product of avg_cookies_per_cust and random_customers, which was generated directly above. 
pike_store.cookies_per_hour = function() {
    var random_customers = Math.floor(_random(this.min_cust, this.max_cust));
    return Math.floor(this.avg_cookies_per_cust * random_customers);
};

//this uses elements from pike_store.cookies_per_hour function. The for loop tells the program how many hours
//it needs to calculate for before terminating. cookies_sold takes in the number that cookies_per_hour generated
pike_store.calculate_cookies_sold_each_hour = function () {
    for (var i = this.store_open; i < this.store_close; i++){
        var cookies_sold = this.cookies_per_hour();
        //takes the number generated above in cookies_sold and adds it to the cookies_sold_each_hour array in the object
        this.cookies_sold_each_hour.push(cookies_sold);
    }
    console.log(this);
};

//creates HTML elements and puts them on the page so we can manipulate them
pike_store.render = function() {
    //li > h2 (name)> ul (store hours) > li (9 am; 30 cookies);
    //accesses the 'store-container' id inside index.html
    var target = document.getElementById('store-container');

    //creates elements for list item, an h2, and an unordered list
    var li_el = document.createElement('li');
    var h2_el = document.createElement('h2');
    var ul_el = document.createElement('ul');

    //puts the store name into the h2 element
    h2_el.textContent= this.store_name;

    //starts for loop. Will keep going as long as i is short than the array length of cookies per hour
    //in this case, it will repeat for the hours the store is open, create a list item for each hour, and
    //add the data from cookies_sold_each_hour to that li as the child of a ul
    for (var i = 0; i < this.cookies_sold_each_hour.length; i++){
        var hour_li_el = document.createElement('li')
        hour_li_el.textContent = this.cookies_sold_each_hour[i];    
        ul_el.appendChild(hour_li_el);
    }
    //this takes the elements we created before the for loop in this function and adds the html elements
    //we need to make the list function as a nice list
    li_el.appendChild(h2_el); 
    li_el.appendChild(ul_el);
    target.appendChild(li_el);

};
//runs the calculation function
pike_store.calculate_cookies_sold_each_hour();

//logs the html element structure we now have running through javacript
console.log(document);

//shows everything on the page
pike_store.render();

