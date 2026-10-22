# Correção de navegação — base v1.5.3 — 22/10/2026

- Ligação nativa «← Voltar ao portal» no cabeçalho, com destino relativo ../index.html, área de toque mínima de 44 px, foco visível e adaptação a ecrãs pequenos. Oculta na impressão.
- Portal e Edição Escola incluem o portal no nível acima do jogo. Offline não se usa history.back(), referrer, pedido de rede ou ligação externa como fallback: o destino existe no pacote. Na Escola foi retirado apenas o botão de descarga de outra cópia offline.
- Apenas index.html e styles.css do jogo foram alterados. Todos os JS e SVG foram comparados byte a byte com a base aprovada, incluindo missões, progresso, música e certificado. Créditos e referências preservados. Não há código novo que leia, escreva ou limpe localStorage.

## Verificação
12 cenários Chrome: portal/Escola × HTTP/file:// × 320/375/1280 px. Navegação pelo teclado com Enter, foco visível, ausência de transbordo, retorno ao portal e reentrada confirmados. Armazenamento completo comparado antes/depois, resposta e pontuação de 100 pontos preservadas. HTTP local usou subpastas, simulando o caminho do GitHub Pages. file:// testado com rede desligada. Capturas desktop e mobile inspecionadas.

Seis percursos completos offline no portal atualizado, com respostas certas/erradas nas três larguras: quatro missões concluídas; totais 3300 e 0; Missão 2 sem pontuação; retoma, teclado e conclusão aprovados; zero erros JavaScript e pedidos externos. Certificado PNG/PDF gerado: assinatura dos ficheiros verificada. O gestor de transferências do Chrome automatizado indicou canceled; gravação pelo gestor de downloads não confirmada. O teste de reinício foi executado apenas em contextos de teste descartáveis. Nenhum perfil pessoal foi usado.

Música e animações mantêm o código aprovado, sem alteração; não foi feito novo teste auditivo nem auditoria WCAG integral. Mobile simulado, sem dispositivo físico. A preservação em file:// foi confirmada no Chrome e no mesmo caminho; outros navegadores podem tratar o armazenamento local de modo diferente.

ZIPs verificados por CRC; a edição offline incluída em downloads/ é idêntica ao ZIP Escola entregue. Ver PUBLICAR.md. Não foi efetuada publicação no GitHub nem confirmada a atualização do site público.
