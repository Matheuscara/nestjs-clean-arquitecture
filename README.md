A arquitetura limpa organiza o código em camadas distintas, separando as responsabilidades e facilitando a manutenção e escalabilidade do sistema. Como seu projeto utilizará sempre PostgreSQL e NestJS, podemos focar na estruturação das pastas sem a necessidade de abstrair o banco de dados ou o framework.

**Estrutura de Pastas Sugerida:**

```
.
├── apps
│   ├── api
│   │   ├── src
│   │   │   ├── main.ts
│   │   │   └── app.module.ts
│   │   └── test
│   └── worker
│       ├── src
│       │   ├── main.ts
│       │   └── worker.module.ts
│       └── test
├── libs
│   ├── core
│   │   ├── src
│   │   │   ├── entities
│   │   │   ├── repositories
│   │   │   └── use-cases
│   │   └── test
│   ├── infrastructure
│   │   ├── src
│   │   │   ├── database
│   │   │   └── services
│   │   └── test
│   └── shared
│       ├── src
│       │   ├── dtos
│       │   └── utils
│       └── test
├── nest-cli.json
├── package.json
└── tsconfig.json
```

**Descrição das Pastas:**

- **`apps`**: Contém as aplicações principais. No exemplo, temos `api` (responsável por expor endpoints HTTP) e `worker` (para processamentos assíncronos ou tarefas em segundo plano). Cada aplicação possui sua própria estrutura dentro da pasta `src`.

- **`libs`**: Abriga bibliotecas reutilizáveis entre as aplicações.

  - **`core`**: Contém a lógica de negócio central, incluindo:
    - **`entities`**: Definição das entidades do domínio.
    - **`repositories`**: Interfaces que definem contratos para acesso a dados.
    - **`use-cases`**: Implementações dos casos de uso que orquestram a lógica de negócio.

  - **`infrastructure`**: Implementações concretas das interfaces definidas no `core`, como:
    - **`database`**: Configurações e implementações específicas para o PostgreSQL.
    - **`services`**: Integrações com serviços externos ou implementações de serviços internos.

  - **`shared`**: Componentes compartilhados entre as aplicações, incluindo:
    - **`dtos`**: Objetos de transferência de dados utilizados para comunicação entre camadas.
    - **`utils`**: Funções utilitárias e helpers.

**Configuração do Monorepo com NestJS:**

Para configurar o monorepo, utilize o NestJS CLI:

1. **Criar o projeto inicial:**

   ```bash
   nest new meu-projeto
   ```

2. **Converter para monorepo:**

   Dentro do diretório do projeto, execute:

   ```bash
   nest generate app api
   nest generate app worker
   ```

   Isso criará as pastas `apps/api` e `apps/worker`, configurando o projeto para o modo monorepo.

3. **Criar bibliotecas compartilhadas:**

   Ainda no diretório do projeto, crie as bibliotecas:

   ```bash
   nest generate library core
   nest generate library infrastructure
   nest generate library shared
   ```

   Essas bibliotecas serão criadas dentro da pasta `libs` e podem ser referenciadas pelas aplicações conforme necessário.

**Benefícios desta Estrutura:**

- **Separação de Responsabilidades**: Cada camada tem uma função bem definida, facilitando a manutenção e evolução do código.

- **Reutilização de Código**: Componentes comuns são centralizados em bibliotecas, evitando duplicação e promovendo consistência.

- **Escalabilidade**: A estrutura modular permite adicionar novas funcionalidades ou aplicações sem impactar significativamente o restante do sistema.
