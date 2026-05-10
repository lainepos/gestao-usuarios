/*
    Preciso de uma função para realizar login de usuários. A função deve receber
    um email e uma senha e verificar se existe um usuário cadastrado com essas
    credenciais. Caso o usuário exista e as credenciais estejam corretas, a função
    deve retornar uma mensagem de sucesso. Caso as credenciais estejam expiradas,
    a função deve informar que é necessário renová-las. Caso o email não exista ou
    a senha esteja incorreta, a função deve informar que as credenciais estão incorretas.

    1. Entradas
    - Email
    - Senha

    2. Regras (com relação as entradas)
    - Email deve pertencer a um usuário cadastrado
    - Senha deve corresponder ao email informado
    - O usuário não pode estar com as credenciais expiradas

    3. Processamento
    - Buscar usuário pelo email informado
    - Se o usuário não for encontrado, retornar mensagem de credenciais incorretas
    - Se a senha não corresponder ao usuário encontrado, retornar mensagem de credenciais incorretas
    - Se o usuário estiver com credenciais expiradas, retornar mensagem de credenciais expiradas
    - Retornar mensagem de sucesso

    4. Saídas
    - 'Login realizado com sucesso'
    - 'Suas credenciais expiraram. Renove suas credenciais.'
    - 'Credenciais incorretas.'
*/

const usuarios = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', senha: 'joao123', expirado: false },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', senha: 'maria456', expirado: false },
    { id: 3, nome: 'Carlos Expirado', email: 'carlos@email.com', senha: 'carlos789', expirado: true },
];

export function fazerLogin(email, senha) {
    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];

        if (usuario.email == email) {
            if (usuario.senha != senha) {
                return 'Credenciais incorretas.';
            }

            if (usuario.expirado == true) {
                return 'Suas credenciais expiraram. Renove suas credenciais.';
            }

            return 'Login realizado com sucesso';
        }
    }

    return 'Credenciais incorretas.';
}
