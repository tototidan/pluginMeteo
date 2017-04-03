(function($)
{
    $.fn.meteo=function(position){
		
		var urlObj = {
			1 : "test",
			2 : "test2",
			
		};
        var createMainContent = function (mainDiv){
            var content = "<h3>Météo</h3>";
            content +="<h1> 22°C</h1>";
            content +="<select class='meteo-select'>";
            content +="<option value='bordeaux'>Bordeaux</option>";
			content +="<option value='paris'>Paris</option>";
			content +="<option value='geneve'>Geneve</option></select>";
			content += "<p class='meteo-tmp'></p>";
			content += "<img class='img-meteo'>"
            mainDiv.html(content);
			
			
        };

        var attributeMainCss = function (mainDiv){
            mainDiv.css({
                margin:'10px',
                width: '450px',
                height: '400px',
				marginLeft: position+'px',
                display: 'inline-block',
                border:'1px solid black',
                webkitBoxShadow: '5px 5px 20px 5px #080808',
                boxShadow: '5px 5px 20px 5px #080808',
                backgroundColor: '#7bb7fa'
            })
        };

        function getData (url , self) {
			
            $.ajax(url).then(function(datas){
                var currentCondition = datas.current_condition;
                var tmp = currentCondition.tmp;
                $(".meteo-tmp", self).text(tmp);
                var imgData = currentCondition.icon;
                $(".img-meteo", self).attr("src", imgData);
				
				return this;
            });
        }

        function addListeners (self) {
            $(self, ".meteo-select").change(function(){
                var url = $(".meteo-select", self).val();
				getData("http://www.prevision-meteo.ch/services/json/"+url , self);
            })
        }

        return this.each(function(){
            var self = $(this);
            attributeMainCss(self);
            createMainContent(self);
			
            addListeners(self);
            var url = $(".meteo-select", self).val();
			getData("http://www.prevision-meteo.ch/services/json/"+url , self);
			return this;
            
        });
    };
})(jQuery);