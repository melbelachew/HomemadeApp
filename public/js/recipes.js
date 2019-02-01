$(document).ready(function() {
    $.get("/api/user_data").then(function(data) {
      console.log(data)
      $(".user-name").text(data.user);
    });

    var recipeContainer = $(".recipe-container");
    var recipeCategorySelect = $("#category");

    // $(document).on("click", "button.delete",handlePostDelete);
    // $(document).on("click", "button.edit", handlePostEdit);
    // recipeCategorySelect.on("change", handleCategoryChange);

    var recipes;

    function getRecipes(category){
      var categoryString = category || "";
      if(categoryString) {
        categoryString = "/category/" + categoryString;
      }
      $.get("/api/recipes"+categoryString, function(data){
        console.log("Recipes", data);
        recipes = data;
        if(!recipes || !recipes.length){
          displayEmpty();
        }
        else{
          initializeRows()
        }
      })
    }
    // function deletPost(id){
    //   $.ajax({
    //     method:"DELETE",
    //     url: "/api/posts/"+id
    //   })
    //   .then(function(){
    //     getRecipes(postCategorySelect.val());
    //   })
    // }
    getRecipes()

    // function handlePostEdit() {
    //   var currentPost = $(this)
    //     .parent()
    //     .parent()
    //     .data("recipe");
    //   window.location.href = "/rec?post_id=" + currentRecipe.id;
    // }

    function displayEmpty() {
      recipeContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new post.");

    // function initializeRows() {
    //   recipeContainer.empty();
    //   var recipesToAdd = [];
    //   for (var i = 0; i < recipes.length; i++) {
    //     recipesToAdd.push(createNewRow(recipes[i]));
    //   }
    //   recipeContainer.append(recipesToAdd);
    // }

    // function createNewRow(recipe) {
    //   var newRecipeCard = $("<div>");
    //   newRecipeCard.addClass("card");
    //   var newRecipeCardHeading = $("<div>");
    //   newRecipeCardHeading.addClass("card-header");
    //   var deleteBtn = $("<button>");
    //   deleteBtn.text("x");
    //   deleteBtn.addClass("delete btn btn-danger");
    //   var editBtn = $("<button>");
    //   editBtn.text("EDIT");
    //   editBtn.addClass("edit btn btn-default");
    //   var newRecipeTitle = $("<h2>");
    //   var newRecipeDate = $("<small>");
    //   var newRecipeCategory = $("<h5>");
    //   newRecipeCategory.text(recipe.category);
    //   newRecipeCategory.css({
    //     float: "right",
    //     "font-weight": "700",
    //     "margin-top":
    //     "-15px"
    //   });
    //   var newRecipeCardBody = $("<div>");
    //   newRecipeCardBody.addClass("card-body");
    //   var newRecipeBody = $("<p>");
    //   newRecipeTitle.text(recipe.title + " ");
    //   newRecipeBody.text(recipe.body);
    //   var formattedDate = new Date(recipe.createdAt);
    //   formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    //   newRecipeDate.text(formattedDate);
    //   newRecipeTitle.append(newRecipeDate);
    //   newRecipeCardHeading.append(deleteBtn);
    //   newRecipeCardHeading.append(editBtn);
    //   newRecipeCardHeading.append(newRecipeTitle);
    //   newRecipeCardHeading.append(newRecipeCategory);
    //   newRecipeCardBody.append(newRecipeBody);
    //   newRecipeCard.append(newRecipeCardHeading);
    //   newRecipeCard.append(newRecipeCardBody);
    //   newRecipeCard.data("recipe", recipe);
    //   return newRecipeCard;
    // function handleCategoryChange() {
    //   var newRecipeCategory = $(this).val();
    //   getPosts(newRecipeCategory);
    // }
  
    }
  });