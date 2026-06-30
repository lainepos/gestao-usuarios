import { fazerLogin } from '../src/login.js';
import assert from 'node:assert';

describe('Validar o Login de Usuários', function() {
    it('Validar que o login é realizado com sucesso com email e senha corretos', function() {
        // Arrange
        const email = 'joao@email.com';
        const senha = 'joao123';

        // Act
        const resultado = fazerLogin(email, senha);

        // Assert
        assert.equal(resultado, 'Login realizado com sucesso');
    });

    it('Validar que uma mensagem é retornada quando as credenciais do usuário estão expiradas', function() {
        // Arrange
        const email = 'carlos@email.com';
        const senha = 'carlos789';

        // Act
        const resultado = fazerLogin(email, senha);

        // Assert
        assert.equal(resultado, 'Suas credenciais expiraram. Renove suas credenciais.');
    });

    it('Validar que uma mensagem é retornada quando o usuário não é encontrado', function() {
        // Arrange
        const email = 'naoexiste@email.com';
        const senha = 'qualquerSenha';

        // Act
        const resultado = fazerLogin(email, senha);

        // Assert
        assert.equal(resultado, 'Credenciais incorretas.');
    });

    it('Validar que uma mensagem retorna quando a senha está incorreta para o usuário encontrado', function() {
        // Arrange
        const email = 'joao@email.com';
        const senha = 'senhaErrada';

        // Act
        const resultado = fazerLogin(email, senha);

        // Assert
        assert.equal(resultado, 'Credenciais incorretas.');
    });
});
