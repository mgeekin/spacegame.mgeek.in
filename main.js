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


// $$.init();


load("./spacegame.js")
