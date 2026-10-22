/* Cada missão tem um id estável. Para ativar uma nova missão, acrescentar
   questions no mesmo formato da missão 1 e mudar available para true. */
window.MISSIONS = [
  {id:'detetives',number:'01',title:'Detetives da IA',subtitle:'Descobre a IA à tua volta.',icon:'⌕',available:true,questions:[
    {tag:'NA COZINHA',title:'Uma torradeira com temporizador',text:'A torradeira desliga-se sempre ao fim de dois minutos. Segue apenas essa regra, sem aprender com exemplos.',answer:false,explanation:'Um temporizador segue uma regra fixa. Ser uma máquina automática não significa usar inteligência artificial.'},
    {tag:'NO TELEMÓVEL',title:'Fotografias bem arrumadas',text:'Uma aplicação foi treinada com muitas imagens. Agora identifica padrões e sugere quais das tuas fotografias mostram gatos.',answer:true,explanation:'Este sistema usa IA para reconhecer padrões aprendidos com exemplos. Mesmo assim, pode confundir um gato com outro animal!'},
    {tag:'NA SECRETÁRIA',title:'Uma calculadora simples',text:'Escreves 25 × 4. A calculadora aplica as operações matemáticas programadas e mostra 100.',answer:false,explanation:'Uma calculadora simples executa operações definidas. Não precisa de aprender padrões a partir de dados para fazer esta conta.'},
    {tag:'A CONVERSAR',title:'Um assistente que escreve histórias',text:'Um assistente foi treinado com muitos exemplos de texto. A partir do teu pedido, gera uma história sobre uma escola na Lua.',answer:true,explanation:'É um exemplo de IA generativa: produz texto com base em padrões aprendidos. Pode inventar informação e não devemos tratar tudo o que escreve como um facto.'},
    {tag:'NO JARDIM',title:'Rega à hora marcada',text:'O sistema de rega liga-se todos os dias às oito horas, durante dez minutos. Não analisa o tempo nem aprende com dados.',answer:false,explanation:'Neste exemplo, a rega segue um horário programado. Há sistemas de rega mais avançados, mas este não usa IA.'},
    {tag:'A OUVIR MÚSICA',title:'Sugestões à tua medida',text:'Um serviço analisa padrões nas músicas ouvidas por muitas pessoas e aprende a sugerir canções de que poderás gostar.',answer:true,explanation:'Este sistema de recomendação usa IA para encontrar padrões nos dados. Uma sugestão é uma previsão: podes gostar dela ou não!'}
  ]},
  {id:'treinar',number:'02',title:'Ensina o BIT!',subtitle:'Como se aprende com exemplos?',icon:'▧',available:true,objective:'Explorar dados de treino, padrões e exemplos variados.'},
  {id:'verificar',number:'03',title:'Verdade ou invenção?',subtitle:'Investiga antes de acreditar.',icon:'?',available:true,objective:'Verificar respostas, identificar erros e comparar fontes.'},
  {id:'responsavel',number:'04',title:'Super-heróis Digitais',subtitle:'Protege, aprende e ajuda os outros.',icon:'☆',available:true,objective:'Proteger dados pessoais e refletir sobre escolhas justas.'}
];

// Textos e objetivos próprios de cada missão; só a missão 1 está ativa.
Object.assign(window.MISSIONS[0], {
  duration:'cerca de 8–10 minutos',
  objective:'Reconhecer exemplos de IA, justificar com pistas e aplicar a ideia a uma situação nova.',
  heading:'Encontras a inteligência artificial?',
  intro:'Observa as situações, escolhe pistas e aplica o que descobriste. Cada resposta certa vale 100 pontos. A ordem muda em cada partida.',
  hint:'Exploramos sobretudo IA que aprende padrões com dados. Esta é uma forma de IA: também há IA baseada em conhecimento e regras. Uma regra simples, por si só, não demonstra IA.',
  takeaways:[
    'A aprendizagem com dados é uma forma de IA, não toda a IA. Também existem sistemas de IA que usam conhecimento e regras para raciocinar. Um temporizador ou uma conta simples não são, por si só, exemplos de IA.',
    'Procura evidências sobre como o sistema funciona. Usar eletricidade, ter um ecrã ou parecer moderno não chega para decidir. Às vezes falta informação.',
    'Falar como uma pessoa não prova que uma máquina pense ou sinta como nós. O BIT é uma personagem fictícia. Os sistemas de IA podem errar: verifica afirmações factuais em fontes fiáveis.'
  ],
  nextText:'A seguir: Ensina o BIT! — Já disponível no mapa'
});
window.MISSIONS[0].questions.push(
  {tag:'PROCURA A PISTA',title:'O que revela aprendizagem com dados?',text:'Uma aplicação sugere fotografias de gatos. Qual é a melhor pista de que usa aprendizagem com dados?',prompt:'Escolhe a justificação mais forte.',answer:'examples',options:[{value:'screen',label:'Tem um ecrã colorido.'},{value:'examples',label:'Foi ajustada com muitas imagens e reconhece padrões em imagens novas.'},{value:'fast',label:'Responde muito depressa.'}],explanation:'A pista é o uso de exemplos para reconhecer padrões em casos novos. A aparência e a rapidez não provam que um sistema usa IA.'},
  {tag:'JUSTIFICA E VERIFICA',title:'Uma história com um facto duvidoso',text:'O assistente escreveu uma história na Lua e afirmou que lá se respira sem equipamento. Como verificarias essa afirmação?',prompt:'Qual é a melhor justificação?',answer:'verify',options:[{value:'confident',label:'Acreditava porque o texto parece muito seguro.'},{value:'verify',label:'Comparava a afirmação com uma fonte científica fiável: a IA pode inventar factos.'},{value:'repeat',label:'Pedia a mesma resposta outra vez e aceitava se fosse igual.'}],explanation:'Uma resposta convincente pode estar errada. Uma fonte científica fiável ajuda a verificar a afirmação; repetir a pergunta não é uma verificação independente.'},
  {tag:'DESAFIO DE TRANSFERÊNCIA',title:'O contentor da escola',transfer:true,text:'Um contentor novo indica em que abertura colocar cada embalagem. A descrição diz apenas que tem uma câmara e um ecrã. Não explica como toma a decisão.',prompt:'O que podes concluir e que pista procurarias?',answer:'unknown',hint:'Aplica a tua descoberta a um caso novo. O que sabes realmente sobre o funcionamento?',options:[{value:'yes',label:'Usa IA, porque tem uma câmara.'},{value:'no',label:'Não usa IA, porque só separa embalagens.'},{value:'unknown',label:'Falta informação. Perguntaria como decide e se usa padrões obtidos de exemplos ou outro método de IA.'}],explanation:'A câmara e o ecrã não chegam para concluir. Precisamos de saber como decide. Procurar evidência e reconhecer o que falta saber também é uma boa decisão.'}
);
