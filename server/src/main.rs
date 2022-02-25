use server::app;
use server::config::Configuration;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // if std::env::var_os("RUST_LOG").is_none() {
    //     std::env::set_var("RUST_LOG", "server=debug,tower_http=debug,sqlx=error");
    // }

    tracing_subscriber::fmt::init();

    let config = Configuration::new()?;

    let pool = config.postgres.pool().await;

    sqlx::migrate!().run(&pool).await?;

    app::run(config.app, pool).await?;

    Ok(())
}
