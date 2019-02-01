$(document).ready(function() {

  var url = window.location.search;
  var recipeId;

  var updating = false;

  if (url.indexOf("?recipe_id=") !== -1){
    recipeId = url.split("=")[1];
    getRecipeData(recipeId);
  }
  
  var bodyInput = $("#body");
  var titleInput = $("#title");

  var recForm = $("#rec");

  var recipeCategorySelect = $("#categroy");

  recipeCategorySelect.val("No Restrictions");

  recForm.on("submit", function handleFormSubmit(event){
    event.preventDefault();

    if(!titleInput.val().trim()||!bodyInput.val()){
      return;
    }
    var newRecipe = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      category: recipeCategorySelect.val()
    };

    console.log("newRecipe: ", newRecipe);

    if (updating){
      newRecipe.id = recipeId;
      updatedRecipt(newRecipe);

    }
    else{
      submitRecipe(newRecipe)
    }
  })
  function submitRecipe(Recipe) {
    $.post("/api/recipes/", function() {
      window.location.href = "/recipes";
    });
  }
  function getRecipeData(id) {
    $.get("/api/recipes" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        recipeCategorySelect.val(data.category);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }
  });