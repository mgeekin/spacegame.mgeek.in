const loadSkelton =()=> {
  append(app, gen(header, "header", "", "header"), "o");
  append(header, gen(nav, "nav", gen(ul,"navlist","", "nav")));
  append(header,gen(h1,"GameName","Space Game"),'b')
  append(app, gen(main, "main", gen(section,"hero","","section"), "main"));
  append(app, gen(footer, "footer", "", "footer"));


}

loadSkelton()

load(["./md.scss"]);


addEventListener("keydown",(e)=>{
  if("w,a,s,d,up,down,left,right".split(",").includes(e.key)){
    grab("#GameName")[0].classList.add("blur")
  }
})


addEventListener("keyup",(e)=>{
    grab("#GameName")[0].classList.remove("blur")
})


$$.init();


















//move to generatorWebHelper
function checkClick(e){
  // console.log("click")



var SpaceGame=grab("#spacegame")[0]
var box=SpaceGame.getBoundingClientRect()

var sg={
      xrange:[box.left,box.right],
      yrange:[box.top,box.bottom]
     }


var click={
            X:event.clientX,
            Y:event.clientY
          }
// console.log([sg.xrange[0],click.X,sg.xrange[1]])
// console.log([sg.yrange[0],click.Y,sg.yrange[1]])



if (click.X>=sg.xrange[0] & click.X<=sg.xrange[1]){
  
    // console.log("insideX")
  if(click.Y>=sg.yrange[0] & click.Y<=sg.yrange[1]){
    // console.log("insideY")
    
    
    xCase=(Math.ceil(((click.X-sg.xrange[0])*3)/(sg.xrange[1]-sg.xrange[0])))
    yCase=(Math.ceil(((click.Y-sg.yrange[0])*3)/(sg.yrange[1]-sg.yrange[0])))
    
    gameMotion=[xCase,yCase]
    console.log(gameMotion)//use this to move according
    
  }
}

} 

var SpaceGame=grab("#spacegame")[0]
SpaceGame.addEventListener("mousedown",checkClick)