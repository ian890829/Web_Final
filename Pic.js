var url="https://api.unsplash.com/search/photos/?"
var query="Taiwan";
var prequery="Taiwan";
var per_page=17;
var count=5;
$(function(){
    searchpic(1);
    $(document).keydown(function(event){
        if(event.keyCode===13)
        {
            
            $("#searchButton").click();
        }
    }) 
    $("#searchButton").on("click",function(){
        var temp=document.getElementById("search");
        query=temp.value
        temp.value="";
        searchpic(1);
     });
})
function searchpic(page){
    //document.body.scrollTop=document.documentElement.scrollTop =0;
    $.getJSON(`${url}per_page=${per_page}&page=${page}&query=${query}&count=${count}&client_id=${accessKey}`)
    .done(function(data){
        if(data.total<20)
        {
            alert("No result!");
            query=prequery;
            return;
        }
        prequery=query;
        $(".page-icon").empty();
            if(page!=0)
        $(".page-icon").append(
            `<li><a class="page-link" href="javascript:searchpic(${page-1});">prev<</a></li>`);
            if(page!=data.total_pages)
        $(".page-icon").append(
            `<li><a class="page-link" href="javascript:searchpic(${page+1});">next></a></li>`);
        $(".page-icon").append(`
            <li> page:${page} </li>
            <li> total page:${data.total_pages} </li>`);

        $(".image img").each(function(index){
            var newHref=data.results[index].urls.regular;
            $(this).attr("src", newHref);
        })
        $(".items article h2").each(function(index){
            $(this).text(data.results[index].description);
        })
        $(".items article a").each(function(index){
            var newHref=data.results[index].links.html;
            $(this).attr("href", newHref);
            $(this).attr("target", "_blank");
        })
        $(".item.intro.span-2 h1").text(query);

    })
    .fail(function(){console.log("fail")})
    .always(function(){console.log("always")})
}