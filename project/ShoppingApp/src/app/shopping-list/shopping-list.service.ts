import { Subject } from 'rxjs';

import { Ingredient } from './../shared/ingredient.model';

export class ShoppingListService {

  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 5),
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getingredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredienta(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngradient(index: number, newIngradient: Ingredient) {
    this.ingredients[index] = newIngradient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
