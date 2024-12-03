import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

type launch = {
  node: {
    name: string;
    launchId: string;
  };
};

type newsItem = {
  node: {
    title: string;
    summary: string;
    publishedAt: string;
    launches: {
      edges: [launch];
    };
  };
};

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  news!: [newsItem];
  loading = true;
  error: any;

  constructor(private readonly apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          query MyQuery {
            allArticles {
              edges {
                node {
                  title
                  summary
                  publishedAt
                  launches {
                    edges {
                      node {
                        name
                        launchId
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .valueChanges.subscribe(({ data, loading, error }: any) => {
        this.news = data.allArticles.edges;
        this.loading = loading;
        this.error = error;
      });
  }
}
