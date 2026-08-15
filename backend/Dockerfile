FROM golang:1.26-alpine AS build

WORKDIR /app
RUN apk add --no-cache ca-certificates
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /server ./cmd/server

FROM alpine:3.22

WORKDIR /app
RUN apk add --no-cache ca-certificates
COPY --from=build /server /app/server
COPY migrations /app/migrations
COPY docs /app/docs
EXPOSE 8080
CMD ["/app/server"]
