import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private storeEndpont = 'https://ng-recipe-book-cadd0.firebaseio.com/recipes.json';
    private fetchEndpoint = 'https://ng-recipe-book-cadd0.firebaseio.com/recipes.json';

    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.httpClient
            .put(
                this.storeEndpont,
                recipes)
            .subscribe(
                (response) => {
                    console.log(response);
                }
            );
    }

    fetchRecipes() {
        return this.httpClient.get<Recipe[]>(this.fetchEndpoint).pipe(
            map((recipes) => {
                return recipes.map(
                    recipe => {
                        return { ...recipe, Ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    });
            }),
            tap((recipes) => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }
}
