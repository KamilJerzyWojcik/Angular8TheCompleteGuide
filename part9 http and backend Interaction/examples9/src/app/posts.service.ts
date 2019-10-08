import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {

    error = new Subject<string>();

    constructor(private httpClient: HttpClient) { }

    createAndStorePost(postData: Post) {
        this.httpClient
            .post<{ name: string }>(
                'https://ng-complete-guide-e0e9f.firebaseio.com/posts.json',
                postData,
                {
                    observe: 'response'
                }
            )
            .subscribe(
                responseData => {
                    console.log(responseData);
                },
                error => {
                    this.error.next(error);
                });
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');

        return this.httpClient
            .get<{ [key: string]: Post }>(
                'https://ng-complete-guide-e0e9f.firebaseio.com/posts.json',
                {
                    headers: new HttpHeaders({
                        'Custom-Header': 'Hello'
                    }),
                    params: searchParams,
                    responseType: 'json'
                })
            .pipe(
                map((responseData): Post[] => {

                    const postsArray: Post[] = [];

                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postsArray;
                }),
                catchError((error) => {
                    // Send to analytics server
                    return throwError(error);
                }));
    }

    deletePosts() {
        return this.httpClient.delete(
            'https://ng-complete-guide-e0e9f.firebaseio.com/posts.json',
            {
                observe: 'events',
                responseType: 'text'
            }
        ).pipe(
            tap(event => {
                console.log(event);

                if (event.type === HttpEventType.Sent) {
                    console.log(event.type);
                }

                if (event.type === HttpEventType.Response) {
                    console.log(event.body);
                }
            })
        );
    }
}
