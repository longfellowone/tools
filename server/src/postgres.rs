use async_graphql::Context;
use serde::Deserialize;
use sqlx::postgres::{PgConnectOptions, PgPoolOptions, PgSslMode};
use sqlx::{Connection, PgConnection, PgPool};

#[derive(Debug, Deserialize)]
pub struct PostgresConfig {
    pub host: String,
    pub port: u16,
    pub user: String,
    pub password: String,
    pub database: String,
    pub sslmode: bool,
}

impl PostgresConfig {
    pub async fn pool(&self) -> PgPool {
        PgPoolOptions::new()
            .connect_timeout(std::time::Duration::from_secs(2))
            .connect_lazy_with(self.connect_options_with_db())
    }

    pub async fn connection(&self) -> PgConnection {
        PgConnection::connect_with(&self.connect_options())
            .await
            .expect("failed to connect to database")
    }

    fn connect_options(&self) -> PgConnectOptions {
        PgConnectOptions::new()
            .username(&self.user)
            .password(&self.password)
            .host(&self.host)
            .port(self.port)
            .ssl_mode(PgSslMode::Prefer)
    }

    fn connect_options_with_db(&self) -> PgConnectOptions {
        self.connect_options().database(&self.database)
    }
}
