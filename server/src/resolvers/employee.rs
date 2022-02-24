use async_graphql::SimpleObject;
use uuid::Uuid;

#[derive(SimpleObject, Debug)]
pub struct Employee {
    pub id: Uuid,
    pub first_name: String,
    pub last_name: String,
}
