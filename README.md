# Desafio-client

Aplicação que consome o serviço REST da aplicação "desafio".

# Pré-Requisitos

  - Instalar o Node.js
  - Instalar o Apache.

# Configuração

  - Após instalar o Node e o Apache, executar o comando abaixo, para instalar o bower globalmente:
     ```sh
     $ npm install -g bower
     ```
     
  - Descompactar (ou clonar) o projeto na pasta htdocs do seu apache, de forma que fique na estrutura: <caminho do apache>/htdocs/desafio-client
  
  - Na pasta desafio-client, executar o comando abaixo para instalar as dependências do projeto:
       ```sh
     $ bower install
     ```

# Executando a aplicação

- Importante: antes de utilizar a aplicação cliente, garantir que a aplicação "desafio" esteja rodando no backend.

- Agora, basta iniciar o seu serviço do apache e acessar a aplicação, através da url: http://localhost/desafio-client (considerando a porta 80 como padrão do apache)



License
----

GPL
