use crate::app::AppConfig;
use crate::postgres::PostgresConfig;
use config::{Config, ConfigError, Environment, File};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Configuration {
    pub app: AppConfig,
    pub postgres: PostgresConfig,
}

impl Configuration {
    pub fn new() -> Result<Self, ConfigError> {
        let config = Config::builder()
            .add_source(File::with_name("config/development"))
            .add_source(Environment::default().separator("_"))
            .build()?;

        config.try_deserialize()
    }
}
