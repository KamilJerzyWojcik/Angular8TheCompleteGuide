import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A test recipe',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
      [
        new Ingredient('Shrimp', 10),
        new Ingredient('Pinapple', 1)
      ]),
    new Recipe('A Another test recipe',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
      [
        new Ingredient('Bread', 1),
        new Ingredient('Chicken', 2)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredienta(ingredients);
  }

}
