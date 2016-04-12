//The basis of SVG map, size can be changed
var xMap = 550;
var yMap = 650;
//Canvas for Card Bar and Pie Chart
var width = 400; 
var height = 264;
var canvasBar = new Raphael(document.getElementById('canvasBar_container'),width+90, height+60);
var canvasPie = new Raphael(document.getElementById('canvasPie_container'), width+90, height+60);
var canvasMap = new Raphael(document.getElementById('canvasMap_container'), xMap, yMap);
//The attribute for the all the element
var x = 0;
var y = 0;
window.cardList = new Array();
window.cardRpList = new Array();
//makeMap (xMap,yMap, canvasBar, canvasPie, x, y, width, height);   
canvasMap.makeMap(xMap,yMap, x, y, width, height);
//document.write(canvasMap.height);
var startwidth = canvasMap.width/0.75;
var startheight = canvasMap.height/0.75;
var viewBoxWidth = startwidth;
var viewBoxHeight = startheight;
var canvasID = "#canvasMap_container";
var startX,startY;
var mousedown = false;
var dX=0,dY=0;
var oX = 65, oY = -50, oWidth = viewBoxWidth, oHeight = viewBoxHeight;
var viewBox = canvasMap.setViewBox(oX, oY, viewBoxWidth, viewBoxHeight);
viewBox.X = oX;
viewBox.Y = oY;
var vB = canvasMap.rect(viewBox.X,viewBox.Y,viewBoxWidth,viewBoxHeight)
    .attr({stroke: "#009", "stroke-width": 0});;

$("#home").click(function(){
    viewBoxWidth = canvasMap.width/0.75;
    viewBoxHeight = canvasMap.height/0.75;
    mousedown = false;
    oX = 65;
    oY = -50;
    oWidth = viewBoxWidth;
    oHeight = viewBoxHeight;
    viewBox = canvasMap.setViewBox(oX, oY, viewBoxWidth, viewBoxHeight);
    viewBox.X = 0;
    viewBox.Y = 0;
    }
);

$("#left").click(function(){
    viewBox.X -= 20*(viewBoxWidth/canvasMap.width);
    canvasMap.setViewBox(viewBox.X, viewBox.Y, viewBoxWidth, viewBoxHeight);
});

$("#right").click(function(){
    viewBox.X += 20*(viewBoxWidth/canvasMap.width);
    canvasMap.setViewBox(viewBox.X, viewBox.Y, viewBoxWidth, viewBoxHeight);
});

$("#up").click(function(){
    viewBox.Y -= 20*(viewBoxHeight/canvasMap.height);
    canvasMap.setViewBox(viewBox.X, viewBox.Y, viewBoxWidth, viewBoxHeight);
});

$("#down").click(function(){
    viewBox.Y += 20*(viewBoxHeight/canvasMap.height);
    canvasMap.setViewBox(viewBox.X, viewBox.Y, viewBoxWidth, viewBoxHeight);
});

$("#zoomin").click(function(){
    for (var a=0; a<3;a++) {
        handle(1);
    }
});

$("#zoomout").click(function(){
    for (var a=0; a<3;a++) {
        handle(0);
    }
});


    /** This is high-level function.
     * It must react to delta being more/less than zero.
     */
    function handle(delta) {
        vBHo = viewBoxHeight;
        vBWo = viewBoxWidth;
        if (delta > 0) {
        viewBoxWidth *= 0.95;
        viewBoxHeight*= 0.95;
        }
        else {
        viewBoxWidth *= 1.05;
        viewBoxHeight *= 1.05;
        }
/*
        vB.attr({
          x: viewBox.X,
          y: viewBox.Y,
          width: viewBoxWidth,
          height: viewBoxHeight
        });
 */
                        
  viewBox.X -= (viewBoxWidth - vBWo) / 2;
  viewBox.Y -= (viewBoxHeight - vBHo) / 2;          
  canvasMap.setViewBox(viewBox.X,viewBox.Y,viewBoxWidth,viewBoxHeight);
    }

    /** Event handler for mouse wheel event.
     */
   
    function wheel(event) {

        if (event.detail) { //Mozilla
            $(canvasID).bind('DOMMouseScroll', function(e){
            handle(-e.originalEvent.detail);
            return false;
            });
        }if (event.wheelDelta) { //IE/Opera/Chrome   
            $(canvasID).bind('mousewheel', function(e){
            handle(e.originalEvent.wheelDelta);
            return false;
            });
    
    
        }   
    }

    /** Initialization code. 
     * If you use your own event management code, change it as required.
     */
    if (window.addEventListener){
        window.addEventListener('DOMMouseScroll',wheel,false);
        window.addEventListener('mousewheel',wheel,false);

    }
     else {
         window.onmousewheel = document.onmousewheel=wheel; 
    }
    
    
   

    /** Initialization code. 
     * If you use your own event management code, change it as required.
     */

//Pane
        $(canvasID).mousedown(function(e){
            e.preventDefault();
            //if (canvasMap.getElementByPoint( e.pageX, e.pageY ) != null) {return;}
            mousedown = true;
            startX = e.pageX; 
            startY = e.pageY;    
        });

        $(canvasID).mousemove(function(e){
            if (mousedown == false) {return;}
            //e.preventDefault();
            dX = startX - e.pageX;
            dY = startY - e.pageY;
            x = viewBoxWidth / startwidth; 
            y = viewBoxHeight / startheight; 

            dX *= x; 
            dY *= y; 
            //alert(viewBoxWidth +" "+ canvasMap.width );
            
            canvasMap.setViewBox(viewBox.X + dX, viewBox.Y + dY, viewBoxWidth, viewBoxHeight);

        })
            
        $(canvasID).mouseup(function(e){
            if ( mousedown == false ) {return;}
            //e.preventDefault();
            viewBox.X += dX; 
            viewBox.Y += dY; 
            mousedown = false; 
            
        });