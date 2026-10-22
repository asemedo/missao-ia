# Publicar a correção de navegação — 22/10/2026

1. Extraia missao-ia-portal-navegacao.zip.
2. No repositório existente asemedo/missao-ia, substitua os ficheiros pelo CONTEÚDO extraído, incluindo missao-ia/ e downloads/. O index.html do portal deve continuar na raiz. Não crie uma pasta adicional e não altere o nome da pasta do jogo.
3. Faça Commit changes no ramo já usado pelo GitHub Pages. Mantenha a configuração Pages existente e aguarde a conclusão da publicação.
4. Abra https://asemedo.github.io/missao-ia/, atualize a página, escolha Jogar agora, responda a um desafio e use «← Voltar ao portal». Entre novamente e confirme a retoma e a pontuação.

O site público não foi atualizado nesta tarefa. O teste HTTP foi feito num servidor local, com um subcaminho equivalente ao GitHub Pages; a publicação HTTPS terá de ser confirmada após o commit.

## Offline
Extraia TODO o ZIP da Edição Escola. Abra index.html para o portal ou missao-ia/index.html para o jogo. Mantenha a estrutura: o portal local é o destino real de ../index.html, inclusive em file://. Esta edição não contém um botão para descarregar outra cópia de si própria. O ZIP dentro de downloads/ no portal corresponde à Edição Escola atualizada.

## Progresso
A chave missao-ia-v1.5, o formato e o código de armazenamento não foram alterados. Não limpe os dados do navegador. Use o mesmo navegador, perfil, origem e caminho. Para preservar o progresso offline existente, substitua os ficheiros na mesma pasta do jogo, colocando o portal um nível acima. Mudar a pasta de um ficheiro local pode dar acesso a armazenamento diferente, conforme o navegador; não há migração automática entre online e offline.
