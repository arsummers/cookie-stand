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
    store_open: 6,
    store_close: 20,//8pm
    cookies_sold_each_hour: [],
    hour_list: []
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

/*Goal here is to put the store hours into an array the object can access, similar to the one for 
cookies_sold_each_hour. This function is supposed to take tack on 1 hour to each hour open to close,
and add them to an array, so the object can access it later, like it's done to get the list of cookies
needed per day as an actual list. Debugger doesn't like this one, no matter where I put it. Leaving up
so you can see train of thought.*/

pike_store.list_store_hours = function(){
    var hour_sum = 0;
    for(i = this.store_open; i < this.store_close; i++){
        hour_sum += hour_list[i];
    }
};

/* this is supposed to take the numbers generated above, and push them into the store_hours array I made,
so that the object can access it later on. Doesn't seem like this has worked, but it hasn't broken the code
either. Leaving up for future inspiration, or so I can know if I'm on the wrong track with this style*/
pike_store.store_hours_list = function () {
    for (var i = this.store_open; i < this.store_close; i++){
        var store_hours = this.list_store_hours();
        this.hour_list.push(store_hours);
    }
  
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
    h2_el.textContent = this.store_name;

    //starts for loop. Will keep going as long as i is short than the array length of cookies per hour
    //in this case, it will repeat for the hours the store is open, create a list item for each hour, and
    //add the data from cookies_sold_each_hour to that li as the child of a ul

    //loop to add cookie number data
    for (var i = 0; i < this.cookies_sold_each_hour.length; i++){
        var cookie_per_hour_li_el = document.createElement('li')
        cookie_per_hour_li_el.textContent = this.cookies_sold_each_hour[i];    
        ul_el.appendChild(cookie_per_hour_li_el);
    }

    /*loop to add hours open to visible list. Debugger shows j getting stuck at 0, but doesn't give me hints
    as to why. This is supposed to take the hour_list array that I tried to building above, and feed into
    this list containing cookie numbers. Can't get it printing, leaving up for review.*/
    for(var j = 0; j < this.hour_list.length; j++){
        var hour_list_li_el = document.createElement('li');
        hour_list_li_el.textContent = this.hour_list[j];
        ul_el.appendChild(hour_list_li_el);
    }
    //this takes the elements we created before the for loop in this function and
    //adds the html elements. Makes the list into a list
    li_el.appendChild(h2_el); 
    li_el.appendChild(ul_el);
    target.appendChild(li_el);
};


 pike_store.calculate_sum = function(){
    var sum = 0;
   
for (var i = 0; i < this.cookies_sold_each_hour.length; i++){
    //need it to loop through cookies_sold_each_hour array and add those together
    sum += this.cookies_sold_each_hour[i];
}
//logs cookie sum
console.log(sum);
}




//runs the calculation function
pike_store.calculate_cookies_sold_each_hour();

//logs the html element structure we now have running through javacript
console.log(document);
//creates sum for cookies
pike_store.calculate_sum();
//shows everything on the page
pike_store.render();

/*=========BEGINNING OF SEATAC STORE ==========*/
var seatac_store = {
    min_cust: 3,
    max_cust: 24,
    avg_cookies_per_cust: 1.2,
    store_name: 'Salmon Cookies - SeaTac Airport',
    store_open: 6,
    store_close: 20,
    cookies_sold_each_hour:[]
}

seatac_store.cookies_per_hour = function() {
    var random_customers = Math.floor(_random(this.min_cust, this.max_cust));
    return Math.floor(this.avg_cookies_per_cust * random_customers);
};

seatac_store.calculate_cookies_sold_each_hour = function () {
    for (var j = this.store_open; j < this.store_close; j++){
        var cookies_sold = this.cookies_per_hour();
        this.cookies_sold_each_hour.push(cookies_sold);
    }
    console.log(this);
};

seatac_store.render = function() {
    var target = document.getElementById('store-container');

    var li_el = document.createElement('li');
    var h2_el = document.createElement('h2');
    var ul_el = document.createElement('ul');

    h2_el.textContent = this.store_name;

    for (var j = 0; j < this.cookies_sold_each_hour.length; j++){
        var hour_li_el = document.createElement('li')
        hour_li_el.textContent = this.cookies_sold_each_hour[j];
        ul_el.appendChild(hour_li_el);
    } 
    li_el.appendChild(h2_el);
    li_el.appendChild(ul_el);
    target.appendChild(li_el);
};

seatac_store.calculate_sum = function(){
    var sum = 0;
   
for (var i = 0; i < this.cookies_sold_each_hour.length; i++){
    //need it to loop through cookies_sold_each_hour array and add those together
    sum += this.cookies_sold_each_hour[i];
}
//this console won't log for some reason, even though the same one for pike_store will. Addition function
//should still be working
console.log(sum);
}

seatac_store.calculate_cookies_sold_each_hour();
console.log(document);
seatac_store.render();