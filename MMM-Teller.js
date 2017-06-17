
   /* Magic Mirror
    * Module: MMM-Teller
    *
    * By Cowboysdude
    * MIT Licensed.
    */
   
   Module.register("MMM-Teller",{
   
      // Module config defaults.
      defaults: {
          updateInterval: 60*1000, // every 10 minutes
          animationSpeed: 0,
          initialLoadDelay: 5, // 0 seconds delay
          retryDelay: 2500
      },
    
      // Define required scripts.
      getScripts: function() {
          return ["moment.js"];
      },
      getStyles: function() {
           return ["MMM-Teller.css"];
       },
  
      // Define start sequence.
      start: function() {
          Log.info("Starting module: " + this.name);
  
          // Set locale.
          this.today = "";
          this.scheduleUpdate();
      },
      
      getDom: function() {
      	
           var humordiv = document.createElement("div");
           humordiv.classList.add("light", "small");
           humordiv.style.maxWidth = this.config.maxWidth;
           
          
          var wrapper = document.createElement("div");
          wrapper.classList.add("dimmed", "light", "small");
          var header = document.createElement("header");
          header.innerHTML = "Random Stuff";
          wrapper.appendChild(header);
          
         
         var teller = this.teller;

         var title = document.createElement("h3");
         title.classList.add("small", "bright", "p");
         title.innerHTML = teller;
         humordiv.appendChild(title);
         
         
          wrapper.appendChild(humordiv);
          return wrapper;
          }, 
  
       processTeller: function(data) {
       	 this.today = data.Today;
         this.teller = data;
console.log(this.teller);
         this.loaded = true;
     },
      
     
     scheduleUpdate: function() {
         setInterval(() => {
             this.getTeller();
         }, this.config.updateInterval);
         
         this.getTeller(this.config.initialLoadDelay);
     },

     getTeller: function() {
         this.sendSocketNotification('GET_TELLER');
     },

     socketNotificationReceived: function(notification, payload) {
         if (notification === "TELLER_RESULT") {
             this.processTeller(payload);
             this.updateDom(this.config.animationSpeed);
         }
     },

 });