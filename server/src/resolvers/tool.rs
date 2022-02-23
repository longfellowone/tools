use crate::resolvers::employee::Employee;
use async_graphql::{Context, Object, SimpleObject, ID};
use sqlx::PgPool;
use uuid::Uuid;

pub struct Tool {
    pub id: Uuid,
    pub employee_id: Uuid,
    pub tagged: String,
    pub brand: String,
    pub tool: String,
}

#[Object]
impl Tool {
    async fn id(&self) -> ID {
        self.id.into()
    }

    async fn tagged(&self) -> &str {
        &self.tagged
    }

    async fn brand(&self) -> &str {
        &self.brand
    }

    async fn tool(&self) -> &str {
        &self.tool
    }

    async fn assigned_to(&self, ctx: &Context<'_>) -> Employee {
        let _pool = ctx.data_unchecked::<PgPool>();

        // TODO: Needs to be loader
        Employee {
            id: Uuid::new_v4(),
            employee: "employee 1".to_string(),
        }
    }
}
