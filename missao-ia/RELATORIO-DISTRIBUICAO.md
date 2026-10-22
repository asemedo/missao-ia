# Missão IA v1.5.3 — Edição Escola

Preparação e testes: 19/10/2026. Base exclusiva: anexo aprovado
`missao-ia-v1.5.3.zip`, confirmado idêntico ao ficheiro local por comparação
binária. O original permanece intacto e foi também copiado, sem alteração,
para `arquivo-desenvolvimento/missao-ia-v1.5.3.zip`.

## Comparação e inventário

Original: 83 ficheiros. Distribuição: 15 ficheiros. Retirados: 70.
Mantidos byte a byte: app.js, bit.svg, index.html, mission2.js, mission3.js,
mission4.js, missions.js, music.js, progress.js, styles.css, CREDITOS.md e
REFERENCIAS.md. LEIA-ME.txt atualizado; FICHA-TECNICA.md e este relatório
acrescentados. Código, conteúdo pedagógico, pontuações, layout, acessibilidade,
animações e chave/formato localStorage (`missao-ia-v1.5`, version 1) intactos.

Retirados: toda a pasta testes/ (scripts, JSON e documentação de teste),
resultados JSON da raiz, seis capturas PNG, relatórios históricos,
LEIA-ME-v1.5.1.txt, LEIA-ME-v1.5.2.txt e VERIFICACAO.txt histórico.
O inventário individual acompanha a entrega em INVENTARIO-edicao-escola.csv.
Não foram removidos ficheiros no original, nem ficheiros de outras versões.

Antes da exclusão, foi auditado todo o HTML, JS, CSS e SVG do ZIP. Nenhum
nome de ficheiro retirado ocorre nesses ficheiros. Verificaram-se as referências
locais src/href: todos os destinos existem. Não há importações dinâmicas,
fetch ou dependências externas de execução. BIT está incorporado no código
e no certificado; bit.svg foi conservado como recurso original. Música e
efeitos são sintetizados localmente; não dependem de ficheiros de áudio.
Os endereços bibliográficos são texto de consulta e não recursos carregados.
O pacote não contém perfis de navegador, progresso, nomes de alunos,
certificados preenchidos, capturas ou resultados da presente auditoria.
A autoria nominal aprovada nos créditos foi mantida.

## Testes executados nesta edição

Chrome 155.0.8059.80, headless, abertura file://, contextos novos e isolados
com modo offline ativado. Testes do próprio ZIP aprovado, adaptados apenas
para o novo caminho e saída de auditoria; verificação adicional de impressão.

- Seis percursos completos das quatro missões: respostas certas e erradas
  nas larguras 320, 375 e 1280 píxeis. Totais 3300 e 0 confirmados; Missão 2
  sem pontos e previsões 2/3 antes, 3/3 depois.
- Retoma após recarregar, preservação de pontuação e prevenção de duplicação;
  navegação, cancelamento e confirmação de reinício só nos contextos de teste.
- Teclado Enter/Espaço, ausência de transbordo horizontal nos percursos,
  ficha técnica e conclusão. Zero erros JavaScript; zero pedidos HTTP/HTTPS
  observados nos seis percursos. Não foi usado servidor local.
- Animação BIT com e sem movimento reduzido; ativação de música por teclado.
  Música desligada inicialmente, controlos independentes, paragem e pausa
  por alteração de visibilidade verificadas por instrumentação Web Audio.
- PDF e PNG gerados pelo jogo após conclusão real das quatro missões;
  bytes capturados dos Blobs, assinaturas PDF verificadas e PNG inspecionado
  visualmente. Nome de teste não guardado no localStorage.
- Botão de impressão invoca window.print (substituído por marcador no teste);
  PDF de impressão produzido pelo Chrome com os estilos de impressão.
- CRC do ZIP original verificado; comparação SHA-256 de todos os ficheiros
  de execução e teste CRC/comparação de conteúdos do ZIP final.

## Limitações e observações

As transferências acionadas pelos botões PNG/PDF foram sinalizadas como
`canceled` pelo Chrome automatizado offline. A geração dos Blobs e a imagem
foram confirmadas; a gravação normal pelo gestor de transferências não foi
confirmada. O PDF pela via de impressão foi produzido; não foi aberta uma
caixa de impressão real nem testada uma impressora física. Usar a alternativa
de impressão ou guardar a pré-visualização se o navegador bloquear a descarga.

Não foi feita escuta humana do áudio, auditoria completa WCAG, teste com
leitor de ecrã, equipamento móvel físico, outros navegadores ou estudo em
turma. Não foi testada persistência após reiniciar o processo do navegador;
foi testada após recarregar a página. A política local do navegador pode
limitar localStorage em file://. Não se afirma nova consulta das fontes.

Foram preservadas as menções antigas a 1.5.1 na ficha interna e a 1.5 nos
créditos, incluindo referências textuais a relatórios históricos agora
excluídos. A documentação desta edição identifica corretamente o pacote
v1.5.3. A limpeza não corrige nem altera comportamentos do código aprovado.
Nenhum dado de perfis de navegador existentes foi apagado ou alterado.

SHA-256 do ZIP original: `98f0aa9e431cd7a6cb09d65f14d6efc2dc399b2356994143358115f6ddeef229`.
