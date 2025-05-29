const recipes = {

  "egg friedrice": {
    ingredients: {
      "Cooked rice": "2 cups",
      "Eggs": "2",
      "Onion": "1 small, chopped",
      "Green peas": "½ cup (optional)",
      "Carrot": "1 small, chopped (optional)",
      "Garlic": "2 cloves, minced",
      "Soy sauce": "1 tbsp",
      "Oil": "2 tbsp",
      "Salt": "to taste",
      "Pepper": "to taste",
      "Spring onions or coriander": "for garnish (optional)"
    },
    steps: `1. Heat oil in a pan or wok. Add chopped onion and garlic, sauté until soft.\n2. Add carrots and peas (if using) and cook for 2–3 minutes.\n3. Push veggies to one side, crack eggs on the other side, scramble until cooked.\n4. Add cooked rice, soy sauce, salt, and pepper. Mix everything well and cook for 3–4 minutes.\n5. Garnish with spring onions or coriander. Serve hot.`
  },

  "soya pakoda": {
    ingredients: {
      "Soya chunks (soaked and chopped)": "100g",
      "Gram flour (besan)": "100g",
      "Rice flour": "2 tbsp",
      "Green chili": "1, chopped",
      "Ginger": "1 tsp, grated",
      "Turmeric powder": "0.5 tsp",
      "Red chili powder": "1 tsp",
      "Salt": "to taste",
      "Water": "as needed",
      "Oil": "for deep frying"
    },
    steps: `1. Soak soya chunks in hot water for 15 mins. Drain and chop finely.\n2. Mix all dry ingredients and chopped soya.\n3. Add water gradually to form thick batter.\n4. Deep fry spoonfuls in hot oil till golden.\n5. Serve with chutney or ketchup.`
  },

  "chicken curry": {
    ingredients: {
      "Chicken pieces": "300g",
      "Onion": "1 medium, chopped",
      "Tomato": "1 medium, chopped",
      "Garlic": "3 cloves, minced",
      "Ginger": "1-inch piece, grated",
      "Oil": "2 tbsp",
      "Turmeric powder": "0.5 tsp",
      "Red chili powder": "1 tsp",
      "Coriander powder": "1 tsp",
      "Garam masala": "0.5 tsp (optional)",
      "Salt": "to taste",
      "Water": "200ml",
      "Fresh coriander": "for garnish (optional)"
    },
    steps: `1. Heat oil, sauté onion, garlic, ginger until golden.\n2. Add tomato and cook until soft.\n3. Add spices and mix well.\n4. Add chicken and brown for 5–7 mins.\n5. Add water, cover and simmer 20–25 mins.\n6. Sprinkle garam masala, mix, and cook 2 mins more.\n7. Garnish with coriander and serve.`
  },

  "maggie": {
    ingredients: {
      "Maggi noodles": "1 packet",
      "Water": "1.5 cups",
      "Tastemaker": "1 packet",
      "Optional veggies": "½ cup (onion, tomato, peas, carrot)",
      "Oil or butter": "1 tsp"
    },
    steps: `1. Heat oil/butter and sauté veggies (optional).\n2. Add water and bring to boil.\n3. Add noodles and tastemaker.\n4. Cook 2–3 mins till water is absorbed.\n5. Serve hot.`
  }
};


function getRecipe() {
  const name = document.getElementById("recipeInput").value.toLowerCase().trim();
  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "";

  if (recipes[name]) {
    let output = `<h3>${name.toUpperCase()}</h3><ul>`;
    for (let item in recipes[name].ingredients) {
      output += `<li><strong>${item}:</strong> ${recipes[name].ingredients[item]}</li>`;
    }
    output += `</ul><p><strong>Steps:</strong><br>${recipes[name].steps.replace(/\n/g, "<br>")}</p>`;
    output += `<button onclick="addToWishlist('${name}')">Add to My Wishlist</button>`;
    resultDiv.innerHTML = output;
  } else {
    resultDiv.innerHTML = "<p>Please select a valid recipe.</p>";
  }
}

function addToWishlist(recipe) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!wishlist.includes(recipe)) {
    wishlist.push(recipe);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`${recipe} added to wishlist!`);
  } else {
    alert(`${recipe} is added in your wishlist.`);
  }
  renderWishlist();
}

function removeFromWishlist(recipe) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter(item => item !== recipe);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
}

function renderWishlist() {
  const listContainer = document.getElementById("wishlistItems");
  if (!listContainer) return;

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (wishlist.length === 0) {
    listContainer.innerHTML = "<li>No items in wishlist</li>";
    return;
  }

  listContainer.innerHTML = "";
  wishlist.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item}
      <button onclick="removeFromWishlist('${item}')">Remove</button>
      <button onclick="showRecipeFromWishlist('${item}')">View Recipe</button>
    `;
    listContainer.appendChild(li);
  });
}

function showRecipeFromWishlist(recipe) {
  document.getElementById("recipeInput").value = recipe;
  getRecipe();
}

window.onload = function () {
  renderWishlist();
};
