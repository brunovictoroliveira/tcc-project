import type { LoginData, User, Customer } from "@/lib/definitions";

// Interface interna para incluir a senha que vem da API
interface CustomerWithPassword extends Customer {
  password?: string;
}

// A função agora realmente interage com a API do json-server
export async function login(data: LoginData): Promise<User> {
  // 1. Busca na API por um cliente com o email exato fornecido
  // json-server permite filtrar por campo diretamente na URL
  const response = await fetch(
    `http://localhost:3001/customers?email=${data.email}`
  );

  if (!response.ok) {
    throw new Error("Falha na comunicação com o servidor.");
  }

  const foundUsers: CustomerWithPassword[] = await response.json();

  // 2. Verifica se algum cliente foi encontrado com aquele e-mail
  if (foundUsers.length === 0) {
    throw new Error("E-mail não encontrado.");
  }

  const user = foundUsers[0]; // Pega o primeiro (e único) usuário encontrado

  // 3. Verifica se o cliente encontrado tem uma senha e se ela bate com a fornecida
  if (!user.password || user.password !== data.password) {
    throw new Error("Senha inválida.");
  }

  // 4. Se tudo estiver correto, retorna os dados do usuário (sem a senha)
  // Isso garante que a senha não seja armazenada no estado do Redux
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

/*  Explicação da Lógica de Login

Resumo da Nova Lógica
Consulta à API: A função agora faz uma chamada fetch real para
 http://localhost:3001/customers, usando a funcionalidade de
  filtro do json-server (?email=...) para encontrar o usuário.

Validação de E-mail: Ele verifica se a resposta da API trouxe
 algum resultado. Se o array retornado for vazio, significa
  que o e-mail não existe.

Validação de Senha: Se um usuário for encontrado, ele compara
 a senha do formulário com a senha que está no db.json.

Retorno Seguro: Em caso de sucesso, a função retorna o objeto
 do usuário, mas remove a propriedade da senha antes de fazê-lo.
 Isso é uma boa prática para garantir que dados sensíveis não
 fiquem circulando pela sua aplicação (por exemplo, no estado do Redux).

*/
