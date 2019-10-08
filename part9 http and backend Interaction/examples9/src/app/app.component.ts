import { PostsService } from './posts.service';
import { Post } from './post.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// https://console.firebase.google.com/u/0/project/ng-complete-guide-e0e9f/overview

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFeatching = false;
  error = null;
  private errorSubscription: Subscription;

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.errorSubscription = this.postService.error.subscribe(error => {
      this.error = error;
    });
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  private fetchPosts() {
    this.isFeatching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFeatching = false;
      this.loadedPosts = posts;
    },
    error => {
      this.error = error;
      this.isFeatching = false;
    });
  }

  onHandleError() {
      this.error = null;
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

}
