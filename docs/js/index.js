"use strict";var currentYear=(new Date).getFullYear(),lastFind={title:"",year:"",page:"1"},arrayErrors=[];document.addEventListener("DOMContentLoaded",(function(){var e=sessionActive();e?(showUserInfo(e),showInitialMovies()):location.href="login.html"}));var sessionActive=function(){var e=location,t=sessionStorage.getItem("sessionActive")||0;return("/"===e.pathname||"/index.html"===e.pathname)&&0!==t&&t},showUserInfo=function(e){var t=JSON.parse(localStorage.getItem("user-"+e));t.userFav.length>0?(document.getElementById("fav-title").innerHTML="Las películas favoritas de ".concat(e),showFavSection(!0),showMoviesFav(t.userFav)):showFavSection(!1)},showInitialMovies=function(){if(JSON.parse(null!==sessionStorage.getItem("lastFindDo"))&&(lastFind=JSON.parse(sessionStorage.getItem("lastFindDo"))),""===lastFind.title){var e=["superman","batman","star","harry","speed","hard","avengers","rocky","lego"],t=Math.floor(Math.random()*e.length);lastFind.title=e[t],sessionStorage.setItem("lastFindDo",JSON.stringify(lastFind))}processMovies(lastFind.title,lastFind.year,lastFind.page)},logout=document.getElementById("logout");logout.addEventListener("click",(function(e){e.preventDefault(),sessionStorage.removeItem("sessionActive"),sessionStorage.removeItem("lastFindDo"),location.href="login.html"}));var current,result,searchForm=document.getElementById("search-form"),searchTitle=document.getElementById("search-title"),searchYear=document.getElementById("search-year"),msgError=document.getElementById("msg-error");searchForm.addEventListener("submit",(function(e){e.preventDefault(),arrayErrors=[],msgError.innerHTML="",msgError.className="msg-error",checkInputsSearch(),0===arrayErrors.length?(lastFind.title=searchTitle.value.trim(),lastFind.year=searchYear.value.trim(),lastFind.page="1",sessionStorage.setItem("lastFindDo",JSON.stringify(lastFind)),processMovies(lastFind.title,lastFind.year,lastFind.page)):(msgError.classList.add("msg-error--show"),arrayErrors.forEach((function(e){msgError.innerHTML+="<p>".concat(e,"</p>")})))}));var amountMovies=document.getElementById("amount-movies"),currentPages=document.getElementById("current-page"),prev=document.getElementById("prev"),next=document.getElementById("next"),processMovies=function(e,t,n){current=n;var a="?s=".concat(e,"&type=movie&y=").concat(t,"&page=").concat(n),s="http://www.omdbapi.com/".concat(a,"&apikey=c52b4a65");findMovies(s).then((function(e){0===(result=e)?(msgError.classList.add("msg-error--show"),msgError.innerHTML="<p> No hay registros para el criterio de busqueda indicado</p>"):(amountMovies.innerHTML="hay ".concat(result," movie "),currentPages.innerHTML=" Estas en la paginas ".concat(n," "))}))},findMovies=function(e){return new Promise((function(t,n){fetch(e).then((function(e){return e.json()})).then((function(e){"True"===e.Response?(showMovies(e.Search),t(e.totalResults)):t(0)}))}))},findMovieId=function(e){var t="http://www.omdbapi.com/?i=".concat(e,"&apikey=c52b4a65");fetch(t).then((function(e){return e.json()})).then((function(e){document.getElementById("modal-fav").innerHTML="\n               <h3> ".concat(e.Title," se agregó a la lista de favoritos</h3>")})).catch((function(e){return console.log("se produjo un error ",e)}))},showMovies=function(e){var t=document.getElementById("movies"),n="/assets/img/no-image-available.png";t.innerHTML="",e.forEach((function(e){n="N/A"!==e.Poster?e.Poster:"/assets/img/no-image-available.png",t.innerHTML+='\n         <div class="movies-card">\n            <img src="'.concat(n,'" alt="" class="movie-img">\n            <div class="movie-info">\n               <div class="action-btn">\n                  <a onclick="movieSelected(\'').concat(e.imdbID,'\')" class=" btn btn-detail" href="movie.html">Ver Detalle</a>\n                  <p onclick="addFav(\'').concat(e.imdbID,'\')" class=" btn btn-fav">Add <i class="far fa-heart"></i></p>\n               </div>\n            </div>\n         </div>')}))},showMoviesFav=function(e){var t=document.getElementById("fav-movies"),n="/assets/img/no-image-available.png";t.innerHTML="",e.forEach((function(e){var a="http://www.omdbapi.com/?i=".concat(e,"&apikey=c52b4a65");fetch(a).then((function(e){return e.json()})).then((function(e){n="N/A"!==e.Poster?e.Poster:"/assets/img/no-image-available.png",t.innerHTML+='\n               <div class="movies-card">\n                  <img src="'.concat(n,'" alt="" class="movie-img">\n                   <div class="movie-info">\n                     <div class="action-btn">\n                        <a onclick="movieSelected(\'').concat(e.imdbID,'\')" class=" btn btn-detail" href="movie.html">Ver Detalle</a>\n                     </div>\n                  </div>\n               </div>')})).catch((function(e){return console.log("se produjo un error ",e)}))}))},movieSelected=function(e){sessionStorage.setItem("movieId",e)},addFav=function(e){var t=sessionActive(),n=JSON.parse(localStorage.getItem("user-"+t));n.userFav.push(e),localStorage.setItem("user-".concat(n.username),JSON.stringify(n)),document.getElementById("fav-title").innerHTML="Las películas favoritas de ".concat(n.username),showMoviesFav(n.userFav),findMovieId(e);var a=document.getElementById("modal-fav");a.classList.add("modal-fav--show"),a.addEventListener("click",(function(e){e.target.classList.contains("modal-fav")&&(a.classList.remove("modal-fav--show"),showFavSection(!0))}))},showFavSection=function(e){var t=document.getElementById("favorite");e?t.classList.add("fav-show"):t.classList.remove("fav-show")},checkInputsSearch=function(){var e=searchTitle.value.trim(),t=searchYear.value.trim();null!==e&&0!==e.length||arrayErrors.push("Debe de indicar el Titulo de la pelicula"),t.length>0&&(isNaN(t)||!/^\d{4}$/.test(t)?arrayErrors.push("el año debe ser numero entero > 999"):t>currentYear&&arrayErrors.push("el año debe ser menor o igual a ".concat(currentYear)))},toggleMenu=document.getElementById("toggle-menu"),mainNav=document.getElementById("main-nav");toggleMenu.addEventListener("click",(function(){mainNav.classList.toggle("main-nav--show"),toggleMenu.classList.toggle("toggle-menu--open")})),prev.addEventListener("click",(function(){lastFind=JSON.parse(sessionStorage.getItem("lastFindDo")),current=lastFind.page,--current>0&&(lastFind.page=current,sessionStorage.setItem("lastFindDo",JSON.stringify(lastFind)),processMovies(lastFind.title,lastFind.year,lastFind.page))})),next.addEventListener("click",(function(e){lastFind=JSON.parse(sessionStorage.getItem("lastFindDo")),10*(current=lastFind.page)<result&&(current++,lastFind.page=current,sessionStorage.setItem("lastFindDo",JSON.stringify(lastFind)),processMovies(lastFind.title,lastFind.year,lastFind.page))}));