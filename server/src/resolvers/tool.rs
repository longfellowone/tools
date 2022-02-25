use crate::loaders::employee::EmployeeLoader;
use crate::resolvers::employee::Employee;
use async_graphql::dataloader::DataLoader;
use async_graphql::{Context, Object, ID};

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
        let employee = ctx
            .data_unchecked::<DataLoader<EmployeeLoader>>()
            .load_one(self.employee_id)
            .await
            .unwrap();

        employee.unwrap()
    }
}
