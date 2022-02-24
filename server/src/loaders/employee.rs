use crate::resolvers::employee::Employee;
use async_graphql::dataloader::Loader;
use async_graphql::futures_util::TryStreamExt;
use async_graphql::FieldError;
use axum::async_trait;
use sqlx::PgPool;
use std::collections::HashMap;
use uuid::Uuid;

pub struct EmployeeLoader(PgPool);

impl EmployeeLoader {
    pub fn new(pool: PgPool) -> Self {
        Self(pool)
    }
}

#[async_trait]
impl Loader<Uuid> for EmployeeLoader {
    type Value = Employee;
    type Error = FieldError;

    async fn load(&self, ids: &[Uuid]) -> Result<HashMap<Uuid, Self::Value>, Self::Error> {
        let employee = sqlx::query_as!(
            Employee,
            // language=PostgreSQL
            r#"
            select id, first_name, last_name
            from employee
            where id = any ($1)
            "#,
            ids
        )
        .fetch(&self.0)
        .map_ok(|employee: Employee| (employee.id, employee))
        .try_collect()
        .await?;

        Ok(employee)
    }
}
