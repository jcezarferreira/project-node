Desafio Concrete
====================
# Baixar dependencias
No terminal pode executar o comando: <br/>
<b>npm install</b>

# Variaveis de ambiente
PORT= 3000<br>
JWT_SECRET=concretesecret<br>
JWT_EXPIRATION_TIME=1m<br>
MONGO_URL=mongodb://admin-concrete:c0ncr3t3@ds233167.mlab.com:33167/desafio-concrete<br>

* Para rodar os testes é necessário criar um arquivo .env definir as variáveis de ambiente

# Executar o projeto
No terminal pode executar o comando: <br/>
<b>* serverless offline start --noLazy</b><br/>
Caso use o VSCode, o projeto pode ser executado pelo debug pré-configurado na aba de <b>Debug</b>


# Executar os testes
No terminal pode executar o comando: <br/>
<b>* npm run test<br/>
Para validar com o coverage, pode executar: <br/>
<b>* npm run test:coverage<br/>

# Deploy do Projeto:

* Antes de fazer o deploy, deve configurar suas credenciais da AWS. 

No terminal pode executar o comando: <br/>
<b>* serverless deploy</b><br/> 

#URL
Endpoint: https://42flr6f0ph.execute-api.us-east-1.amazonaws.com/dev
Sign in: https://42flr6f0ph.execute-api.us-east-1.amazonaws.com/dev/signin
Criação de cadastro (Sign UP): https://42flr6f0ph.execute-api.us-east-1.amazonaws.com/dev
Buscar usuário: https://42flr6f0ph.execute-api.us-east-1.amazonaws.com/dev/user/:id