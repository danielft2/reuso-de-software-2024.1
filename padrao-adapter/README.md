# Implementando o Padrão Adapter

O objetivo deste projeto é resolver o problema de dependência direta entre um repositório de usuários e o ORM utilizado. Ao implementar o padrão **Adapter**, garantimos que a aplicação possa trocar a implementação do ORM no futuro sem impactar o código já existente.

## Motivação

Ao desenvolver aplicações que utilizam um ORM, como Prisma ou Sequelize, pode surgir a necessidade de mudar a biblioteca ORM ou implementar uma nova estratégia de armazenamento. Sem uma abstração, alterações desse tipo podem exigir grandes refatorações no código.

Ao utilizar o padrão Adapter, desacoplamos a lógica da aplicação da implementação específica do repositório, permitindo maior facilidade de manutenção e evolução.

## Estrutura do Projeto

O projeto é dividido em diferentes implementações de repositórios, todos seguindo uma interface comum:

- **`UserRepositoryPrisma`**: Implementação que utiliza o Prisma ORM para salvar usuários no banco de dados.
- **`UserRepositoryInMemory`**: Implementação que salva os usuários em memória, ideal para testes.
- **`UserRepository`**: Abstração principal utilizada na aplicação, que não depende diretamente da implementação subjacente.
