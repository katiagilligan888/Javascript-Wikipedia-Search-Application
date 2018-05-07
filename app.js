
const searchBox = document.getElementById('mySearch');
const searchButton= document.getElementById('button');
const resetButton = document.getElementById('reset');

$(document).ready(function(){
    $('.search').focus();
})

searchButton.addEventListener('click', function(){
    let searchValue = searchBox.value;
    searchValue = searchValue.split(' ').join("%20");
    wikipediaCall(searchValue);
    disableSearch(searchValue);
})

function disableSearch(value){
    if(value){
       $(searchButton).attr("disabled", true);
    }
}

resetButton.addEventListener('click', function(){
    $(searchButton).attr("disabled", false);
    $('.response').remove();

    $('.search').focus();
})

function wikipediaCall(query){
    let xhr = new XMLHttpRequest();
    xhr.open('GET',' https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search='+ query + '&prop=extracts&gsrlimit=10&rvprop=content&section=0&inlimit=5&format=json', true)
    xhr.setRequestHeader( 'Api-User-Agent', 'Example/1.0' );
    xhr.onload = function(){
        if(this.status === 200){
            let data = JSON.parse(this.responseText);
            appendSearchItems(data);
            console.log(JSON.parse(this.responseText))
            
        }else {
            console.log("there was an error");
        }
    }
    xhr.send()
}

function appendSearchItems(data){

    if(data[1].length === 0 ){
       $('#searchResults').append("<p class = 'noResults response'> No search results found for these keywords</p>")
    }
    for(x= 0; x < data[1].length; x++){
        $("#searchResults").append("<div class = 'card col s10 response hoverable' ><a target ='_blank' href=" + data[3][x] + ">" + data[1][x] + "</a><p>" + data[2][x] + "</p></div>");
    }

    if(data[1].length >=5){
    $("#searchResults").append("<a href = '#top'><button class = 'btn col s10 response' >Back to Top</button></a>")
}}