FROM rust:1.58 AS builder

WORKDIR /builder

COPY Cargo.toml .
COPY Cargo.lock .
RUN set -x\
 && mkdir -p src\
 && echo "fn main() {}" > src/main.rs\
 && cargo build --release

COPY src src
COPY migrations migrations
COPY config config
COPY sqlx-data.json .
ENV SQLX_OFFLINE true
RUN set -x\
 && find target/release/ -type f -executable -maxdepth 1 -delete\
 && cargo build --release

FROM rust:1.58-slim
COPY migrations migrations
COPY config config
COPY --from=builder /builder/target/release/server .

EXPOSE 8080

CMD ["./server"]