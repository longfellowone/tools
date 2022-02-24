use crate::config::Configuration;
use crate::graphql;
use anyhow::Context;
use axum::http::Method;
use axum::routing::post;
use axum::{AddExtensionLayer, Router};
use serde::Deserialize;
use sqlx::PgPool;
use std::net::SocketAddr;
use tower::ServiceBuilder;
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::TraceLayer;

#[derive(Debug, Deserialize, Clone)]
pub struct AppConfig {
    pub host: String,
    pub port: u16,
}

impl AppConfig {
    pub fn addr(&self) -> String {
        format!("{}:{}", self.host, self.port)
    }
}

pub async fn run(config: AppConfig, pool: PgPool) -> anyhow::Result<()> {
    let addr = config.addr();

    let schema = graphql::schema(pool, config.clone());

    let cors = CorsLayer::new()
        .allow_methods(vec![Method::GET, Method::POST])
        .allow_origin(Any)
        .allow_headers(Any);

    let extensions = ServiceBuilder::new()
        .layer(TraceLayer::new_for_http())
        .layer(cors)
        .layer(AddExtensionLayer::new(config))
        .layer(AddExtensionLayer::new(schema));

    // get(graphql::playground)
    let app = Router::new()
        .route("/", post(graphql::handler))
        .layer(extensions);

    axum::Server::bind(&addr.parse()?)
        .serve(app.into_make_service())
        .await
        .with_context(|| format!("failed to start http server at {}", addr))
}
