Projeto Exemplo NodeJS
====================
# Informações adicionais

- Stack:<br>
 ```Node: ^v10.6```<br>
 ```Express: ^4.17 ```<br>
 ```Mongoose: ^5.5```<br>
 ```Serverless: ^1.44```<br>
 ```Serverless Http: ^2.0.2```<br>
 ```Husky: ^2.4```<br>
 ```Eslint: ^5.16```<br>
 ```Jest: ^24.8```<br>

# Rotas
```GET - /online```
Esta rota é para indicar se a API está funcionando

```POST - /user/signup```
Esta rota é para a criação de usuário

```POST - /user/signin```
Esta rota é para fazer login

```GET - /user```
Esta rota é para consultar todos os usuários da base
<strong>Esta rota requer autenticação no cabeçalho, Bearer com o token fornecido no 'signin'</strong>

```GET - /user/findbyid/:id```
Esta rota é para consultar um usuário por id
<strong>Esta rota requer autenticação no cabeçalho, Bearer com o token fornecido no 'signin'</strong>



# Baixar dependências

# Variaveis de ambiente
```PORT= 3000```<br>
```JWT_SECRET=pitangsecret```<br>
```JWT_EXPIRATION_TIME=1m```<br>
```MONGO_URL=mongodb://padmin:Pit@ng01@ds137498.mlab.com:37498/example-project```<br>


# Executar os testes
Para instalar as dependências do projeto, só executar o comando abaixo na pasta onde está o arquivo package.json: 
```npm install```

No terminal pode executar o comando: <br/>
```npm run test```

Para validar com o coverage, pode executar: <br/>
```npm run test:coverage```

Para validar com o eslint: <br/>
```npm run lint```
