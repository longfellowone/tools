use crate::app::AppConfig;
use crate::loaders::employee::EmployeeLoader;
use crate::mutations::MutationRoot;
use crate::queries::QueryRoot;
use async_graphql::dataloader::DataLoader;
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::extract::{Extension, TypedHeader};
use axum::headers::authorization::Bearer;
use axum::headers::Authorization;
use axum::response;
use axum::response::IntoResponse;
use sqlx::PgPool;

pub type GraphqlSchema = Schema<QueryRoot, MutationRoot, EmptySubscription>;

pub fn schema(pool: PgPool, config: AppConfig) -> GraphqlSchema {
    let employee_loader = DataLoader::new(EmployeeLoader::new(pool.clone()), tokio::spawn);

    Schema::build(QueryRoot, MutationRoot, EmptySubscription)
        .data(pool)
        .data(config)
        .data(employee_loader)
        .finish()
}

pub async fn handler(schema: Extension<GraphqlSchema>, req: GraphQLRequest) -> GraphQLResponse {
    schema.execute(req.into_inner()).await.into()
}

pub async fn playground() -> impl IntoResponse {
    response::Html(playground_source(GraphQLPlaygroundConfig::new("/")))
}
