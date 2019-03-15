// use when testing phone gap as will not get fired in browser

document.addEventListener("deviceready", innit, false);

function innit(){

}

const key = "377d71bd31cf5b98d97de19c0f8c40b2";
const id = "11c71373";
const foodArr = JSON.parse(localStorage.getItem("foodArr"));
var searchObject = JSON.parse(localStorage.getItem("searchObject"));
var r = 0;
$(document).on('pagecreate', '#fridge', function () {
    var arr = [];
    console.log("fridge menu");
    if (foodArr != null)
    {
        appendFoodList();
        
    } else {alert("add food")}
    $(document).on('click', '#addBtn', function (e) {
        e.preventDefault();
        var food = $('#fInput').val();
        arr.push(food);

        localStorage.setItem("foodArr", JSON.stringify(arr));

        html = '<li class="ui-li-static ui-body-inherit ui-last-child">' +
            '<div>' +
            '<h3>' + food + '</h3>' +
            '</div>' +
            '</li>';
        console.log(food);
        $('.foodList').append(html); 
    });
});

$(document).on('click', '#clearBtn', function () { localStorage.clear();});


$(document).on('pagecreate', '#recipes', function () { 
    console.log('recipies list');
    var url = fetchUrl(foodArr);
    var i, html;
    $.ajax({
        beforeSend: function () {
            $.mobile.loading('show', {
                text: "hello",
                textVisible: true,
                theme: "a",
                
            });}, //Show spinner
        complete: function () { $.mobile.loading("hide"); }, //Hide spinner
        url: url,
        dataType: 'json',
        success: function (myJson) {
            localStorage.setItem("searchObject", JSON.stringify(myJson));

            for (i = 0; i < myJson.hits.length; i++) {
                html = '<div class="recipe-box">' +
                    '<div>' +
                    '<h3 class="recipeName">' + myJson.hits[i].recipe["label"] + '</h3>' +
                    '<img src=' + myJson.hits[i].recipe["image"] + ' class="recipe-image">' +
                    '</div>' +
                    '<div id="button-section">' +
                    '<a data-ajax="false" data-recipenum="'+ i + '" class="btn-one recipebtn">View Recipe</a>' +
                    '</div>' +
                    '</div>';
                $('.recipe-container').append(html);
            }
            $('.recipebtn').click(function(e){
            r='';
            var rnumber= $(this).data('recipenum');
            console.log(rnumber);
            r = rnumber;
            $('#recipe-box-detail').html('');
            $.mobile.changePage( "#sRecipe");
            //{ reloadPage : true }

            });
        
        }
        });
});
$(document).on("pageshow","#sRecipe",function(){ // When entering pagetwo

    console.log('recipe detail',r);
    
  
    var html = '<div class="recipe-box">' +
        '<h2>' + searchObject.hits[r].recipe["label"]+'</h2>'+
        '<div>' +
        '<img src=' + searchObject.hits[r].recipe["image"] + ' class="recipe-image" id="r-img" with="100%" height="100%">' +

        '</div>' +
        '<div>' +
        '<h3>Nutritional Information</h3>' +

        '</div>' +
        '<div class="ingredients-container">' +
        '<h3>Ingredients</h3>' +
        '<ul>' +
        '<li>Ingredient 1</li>' +
        '<li>Ingredient 2</li>' +
        '<li>Ingredient 3</li>' +
        '<li>Ingredient 4</li>' +
        '</ul>' +
        '</div>' +
        '<div class="steps-container">' +
        '<h3>Steps</h3>' +
        '<ul>' +
        '<li>Step 1</li>' +
        '<li>Step 2</li>' +
        '<li>Step 3</li>' +
        '</ul>' +
        '</div>' +
        '</div>'
    $('.sRecipe-container');
    $('#recipe-box-detail').html(html);
});

function fetchUrl(foodArr) {
    var url, i;
    var ingr = foodArr[0];
    if(foodArr.length > 0)
    {
        for(i = 1; i<foodArr.length; i++)
        {
            ingr += "+" + foodArr[i]; 
        }
    }

    var url = 'https://api.edamam.com/search?q='+ingr+'&app_id=11c71373&app_key=377d71bd31cf5b98d97de19c0f8c40b2';

    return url;
}

function appendFoodList() {
    var i, html;
    
        $('.foodList').empty();
        for (i = 0; i < foodArr.length; i++)
        {
            html = '<li class="ui-li-static ui-body-inherit ui-last-child">' +
                '<div>' +
                '<h3>' + foodArr[i] + '</h3>' +
                '</div>' +
                '</li>';
            console.log(foodArr[i]);
            $('.foodList').append(html)
        }
        //console.log(html);
    
}



