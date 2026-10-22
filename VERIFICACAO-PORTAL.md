# Verificação da entrega — 22/10/2026

Estado: pronto para GitHub Pages; ainda NÃO publicado. Não existe URL público confirmado.

- Base: missao-ia-v1.5.3-edicao-escola.zip, CRC e SHA-256 confirmados.
- Todos os ficheiros HTML, JS, CSS e SVG do jogo comparados byte a byte com o ZIP aprovado v1.5.3. BIT original preservado.
- Jogo: seis percursos completos no Chrome, offline, a 320, 375 e 1280 píxeis (respostas certas e erradas). Quatro missões concluídas, totais 3300 e 0 confirmados, Missão 2 sem pontos. Retoma após recarregar, teclado e reinício em contextos isolados: aprovados. Zero erros JavaScript e zero pedidos externos.
- Portal: verificação a 320, 375, 768 e 1280 píxeis, sem transbordo horizontal. Capturas desktop e 320 inspecionadas. Botão Jogar agora abre o jogo; âncoras e todos os destinos relativos existem. Imagem BIT carregada. Sem pedidos externos.
- Certificado: gerados PDF e PNG após conclusão real, assinaturas binárias verificadas. Nome de teste não aparece no progresso. Os downloads foram sinalizados como canceled pelo Chrome automatizado; a gravação pelo gestor de transferências não está confirmada.
- ZIP offline incluído: cópia exata da Edição Escola. Código testado em file:// com rede desligada; portal também abre localmente após extração. Não há dependências externas obrigatórias.
- Persistência: chave e formato originais inalterados. A origem online terá o seu próprio armazenamento; não há transferência automática de progresso entre domínio online e ficheiros locais.

Limitações: o servidor HTTP local não ficou acessível no ambiente; testes efetuados em file://. HTTPS e descarga do ZIP através de um site público aguardam publicação. Mobile foi simulado pela largura do ecrã, sem dispositivo físico. Não foi feita auditoria WCAG integral nem teste em turma. Nenhum perfil pessoal foi alterado; testes em contextos novos.

Depois de publicar: abrir URL HTTPS indicado pelo GitHub, clicar Jogar agora, concluir um percurso, recarregar para verificar retoma e descarregar/abrir o ZIP. Guardar certificado, usando impressão como alternativa. Só então inserir o URL verificado na submissão.

Impressão: botão confirmou chamada à impressão e PDF com estilos de impressão produzido pelo Chrome. Não foi usada caixa de impressão ou impressora física.
