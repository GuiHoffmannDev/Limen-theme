# MISSÃO: CRIAR O TEMA SHOPIFY COMPLETO DA LIMEN

Você atuará como:

* engenheiro sênior especializado em Shopify;
* desenvolvedor especialista em Liquid;
* frontend engineer;
* designer de interfaces premium;
* especialista em acessibilidade;
* especialista em performance e SEO;
* responsável pela arquitetura e documentação do projeto.

Crie um tema Shopify completo, funcional, modular, responsivo e pronto para produção para a marca **LIMEN**.

O código será armazenado em um repositório GitHub e conectado diretamente à Shopify por meio da integração nativa de temas. Portanto, o resultado precisa ser um **tema Shopify nativo**, e não uma aplicação React, Next.js, Vue, Hydrogen ou headless.

---

# 1. REGRAS FUNDAMENTAIS

Utilize exclusivamente a arquitetura nativa de temas Shopify:

* Liquid;
* HTML semântico;
* CSS moderno;
* JavaScript vanilla modular;
* templates JSON;
* sections;
* blocks;
* snippets;
* section groups;
* configurações no Theme Editor;
* objetos nativos da Shopify;
* formulários e rotas nativas da Shopify.

Não utilizar:

* React;
* Next.js;
* Vue;
* Nuxt;
* Tailwind via CDN;
* jQuery;
* Bootstrap;
* bibliotecas pesadas;
* dependência obrigatória de build;
* conteúdo comercial fixo que não possa ser editado;
* produtos simulados no lugar dos produtos reais da Shopify;
* checkout personalizado;
* APIs externas desnecessárias.

O tema deve funcionar depois de:

1. ser enviado ao GitHub;
2. ter sua branch conectada a um tema Shopify;
3. ser aberto no editor visual da Shopify;
4. receber produtos, coleções, páginas e menus reais.

Se o repositório estiver vazio, crie toda a estrutura do tema.

Se já houver arquivos, audite-os antes de alterar qualquer coisa, preserve o que for útil e não destrua configurações existentes sem necessidade.

---

# 2. SOBRE A LIMEN

A LIMEN é uma marca premium de tecnologia e eletrônicos voltada para objetos de mesa, áudio, produtividade, criatividade e interação entre pessoas e máquinas.

O nome vem do latim e significa:

* limiar;
* passagem;
* portal;
* fronteira entre dois estados.

A marca representa:

* a passagem entre ideia e realidade;
* o encontro entre humano e tecnologia;
* a relação entre o físico e o digital;
* tecnologia calma e compreensível;
* objetos que tornam a interação mais natural;
* precisão industrial acompanhada de sensibilidade humana.

A loja precisa transmitir que a LIMEN não vende apenas dispositivos. Ela cria uma relação mais humana, tátil e consciente com a tecnologia.

---

# 3. DIREÇÃO VISUAL

O site deve combinar:

* tecnologia humanizada;
* design editorial;
* catálogo de design industrial;
* revista independente;
* sensibilidade tátil;
* precisão funcional;
* pequenas imperfeições intencionais;
* fotografia analógica;
* ilustração manual;
* bastante espaço negativo.

A aparência deve ser:

* sofisticada;
* editorial;
* calma;
* quente;
* autoral;
* cultural;
* tátil;
* premium;
* confiável;
* memorável;
* minimalista com personalidade.

Não deve parecer:

* template Shopify genérico;
* landing page SaaS;
* site gamer;
* interface cyberpunk;
* clone da Apple;
* loja futurista com neon;
* marca de inteligência artificial genérica;
* painel administrativo;
* catálogo excessivamente comercial.

Evitar:

* azul tecnológico;
* gradientes neon;
* circuitos;
* hologramas;
* robôs;
* excesso de cards;
* sombras exageradas;
* cantos arredondados em todos os elementos;
* animações chamativas;
* excesso de badges;
* textos genéricos como “revolucionário”, “disruptivo” e “o futuro chegou”.


# Referências visuais obrigatórias

Utilize como uma das principais referências visuais o site institucional da **Anthropic**.

Antes de iniciar o desenvolvimento visual:

1. Pesquise e analise o site atual da Anthropic.

2. Observe especialmente:

   * composição editorial;
   * hierarquia tipográfica;
   * uso de serifas e itálicos;
   * espaçamento e ritmo entre seções;
   * tratamento de imagens;
   * blocos de cor;
   * ilustrações;
   * uso de fundos quentes;
   * relação entre conteúdo editorial e tecnologia;
   * navegação;
   * responsividade;
   * microinterações;
   * rodapé;
   * páginas internas;
   * uso de espaço negativo.

3. Use essa análise apenas como referência de direção artística e qualidade. Não copie:

   * código;
   * textos;
   * logotipo;
   * ilustrações;
   * fotografias;
   * componentes exclusivos;
   * estrutura exata;
   * identidade proprietária.

O resultado deve ser original e pertencer claramente à LIMEN.

A LIMEN pode compartilhar com essa referência:

* atmosfera editorial;
* tecnologia apresentada de forma humana;
* tipografia expressiva;
* uso de cores quentes;
* layouts amplos;
* equilíbrio entre rigor e imperfeição;
* sensação de marca cultural e não apenas comercial.

Mas deve preservar sua própria identidade baseada em:

* limiar;
* portal;
* passagem;
* objetos físicos;
* interação humana;
* tecnologia tátil;
* design industrial;
* calma;
* precisão;
* terracota;
* tons minerais;
* símbolo próprio da LIMEN.

---

# Pasta de referências visuais

Existe uma pasta chamada:

```text
img-ref/
```

Antes de criar o layout ou alterar o sistema visual:

1. Liste todos os arquivos presentes em `img-ref/`.

2. Analise individualmente cada imagem.

3. Identifique padrões recorrentes de:

   * tipografia;
   * cores;
   * composição;
   * textura;
   * proporção;
   * fotografia;
   * ilustração;
   * alinhamento;
   * espaçamento;
   * elementos editoriais.

4. Crie um resumo interno da direção visual encontrada.

5. Use essas imagens como referência para as decisões de design do tema.

6. Não ignore nenhum arquivo sem explicar o motivo.

7. Não reutilize imagens apenas como decoração aleatória.

8. Associe cada referência a uma intenção visual concreta.

Exemplos:

* referência tipográfica;
* tratamento do hero;
* composição de manifesto;
* estilo de cards editoriais;
* tratamento de fotografia;
* layout de seção;
* uso de cor;
* forma de apresentar artigos;
* banner;
* rodapé;
* CTA final.

As imagens da pasta `img-ref/` podem ser usadas como referências durante o desenvolvimento, mas não devem ser automaticamente publicadas no site final.

Somente utilize uma imagem diretamente no tema quando:

* ela estiver claramente destinada ao uso público;
* fizer sentido dentro da seção;
* estiver otimizada para web;
* possuir nome de arquivo adequado;
* houver confirmação de que pode ser usada.

Caso contrário, crie placeholders configuráveis no Theme Editor da Shopify.

---

# Processo visual obrigatório

Antes de escrever o CSS definitivo, apresente:

1. síntese da linguagem visual do site da Anthropic;
2. síntese das referências encontradas em `img-ref/`;
3. elementos que serão adaptados para a LIMEN;
4. elementos que serão evitados para não gerar cópia;
5. sistema de tipografia escolhido;
6. sistema de cores escolhido;
7. estrutura visual da homepage;
8. comportamento esperado em desktop e mobile.

Depois disso, crie primeiro:

* tokens de design;
* tipografia;
* paleta;
* grid;
* espaçamentos;
* botões;
* links;
* containers;
* componentes básicos.

Somente depois avance para as seções completas.

---

# Princípio de adaptação

Não faça uma réplica do site da Anthropic.

Use-o como referência para entender como uma empresa de tecnologia pode comunicar:

* inteligência;
* confiança;
* humanidade;
* cultura;
* pesquisa;
* sofisticação editorial.

Traduza esses princípios para a linguagem própria da LIMEN.

A pergunta que deve orientar cada decisão visual é:

> Como transformar a sofisticação editorial e a humanidade percebida nessa referência em uma experiência original baseada no conceito de limiar da LIMEN?

O resultado deve lembrar a mesma categoria de qualidade e maturidade visual, mas nunca parecer um clone.


---

# 4. TIPOGRAFIA

Utilize fontes do Google Fonts, com carregamento otimizado.

## Títulos e destaques

* Instrument Serif Regular
* Instrument Serif Italic

Usar em:

* H1;
* H2;
* manifestos;
* citações;
* frases de campanha;
* títulos editoriais;
* palavras destacadas em itálico.

## Interface e textos

Preferência principal:

* IBM Plex Sans

Inter pode ser usada somente como fallback ou alternativa configurável.

Usar a sans-serif em:

* navegação;
* botões;
* preços;
* especificações;
* corpo de texto;
* formulários;
* carrinho;
* filtros;
* rodapé;
* elementos funcionais.

## Implementação

Criar variáveis CSS:

```css
--font-display: "Instrument Serif", Georgia, serif;
--font-body: "IBM Plex Sans", Arial, sans-serif;
```

Permitir a escolha das fontes nas configurações globais do tema sempre que a arquitetura da Shopify permitir.

Usar `font-display: swap`.

Evitar múltiplos pesos desnecessários.

Criar uma escala tipográfica responsiva usando `clamp()`.

Exemplo de direção:

```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.25rem;
--text-xl: 1.75rem;
--text-2xl: clamp(2rem, 4vw, 4rem);
--text-hero: clamp(3.5rem, 9vw, 9rem);
```

---

# 5. PALETA DE CORES

## Cores principais da campanha

```css
--color-cream: #F4EFE5;
--color-sand: #DED2BF;
--color-terracotta: #D97855;
--color-dark-brown: #2A2722;
--color-pale-pink: #E8C6B4;
--color-sage: #A6AE95;
--color-muted-lilac: #C9C7D6;
--color-warm-white: #FAF8F2;
```

## Paleta principal do sistema

```css
--color-slate-ink: #141413;
--color-ivory-cream: #FAF9F5;
--color-black: #000000;
--color-white: #FFFFFF;

--color-warm-beige-1: #F6EDE5;
--color-warm-beige-2: #F2E3D9;
--color-warm-beige-3: #EEDACC;
--color-warm-beige-4: #EAD1BF;
--color-warm-beige-5: #E5C8B2;
--color-warm-beige-6: #E1BFA5;
--color-warm-beige-7: #DDB599;
--color-warm-beige-8: #D8AC8C;
--color-warm-beige-9: #D4A37F;
```

## Regras de uso

* usar no máximo três cores dominantes por seção;
* fundo principal em Ivory Cream ou Warm White;
* texto principal em Slate Ink;
* terracota como acento;
* áreas escuras em Slate Ink ou Black;
* cores sálvia, rosa e lilás apenas em campanhas ou blocos editoriais;
* manter contraste adequado;
* permitir edição das cores no Theme Editor;
* criar color schemes reutilizáveis.

Criar pelo menos os seguintes esquemas:

1. Ivory;
2. Terracotta;
3. Sage;
4. Lilac;
5. Warm Beige;
6. Dark;
7. Pure White.

---

# 6. SISTEMA VISUAL

Criar elementos recorrentes inspirados em:

* portal;
* limiar;
* passagem;
* moldura aberta;
* linha atravessando dois estados;
* grades editoriais;
* desenhos técnicos;
* diagramas;
* rabiscos;
* setas desenhadas à mão;
* círculos imperfeitos;
* sublinhados orgânicos;
* textura discreta de papel.

Criar detalhes gráficos em CSS e SVG simples, evitando imagens raster quando possível.

O símbolo da LIMEN deve ser usado discretamente como:

* marca no cabeçalho;
* favicon;
* divisor;
* máscara;
* moldura;
* elemento de transição;
* padrão de fundo opcional.

Não redesenhar nem modificar o logo fornecido. Criar configurações para upload de:

* logo principal;
* logo horizontal;
* logo negativo;
* símbolo isolado;
* favicon.

Quando os arquivos ainda não existirem, usar placeholders sem alterar o conceito da marca.

---

# 7. ESTRUTURA DO REPOSITÓRIO

Criar uma estrutura Shopify válida semelhante a:

```text
assets/
  base.css
  components.css
  sections.css
  product.css
  cart.css
  animations.css
  theme.js
  product.js
  cart-drawer.js
  predictive-search.js
  icon-*.svg

blocks/
  text.liquid
  button.liquid
  image.liquid
  accordion-item.liquid

config/
  settings_schema.json
  settings_data.json

layout/
  theme.liquid
  password.liquid

locales/
  en.default.json
  pt-BR.json

sections/
  announcement-bar.liquid
  header.liquid
  footer.liquid
  hero-editorial.liquid
  manifesto-editorial.liquid
  brand-principles.liquid
  featured-collection-editorial.liquid
  featured-product-editorial.liquid
  product-gallery.liquid
  product-information.liquid
  editorial-story.liquid
  material-craft.liquid
  image-text-editorial.liquid
  image-collage.liquid
  text-marquee.liquid
  quote-editorial.liquid
  journal-grid.liquid
  newsletter-editorial.liquid
  final-threshold-cta.liquid
  collection-grid.liquid
  main-product.liquid
  main-collection.liquid
  main-cart.liquid
  main-page.liquid
  main-blog.liquid
  main-article.liquid
  main-search.liquid
  main-404.liquid
  predictive-search.liquid
  cart-drawer.liquid

section-groups/
  header-group.json
  footer-group.json

snippets/
  meta-tags.liquid
  social-meta-tags.liquid
  responsive-image.liquid
  price.liquid
  product-card.liquid
  product-badges.liquid
  quantity-selector.liquid
  variant-picker.liquid
  buy-buttons.liquid
  cart-item.liquid
  icon.liquid
  loading-spinner.liquid
  breadcrumbs.liquid
  pagination.liquid

templates/
  index.json
  product.json
  collection.json
  list-collections.json
  cart.json
  page.json
  page.about.json
  page.contact.json
  blog.json
  article.json
  search.json
  404.json
  password.json
```

Adapte a estrutura quando necessário, mas mantenha todos os diretórios e arquivos compatíveis com Shopify.

O tema deve estar localizado na raiz do repositório. Não colocar os arquivos do tema dentro de uma subpasta como `/theme`, porque a integração GitHub deverá encontrar a arquitetura Shopify diretamente no branch conectado.

---

# 8. THEME EDITOR

Toda seção importante deve ser editável pelo Theme Editor.

Cada seção deve ter:

* um único bloco `{% schema %}`;
* JSON válido;
* nome legível;
* presets;
* settings organizados;
* textos editáveis;
* imagens editáveis;
* alinhamento configurável;
* color scheme configurável;
* espaçamentos configuráveis;
* opção de largura;
* controles de mobile;
* blocos reordenáveis quando fizer sentido.

Não fixar conteúdo comercial diretamente no Liquid quando puder ser um setting.

Criar configurações globais para:

* logos;
* favicon;
* tipografia;
* cores;
* largura máxima;
* raio de bordas;
* estilo dos botões;
* animações;
* redes sociais;
* informações de contato;
* carrinho lateral;
* pesquisa preditiva;
* exibição de breadcrumb;
* badges;
* newsletter;
* preferências de acessibilidade.

Configurações de seção devem ter nomes claros em português e inglês quando necessário.

---

# 9. HOME PAGE

Criar a homepage em `templates/index.json`, composta por seções reais e reordenáveis.

## 9.1 Cabeçalho

Criar um header editorial e discreto.

Desktop:

* logo à esquerda;
* menu principal central ou à esquerda;
* pesquisa, conta e carrinho à direita;
* possibilidade de header transparente sobre o hero;
* mudança de contraste ao rolar;
* sticky opcional.

Mobile:

* menu acessível;
* logo;
* pesquisa;
* carrinho;
* painel de navegação lateral;
* travamento correto do scroll;
* fechamento via Escape;
* foco preso no menu enquanto aberto.

Configurações:

* menu;
* logo;
* logo alternativo;
* largura do logo;
* sticky;
* transparência;
* color scheme;
* exibir pesquisa;
* exibir conta;
* exibir seletor de idioma e país.

## 9.2 Hero editorial

Headline padrão:

**Technology begins at the threshold.**

Subheadline padrão:

**Objects designed to make the relationship between people and technology more natural, thoughtful and tangible.**

CTA principal:

**Explore products**

CTA secundário:

**Discover LIMEN**

Características:

* título grande com Instrument Serif;
* possibilidade de destacar uma expressão em itálico;
* muito espaço negativo;
* símbolo da LIMEN como elemento gráfico;
* imagem ou vídeo opcional, não obrigatório;
* versão somente tipográfica;
* layout assimétrico;
* altura configurável;
* boa leitura em mobile;
* animação suave de entrada;
* CTA visível sem parecer agressivo.

Configurações:

* eyebrow;
* título;
* parte em itálico;
* descrição;
* botões;
* alinhamento;
* posição;
* imagem desktop;
* imagem mobile;
* vídeo hospedado na Shopify;
* overlay;
* esquema de cores;
* altura;
* exibir símbolo;
* textura opcional.

## 9.3 Manifesto editorial

Conteúdo inicial:

**Technology should feel natural.**

Texto:

A LIMEN cria objetos pensados em torno da maneira como as pessoas realmente vivem, trabalham e criam. Menos distração. Mais intenção. Menos interface. Mais interação.

Criar composição semelhante a uma página de revista:

* texto serifado grande;
* palavras em itálico;
* quebra de linhas expressiva;
* nota lateral em sans-serif;
* símbolo ou ilustração opcional;
* bastante respiro.

## 9.4 Princípios da marca

Princípios iniciais:

* Human by design
* Less interface, more interaction
* Built for touch
* Calm technology
* Made to remain useful

Mostrar em grid editorial, lista numerada ou grandes divisores horizontais.

Cada princípio deve ser um bloco editável contendo:

* número;
* título;
* descrição;
* ilustração opcional;
* cor opcional.

## 9.5 Coleção em destaque

Usar uma coleção real selecionada no Theme Editor.

Exibir:

* produtos reais;
* imagens reais;
* preço;
* preço comparativo;
* disponibilidade;
* badges;
* variantes de cor opcionais;
* botão ou quick add opcional.

Visual:

* grid com grande respiro;
* produto como objeto editorial;
* cards quase sem caixa;
* títulos discretos;
* imagens com proporção configurável;
* hover suave;
* segunda imagem opcional no hover.

Não inventar produtos no código.

Quando a coleção estiver vazia ou não selecionada, mostrar placeholders elegantes apenas no editor.

## 9.6 Produto em destaque

Selecionar um produto real.

Incluir:

* imagem;
* nome;
* preço;
* descrição curta;
* variantes;
* quantidade;
* botão adicionar ao carrinho;
* pagamento dinâmico opcional;
* status de estoque;
* link para a página completa.

## 9.7 História editorial

Seção para contar:

* significado de LIMEN;
* processo;
* relação humano-tecnologia;
* filosofia da marca.

Criar layouts alternáveis:

* texto grande;
* duas colunas;
* imagem e texto;
* texto sobre cor;
* citação;
* formato de verbete.

## 9.8 Materiais e craft

Criar uma seção modular com:

* materiais;
* processo;
* prototipagem;
* diagramas;
* imagens;
* detalhes numerados;
* pequenas legendas técnicas.

Blocos:

* material;
* etapa;
* imagem;
* nota técnica;
* diagrama;
* vídeo.

## 9.9 Journal

Exibir artigos reais de um blog selecionado.

Mostrar:

* imagem;
* título;
* data;
* autor opcional;
* resumo;
* categoria/tag;
* link.

Estética de revista, não de blog genérico.

## 9.10 Newsletter

Título:

**Notes from the threshold.**

Descrição:

**Occasional notes on objects, materials, technology and thoughtful interaction.**

Usar o formulário nativo de cadastro da Shopify.

Incluir:

* estado de sucesso;
* estado de erro;
* label acessível;
* consentimento claro;
* layout editorial.

## 9.11 CTA final

Título:

**Cross the threshold.**

Texto:

**A more human relationship with technology starts here.**

CTAs editáveis.

Usar uma composição forte, tipográfica e simples.

## 9.12 Rodapé

Incluir:

* logo;
* descrição curta;
* menus configuráveis;
* newsletter opcional;
* redes sociais;
* políticas;
* copyright;
* meios de pagamento;
* seletor de país e idioma;
* crédito opcional removível.

---

# 10. PÁGINA DE PRODUTO

Criar uma página de produto completa, funcional e elegante.

## Galeria

* imagens reais do produto;
* imagens responsivas;
* zoom acessível;
* miniaturas;
* navegação via teclado;
* suporte a vídeo;
* suporte a modelos 3D quando fornecidos pela Shopify;
* proporções sem layout shift;
* galeria mobile por swipe ou scroll horizontal com fallback acessível.

## Informações

* título;
* vendor opcional;
* preço;
* preço comparativo;
* impostos e frete;
* descrição;
* seletor de variantes;
* quantidade;
* estoque;
* SKU opcional;
* botão de compra;
* botão de pagamento dinâmico opcional;
* pickup availability quando disponível;
* mensagens de erro;
* política de entrega;
* accordions;
* share opcional.

## Variantes

* atualizar preço;
* atualizar URL;
* atualizar imagem;
* atualizar disponibilidade;
* atualizar SKU;
* desabilitar combinações indisponíveis;
* preservar compatibilidade com Shopify.

## Blocos editáveis

Permitir:

* título;
* preço;
* descrição;
* variante;
* quantidade;
* buy buttons;
* inventory;
* SKU;
* texto;
* accordion;
* ícones;
* custom Liquid;
* pickup availability;
* complementary products;
* trust message.

## Produtos relacionados

Usar recomendações nativas da Shopify quando possível.

Visual editorial e coerente com a marca.

---

# 11. COLEÇÕES

Criar:

* página de coleção;
* lista de coleções;
* filtros;
* ordenação;
* paginação;
* contagem de produtos;
* banner editorial;
* descrição;
* imagem da coleção;
* grid responsivo.

Filtros devem utilizar os dados reais da Shopify.

Mobile:

* filtros em drawer;
* foco acessível;
* botão claro para aplicar e limpar.

---

# 12. CARRINHO

Criar:

* cart drawer;
* página de carrinho;
* atualização de quantidade;
* remoção;
* subtotal;
* descontos aplicados;
* nota do pedido opcional;
* recomendação editorial opcional;
* mensagem de frete;
* botão de checkout nativo.

O carrinho lateral deve:

* abrir sem recarregar a página;
* usar JavaScript leve;
* ter fallback funcional;
* anunciar mudanças para leitores de tela;
* prender foco;
* fechar com Escape;
* respeitar `prefers-reduced-motion`.

Não interferir nem tentar redesenhar o checkout hospedado pela Shopify.

---

# 13. PESQUISA

Implementar:

* página de pesquisa;
* pesquisa preditiva;
* produtos;
* artigos;
* páginas;
* estados vazios;
* destaque do termo;
* navegação por teclado;
* feedback de carregamento;
* botão de limpar.

---

# 14. PÁGINAS EDITORIAIS

Criar templates para:

* About;
* Contact;
* Journal/blog;
* Article;
* FAQ opcional;
* página padrão;
* 404;
* password page.

## About

Deve permitir:

* manifesto;
* significado do nome;
* princípios;
* história;
* equipe;
* processo;
* imagens;
* CTA.

## Contact

Usar formulário nativo Shopify:

* nome;
* e-mail;
* telefone opcional;
* mensagem;
* sucesso;
* erros;
* dados da marca;
* redes sociais.

## Blog e artigo

Estética editorial:

* título grande;
* metadados discretos;
* boa largura de leitura;
* tipografia confortável;
* imagens amplas;
* share opcional;
* artigos relacionados.

---

# 15. COMPONENTES

Criar componentes consistentes:

* botões;
* links editoriais;
* cards de produto;
* cards de artigo;
* badges;
* inputs;
* selects;
* checkboxes;
* radios;
* drawers;
* modais;
* accordions;
* breadcrumbs;
* pagination;
* price;
* quantity selector;
* variant picker;
* loading states;
* empty states;
* notification banners;
* tooltips apenas quando indispensáveis.

## Botões

Estilos:

1. solid;
2. outline;
3. text link;
4. editorial arrow.

Estados:

* normal;
* hover;
* focus-visible;
* active;
* disabled;
* loading.

Não exagerar nos cantos arredondados.

---

# 16. RESPONSIVIDADE

Desenvolver com abordagem mobile-first.

Testar visualmente e estruturalmente em:

* 320 px;
* 375 px;
* 430 px;
* 768 px;
* 1024 px;
* 1280 px;
* 1440 px;
* telas ultrawide.

Garantir:

* nenhum overflow horizontal;
* títulos sem cortes;
* botões clicáveis;
* menus funcionais;
* imagens corretas;
* grids adaptativos;
* áreas seguras;
* espaçamento consistente;
* conteúdo essencial sem depender de hover.

---

# 17. ACESSIBILIDADE

Buscar conformidade WCAG 2.2 AA.

Implementar:

* HTML semântico;
* landmarks;
* skip link;
* ordem correta de headings;
* labels;
* mensagens de erro associadas;
* contraste;
* foco visível;
* navegação por teclado;
* drawers e modais acessíveis;
* `aria-live` para carrinho;
* textos alternativos;
* botões com nomes acessíveis;
* `aria-expanded`;
* `aria-controls`;
* suporte a leitores de tela;
* respeito a `prefers-reduced-motion`;
* áreas de toque adequadas;
* não depender exclusivamente de cor.

Não adicionar ARIA redundante quando o HTML nativo já resolver.

---

# 18. PERFORMANCE

O tema precisa ser leve.

Aplicar:

* JavaScript vanilla;
* carregamento condicional por seção;
* CSS organizado;
* evitar arquivos gigantes;
* imagens Shopify responsivas;
* `image_url` e `image_tag`;
* `srcset`;
* dimensões explícitas;
* lazy loading abaixo da dobra;
* prioridade correta para a imagem principal;
* evitar CLS;
* evitar scripts bloqueantes;
* usar `defer`;
* evitar animações custosas;
* usar SVG para ícones;
* não carregar fontes e pesos desnecessários;
* não carregar scripts em páginas que não os utilizam.

Meta desejada:

* Lighthouse Performance acima de 85 em condições normais;
* Accessibility acima de 95;
* Best Practices acima de 95;
* SEO acima de 95.

Não sacrificar acessibilidade ou funcionalidade para atingir pontuação artificial.

---

# 19. SEO E DADOS ESTRUTURADOS

Implementar:

* title;
* meta description;
* canonical URL;
* Open Graph;
* Twitter cards;
* favicon;
* robots compatível com Shopify;
* JSON-LD;
* Product schema;
* Organization schema;
* Breadcrumb schema;
* Article schema;
* WebSite schema quando aplicável.

Usar dados reais do Liquid.

Não criar dados estruturados falsos.

---

# 20. INTERNACIONALIZAÇÃO

Criar:

* `locales/en.default.json`;
* `locales/pt-BR.json`.

Não inserir textos funcionais diretamente nos componentes quando eles puderem ser traduzidos.

Textos de campanha fornecidos nos presets podem permanecer editáveis no editor.

Garantir compatibilidade com:

* português brasileiro;
* inglês;
* moedas;
* mercados;
* idioma;
* localização.

---

# 21. ANIMAÇÕES

Usar movimentos discretos:

* fade;
* reveal;
* deslocamento suave;
* linhas atravessando;
* abertura inspirada em um portal;
* pequenas mudanças de escala;
* underline orgânico.

As animações devem:

* ser opcionais no Theme Editor;
* respeitar `prefers-reduced-motion`;
* não atrasar a interação;
* não causar layout shift;
* não esconder conteúdo essencial;
* permanecer suaves e editoriais.

---

# 22. CONTEÚDO PADRÃO

Usar textos iniciais coerentes com a LIMEN, mas deixar tudo editável.

Frases possíveis:

* Technology begins at the threshold.
* Technology should feel natural.
* Less interface. More interaction.
* Human by design.
* Built for touch.
* Calm technology.
* Objects that earn their place.
* Made to remain useful.
* Designed around people.
* Cross the threshold.
* A quieter way forward.
* Tools for thoughtful interaction.
* Precision does not require sterility.

Evitar lorem ipsum quando um texto de exemplo editorial for mais útil.

---

# 23. CÓDIGO E QUALIDADE

O código deve:

* ter nomes claros;
* ter comentários somente quando úteis;
* evitar duplicação;
* evitar CSS inline desnecessário;
* evitar JavaScript global;
* usar custom elements quando fizer sentido;
* funcionar sem erros no console;
* não usar código obsoleto;
* não conter segredos;
* não conter tokens;
* não depender de credenciais;
* não conter URLs locais;
* não depender de servidor externo.

Antes de concluir:

* valide todos os schemas;
* valide os JSON templates;
* valide o Liquid;
* procure links quebrados;
* procure referências a assets inexistentes;
* verifique classes duplicadas desnecessárias;
* remova código morto;
* verifique se o tema abre sem produtos;
* verifique se funciona com produtos reais;
* verifique estados vazios.

---

# 24. SHOPIFY CLI E THEME CHECK

Prepare o projeto para Shopify CLI.

Criar um `.gitignore` apropriado.

Não versionar:

* `.DS_Store`;
* arquivos temporários;
* dependências locais;
* credenciais;
* arquivos `.env`;
* artefatos de teste;
* configurações locais sensíveis.

Executar, quando as ferramentas estiverem disponíveis:

```bash
shopify theme check
```

Corrigir:

* erros Liquid;
* schemas inválidos;
* assets ausentes;
* traduções ausentes;
* problemas de performance;
* problemas de sintaxe.

Não ignorar erros sem justificativa.

---

# 25. DOCUMENTAÇÃO

Criar um `README.md` completo com:

## Visão geral

* descrição do tema;
* conceito visual;
* tecnologias;
* arquitetura.

## Pré-requisitos

* conta Shopify;
* development store ou loja;
* Shopify CLI;
* Git;
* GitHub.

## Desenvolvimento local

Documentar comandos como:

```bash
shopify theme dev --store nome-da-loja.myshopify.com
```

## Verificação

```bash
shopify theme check
```

## Envio manual opcional

```bash
shopify theme push
```

## GitHub

Explicar:

1. criar ou usar um repositório;
2. manter o tema na raiz;
3. fazer commit;
4. enviar para uma branch;
5. acessar Shopify Admin;
6. abrir Online Store → Themes;
7. conectar ao GitHub;
8. escolher repositório e branch;
9. testar como tema não publicado;
10. publicar somente depois da revisão.

## Personalização

Explicar:

* upload de logo;
* configuração das fontes;
* escolha das cores;
* menus;
* coleções;
* produtos;
* blog;
* redes sociais;
* homepage;
* templates.

## Assets pendentes

Criar uma checklist para:

* logo;
* símbolo;
* favicon;
* fotografias;
* ilustrações;
* vídeos;
* imagens de produto.

---

# 26. GIT

Criar commits lógicos, quando permitido pelo ambiente.

Sugestão:

```text
chore: initialize Shopify theme architecture
feat: add global design system and settings
feat: build editorial header and footer
feat: build LIMEN homepage sections
feat: build product and collection templates
feat: add cart and predictive search
feat: add editorial pages and journal
fix: improve accessibility and responsive behavior
docs: add setup and deployment guide
```

Não fazer push remoto sem autorização explícita.

---

# 27. PROCESSO DE EXECUÇÃO

Siga esta ordem:

## Etapa 1 — Auditoria

* examine o repositório;
* identifique o que já existe;
* apresente brevemente o plano;
* liste riscos ou dependências;
* preserve arquivos úteis.

## Etapa 2 — Fundação

* estrutura Shopify;
* layout;
* settings;
* tokens;
* tipografia;
* cores;
* CSS base;
* JavaScript base;
* locales.

## Etapa 3 — Estrutura global

* announcement bar;
* header;
* footer;
* section groups;
* drawer;
* pesquisa.

## Etapa 4 — Homepage

* hero;
* manifesto;
* princípios;
* coleção;
* produto;
* editorial;
* materiais;
* journal;
* newsletter;
* CTA final.

## Etapa 5 — Comércio

* produto;
* variantes;
* coleção;
* carrinho;
* pesquisa;
* recomendações.

## Etapa 6 — Conteúdo

* páginas;
* blog;
* artigo;
* contato;
* 404;
* password.

## Etapa 7 — Qualidade

* acessibilidade;
* responsividade;
* performance;
* SEO;
* traduções;
* Theme Check.

## Etapa 8 — Documentação

* README;
* checklist;
* instruções GitHub/Shopify.

Não pare depois de criar apenas a homepage. Entregue o tema completo.

---

# 28. CRITÉRIOS DE ACEITAÇÃO

O trabalho só está concluído quando:

* o repositório possui uma arquitetura Shopify válida;
* o tema pode ser conectado via GitHub;
* todos os templates essenciais existem;
* a homepage é totalmente configurável;
* produtos e coleções usam dados reais;
* variantes funcionam;
* o carrinho funciona;
* a pesquisa funciona;
* o tema é responsivo;
* o menu mobile funciona;
* o tema é navegável por teclado;
* não há erros importantes no console;
* não há Liquid ou JSON inválido;
* não há assets inexistentes;
* os textos funcionais estão traduzidos;
* há documentação completa;
* a identidade visual corresponde à LIMEN;
* a loja parece editorial, humana e premium;
* não parece um tema Shopify genérico.

---

# 29. RESULTADO FINAL

Ao terminar, apresente:

1. resumo do que foi criado;
2. árvore final de arquivos;
3. principais decisões técnicas;
4. seções disponíveis no Theme Editor;
5. comandos para testar localmente;
6. comandos de validação;
7. checklist de assets que ainda preciso fornecer;
8. limitações reais encontradas;
9. próximos passos para conectar ao GitHub e à Shopify.

Comece agora auditando o repositório e, em seguida, implemente o tema completo.
