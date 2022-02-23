use crate::app::AppConfig;
use crate::queries::QueryRoot;
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::extract::{Extension, TypedHeader};
use axum::headers::authorization::Bearer;
use axum::headers::Authorization;
use axum::response;
use axum::response::IntoResponse;
use sqlx::PgPool;

pub type GraphqlSchema = Schema<QueryRoot, EmptyMutation, EmptySubscription>;

pub fn schema(pool: PgPool, config: AppConfig) -> GraphqlSchema {
    Schema::build(QueryRoot, EmptyMutation, EmptySubscription)
        .data(pool)
        .data(config)
        .finish()
}

pub async fn handler(schema: Extension<GraphqlSchema>, req: GraphQLRequest) -> GraphQLResponse {
    schema.execute(req.into_inner()).await.into()
}

pub async fn playground() -> impl IntoResponse {
    response::Html(playground_source(GraphQLPlaygroundConfig::new("/")))
}
