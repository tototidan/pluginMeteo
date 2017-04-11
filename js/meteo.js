(function($)
{
    $.fn.meteo=function( options){

        var options = $.extend( {
            draggable: false,
            position: 0,
            height : 400,
            width:450,
            top : 50,
            left : 50
        }, options);

        var createMainContent = function (mainDiv){
            var content = "<style> .hour , .affiche {text-align: center;} .meteo-select , .conversion {text-align: center; margin-left: 15%;}";
            content += " .meteo-tmp {display:inline-block; text-align:center; margin-left:45%;} .img-meteo { margin-left:43%;}</style>"
            content += "<h3 class='affiche'>Météo</h3>";
            content +="<h1 class='hour'> </h1>";
            content +="<select class='meteo-select'>";
            content +="<option value='bordeaux'>Bordeaux</option>";
			content +="<option value='paris'>Paris</option>";
			content +="<option value='geneve'>Geneve</option></select>";
            content +="<select class='conversion'>";
            content +="<option selected value='C'>Celsius</option>";
            content +="<option value='F'>Fahrenheit</option></select><br>";
			content += "<p class='meteo-tmp'></p><br>";
			content += "<img class='img-meteo'>";




            mainDiv.html(content);
			
			
        };

        var attributeMainCss = function (mainDiv){
            mainDiv.css({
                margin:'10px',
                width: options['width']+'px',
                height: options['height']+'px',
                position: 'absolute',
                top : options['top']+'px',
                left : options['left']+'px',
                display: 'inline-block',
                border:'1px solid black',
                webkitBoxShadow: '5px 5px 20px 5px #080808',
                boxShadow: '5px 5px 20px 5px #080808',

            });


        };

        function getData (url , self ) {
			
            $.ajax(url).then(function(datas){
                var currentCondition = datas.current_condition;
                var tmp = currentCondition.tmp;
                $(".meteo-tmp", self).text(tmp +"°"+$(".conversion" ,self).val());
                var imgData = currentCondition.icon;
                $(".img-meteo", self).attr("src", imgData);
                $(".hour" , self).text(new Date().toLocaleTimeString());

				return this;
            });
        }

        function handleOptions(self) {

            if(options['draggable'] == true)
            {
                self.draggable();
            }
            if(options['height'] < 250)
            {
                options['height'] = 250;
            }
            if(options['width'] < 250)
            {
                options['width'] = 250;
            }

            
        }

        function addListeners (self) {
            $(".meteo-select",self).change(function(){
                var url = $(".meteo-select", self).val();
                getData("http://www.prevision-meteo.ch/services/json/"+url , self );

            });

            $(".conversion", self).change(function () {

                if($('.conversion',self).val() == "C") // converti celsius en fahrenheit
                {

                        var tmp = parseFloat($(".meteo-tmp", self).text());

                         tmp = (tmp - 32) / 1.8;

                        $(".meteo-tmp", self).text(Math.round(tmp)+"°"+$(".conversion" ,self).val());

                }

                if($('.conversion',self).val() == "F")  // le contraire !!
                {

                        var tmp = parseFloat($(".meteo-tmp", self).text());
                        tmp = (tmp * 1.8) + 32;
                        $(".meteo-tmp", self).text(Math.round(tmp)+"°"+$(".conversion" ,self).val());

                }

            });
        }

        return this.each(function(){
            var self = $(this);
            handleOptions(self);
            attributeMainCss(self);
            createMainContent(self);
            addListeners(self);
            var url = $(".meteo-select", self).val();
            getData("http://www.prevision-meteo.ch/services/json/"+url , self);
			return this;
            
        });
    };
})(jQuery);