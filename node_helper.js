
  /* Magic Mirror
   * Module: MMM-Teller
   *
   * By Cowboysdude
   * MIT Licensed.
   */
  var NodeHelper = require('node_helper');
  var fortune = require('fortune');
  
 
 module.exports = NodeHelper.create({

start: function() {
    	console.log("Getting module: " + this.name);
    },
    
     getTeller: function () {
     	var self = this;
         var result = fortune.fortune();
                 self.sendSocketNotification('TELLER_RESULT', result);
                 console.log(result);           
     },
 
     socketNotificationReceived: function(notification, payload) {
         if (notification === 'GET_TELLER') {
             this.getTeller(payload);
             
         }
     }
 });
 
