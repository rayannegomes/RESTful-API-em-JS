### <p align="center"> Banco Digital API em JavaScript</p>

Bem-vindo à documentação da **API** do Banco Digital! 
Esta API permite a criação, gestão e consulta de contas bancárias em um banco digital fictício. 

**Ela foi desenvolvida como objeto de estudo e avaliação do Curso da Cubos Academy.** 

Foi utilizado:
- **EXPRESS**, é o framework Node mais popular e a biblioteca subjacente para uma série de outros frameworks do Node.js.
- **NODE.JS**, um framework que permite a criação de APIs, aplicações de chat e microsserviços.
- **VSCODE**, um editor de código de código aberto desenvolvido pela Microsoft.
- **NODEMON**, um utilitário que monitora as mudanças nos arquivos do seu projeto e reinicia automaticamente o servidor Node.js quando necessário.

Com essa API você pode criar **contas**, **listar contas existentes**, **fazer depósitos**, **saques**, **transferências e consultar saldos e extratos**. 

A API foi projetada para ser RESTful e fácil de usar, possui alguns *endpoints*.

**Endpoint de Contas**
- Criar uma Conta Bancária
- Listar Contas Bancárias
- Atualizar Dados do Usuário da Conta Bancária
- Excluir uma Conta Bancária

**Endpoint de Transações**
- Depositar em uma Conta Bancária
- Sacar de uma Conta Bancária
- Transferir Valores entre Contas Bancárias

**Endpoint de Consulta**
- Consultar Saldo da Conta Bancária
- Emitir Extrato Bancário
<div  align="center" style="margin-bottom:100px">
Exemplos de como mostra a listagem de contas, utilizando o INSOMNIA.
	
![image](https://github.com/rayannegomes/RESTful-API-em-JS/assets/115596746/7ac2bfc0-b3a2-469c-a172-5ce4c365c713)


![image](https://github.com/rayannegomes/RESTful-API-em-JS/assets/115596746/f1e5a70b-6c99-49b9-a8cb-7371e468153f)

Deposito na conta de numero unico 2

![image](https://github.com/rayannegomes/RESTful-API-em-JS/assets/115596746/ce244758-202c-42d4-af77-b4ae63de1a61)

![image](https://github.com/rayannegomes/RESTful-API-em-JS/assets/115596746/b277779f-2901-4226-9ce7-0f9037d27be8)

Ao consultar o saldo da conta 2

![image](https://github.com/rayannegomes/RESTful-API-em-JS/assets/115596746/5c76b5dc-7108-4175-a7d7-53352968d431)


![image](https://github.com/rayannegomes/RESTful-API-em-JS/assets/115596746/f3986d9d-a941-4d7d-a7c9-19b4c434d21a)

*Para mais testes, siga os passos abaixo.*
 </div>

#### **Como Usar**

Para começar a usar a API, siga estas etapas:

    Clone o repositório para sua máquina local: 
	
	git clone https://github.com/rayannegomes/RESTful-API-em-JSi.git 

Instale as dependências:
	
	npm install express
Instale as dependências de desenvolvedor (opicional):
	
	npm install -D nodemon
 
Inicie o servidor:

A API estará disponível em http://localhost:3000.

##### Considerações Finais

Esta API foi projetada para fins de aprendizado e pode não ser adequada para uso em produção. Certifique-se de tomar as medidas apropriadas para torná-la mais segura e escalável, se necessário.

##### Autor

![image](https://github.com/rayannegomes/RESTful-API-em-JS/assets/115596746/6b04d948-39d5-4c55-8b27-d63965c458d6)

