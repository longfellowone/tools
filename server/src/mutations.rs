use crate::app::AppConfig;

use async_graphql::{Context, Object, SimpleObject};
use chrono::Utc;
use jsonwebtoken::{EncodingKey, Header};
use sha3::{Digest, Sha3_256};
use std::ptr::hash;
use uuid::Uuid;

// pub struct MutationRoot;

// #[Object]
// impl MutationRoot {
//
// }
