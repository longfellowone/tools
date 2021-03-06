use crate::resolvers::employee::Employee;
use crate::resolvers::tool::Tool;
use async_graphql::{Context, Object};
use sqlx::PgPool;

pub struct QueryRoot;

#[Object]
impl QueryRoot {
    pub async fn tools(&self, ctx: &Context<'_>) -> Vec<Tool> {
        let pool = ctx.data_unchecked::<PgPool>();

        let tools = sqlx::query_as!(
            Tool,
            // language=PostgreSQL
            r#"
            select id, employee_id, tagged, brand, tool
            from tool
            order by tool, brand, tagged
            "#
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
            select id, first_name, last_name
            from employee
            "#
        )
        .fetch_all(pool)
        .await
        .unwrap();

        employees
    }
}
