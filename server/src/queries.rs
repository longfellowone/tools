use crate::postgres;
use crate::resolvers::employee::Employee;
use crate::resolvers::tool::Tool;
use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

pub struct QueryRoot;

#[Object]
impl QueryRoot {
    pub async fn tools(&self, ctx: &Context<'_>) -> Vec<Tool> {
        let pool = ctx.data_unchecked::<PgPool>();

        let tools = sqlx::query_as!(
            Tool,
            // language=PostgreSQL
            r#"select * from tool"#
        )
        .fetch_all(pool)
        .await
        .unwrap();

        tools
    }

    pub async fn employees(&self, ctx: &Context<'_>) -> Vec<Employee> {
        let pool = ctx.data_unchecked::<PgPool>();

        let employees = sqlx::query_as!(
            Employee,
            // language=PostgreSQL
            r#"
            select * from employee
            "#
        )
        .fetch_all(pool)
        .await
        .unwrap();

        employees
    }
}
