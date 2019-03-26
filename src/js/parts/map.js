/* Yandex map */

(function (){

    ymaps.ready(init);

    let myMap,
        myPlacemark;

    function init(){    
        
        myMap = new ymaps.Map("yandex-map", {
            center: [55.753595, 37.621031],
            zoom: 16
        });

        myMap.behaviors.disable("scrollZoom");
        myMap.behaviors.disable('drag');
        myMap.events.add("click", function(){
        myMap.behaviors.enable("scrollZoom")
        myMap.behaviors.enable('drag')
        })
        
        myPlacemark = new ymaps.Placemark([55.753595, 37.621031], {}, 
                                          
        {         
        iconLayout: "default#image",
        iconImageSize: [20, 20]           
        });
        
        myMap.geoObjects.add(myPlacemark);    
    }

})();