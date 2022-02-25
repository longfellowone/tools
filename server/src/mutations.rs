use crate::resolvers::tool::Tool;
use async_graphql::{Context, InputObject, Object, SimpleObject, ID};
use sqlx::PgPool;
use uuid::Uuid;
pub struct MutationRoot;

#[Object]
impl MutationRoot {
    async fn assign_tool(&self, ctx: &Context<'_>, input: AssignToolInput) -> AssignToolPayload {
        let pool = ctx.data_unchecked::<PgPool>();

        let tool_id = Uuid::parse_str(&input.tool_id).unwrap();
        let employee_id = Uuid::parse_str(&input.employee_id).unwrap();

        let tool = sqlx::query_as!(
            Tool,
            // language=PostgreSQL
            r#"
            update tool
            set employee_id = $1
            where id = $2
            returning id, employee_id, tagged, brand, tool
            "#,
            employee_id,
            tool_id
        )
        .fetch_one(pool)
        .await
        .unwrap();

        AssignToolPayload { tool }
    }
}

#[derive(InputObject)]
pub struct AssignToolInput {
    tool_id: ID,
    employee_id: ID,
}

#[derive(SimpleObject)]
pub struct AssignToolPayload {
    tool: Tool,
}
