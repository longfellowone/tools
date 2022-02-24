use async_graphql::{Object, ID};
use uuid::Uuid;

#[derive(Debug, Clone)]
pub struct Employee {
    pub id: Uuid,
    pub first_name: String,
    pub last_name: String,
}

#[Object]
impl Employee {
    async fn id(&self) -> ID {
        self.id.into()
    }

    async fn first_name(&self) -> &str {
        &self.first_name
    }

    async fn last_name(&self) -> &str {
        &self.last_name
    }
}
