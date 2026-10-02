# language: es
Característica: Compilación e Implementación de Contratos gRPC y GraphQL en gherkin-ai

  Escenario: Generación de Agentes gRPC con Protobuf v3
    Dado un archivo de contrato gRPC `order_service.contract.proto`
    Cuando se ejecuta `ghk implement --contract=order_service.contract.proto`
    Entonces la CLI de gherkin-ai debe compilar las definiciones RPC y mensajes Protobuf
    Y debe generar los stubs gRPC ideomáticos y controladores según el stack destino
    Y `ghk verify` debe compilar las fuentes con el compilador Protoc/gRPC del sandbox

  Escenario: Generación de Resolvers GraphQL desde SDL
    Dado un archivo de esquema GraphQL `order_schema.contract.graphql`
    Cuando se ejecuta `ghk implement --contract=order_schema.contract.graphql`
    Entonces la CLI debe mapear las Mutations, Queries y Subscriptions a Resolvers
    Y debe generar los tipos TypeScript/Java correspondientes sin errores de sintaxis
