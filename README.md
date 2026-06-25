# LIMEN — Tema Shopify

Tema **nativo Online Store 2.0** para a marca **LIMEN**, construído em Liquid, JSON,
CSS moderno (custom properties) e JavaScript vanilla com Custom Elements. Sem React,
Vue, Hydrogen, headless, jQuery ou build obrigatório — o repositório é o tema, na raiz,
pronto para ser conectado à Shopify via GitHub.

---

## 1. Visão geral

### Conceito visual

LIMEN vem do latim — **limiar, passagem, portal, a fronteira entre dois estados**. O tema
traduz isso numa estética **editorial, calma, quente e tátil**: tecnologia humanizada
apresentada como uma revista independente de design industrial, não como uma landing page
de SaaS.

A decisão tipográfica é deliberada e diferencia a marca de referências do setor:

- **Instrument Serif** (com ênfases em itálico/terracota) governa o **display** — H1, H2,
  manifestos, citações e frases de campanha. Onde uma marca de tecnologia típica usaria uma
  sans geométrica bold, a LIMEN usa serifa de alto contraste.
- **IBM Plex Sans** governa a **UI** — navegação, preços, especificações, formulários,
  filtros, carrinho, metadados e corpo de texto.

A paleta usa **terracota como acento** sobre **beges minerais quentes**; sage, rosa e lilás
aparecem apenas em blocos de campanha. Detalhes gráficos (moldura/portal, hairlines, textura
de papel) são feitos em CSS/SVG, evitando imagens raster.

### Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Templating | Liquid + objetos nativos da Shopify |
| Estrutura | Online Store 2.0 (templates JSON, sections, blocks, section groups, snippets) |
| Estilo | CSS moderno com custom properties; escala tipográfica responsiva via `clamp()` |
| Comportamento | JavaScript vanilla modular com **Custom Elements**, carregamento condicional, `defer` |
| Fontes | Google Fonts (Instrument Serif) + `font_picker` da Shopify (IBM Plex Sans), `font-display: swap` |
| i18n | `locales/en.default.json` (padrão) + `locales/pt-BR.json` |
| Dados | 100% reais da Shopify (produtos, coleções, blog, menus); placeholders só no editor |

### Arquitetura

- **Tokens de design** em `:root` (gerados a partir de `settings_data`/`settings_schema`),
  editáveis no Theme Editor: tipografia, cores, largura máxima, raio, estilo de botão.
- **8 color schemes nativos** reutilizáveis por seção (ver §4 abaixo).
- **Custom Elements** encapsulam comportamento por seção em vez de JS global:
  `<limen-header>`, `<limen-drawer>`, `<cart-items>`, `<predictive-search>`,
  `<product-media-gallery>`, `<variant-radios>`, `<quantity-input>`,
  `<product-recommendations>` e `<share-button>` (inline no artigo).
- **Carregamento condicional**: cada section injeta apenas o JS/CSS que usa
  (`product.js`, `cart-drawer.js`, `facets.js`, `predictive-search.js`, `header.js`),
  todos com `defer`.

---

## 2. Pré-requisitos

- **Conta Shopify** com uma loja (ou **development store** gratuita via Shopify Partners).
- **Shopify CLI** — `npm install -g @shopify/cli` (ou rodar via `npx @shopify/cli …`).
- **Node.js** (para a CLI e para o validador de estrutura do projeto).
- **Git** e uma conta no **GitHub** (para o fluxo de conexão nativo Shopify ↔ GitHub).

---

## 3. Desenvolvimento local

Pré-visualização ao vivo com hot reload, conectada à sua loja:

```bash
shopify theme dev --store sua-loja.myshopify.com
```

A CLI gera uma URL de preview local e sincroniza alterações de arquivos em tempo real.
Os dados (produtos, coleções, blog) vêm da loja conectada — o tema **não** contém produtos
fictícios.

---

## 4. Verificação e validação

### Shopify Theme Check

```bash
npx @shopify/cli theme check
```

Configurado em `.theme-check.yml` (`extends: theme-check:recommended`). **Estado atual:
75 arquivos inspecionados, 0 offenses.**

> **Sobre os avisos de Google Fonts (`RemoteAsset`):** Instrument Serif e Source Serif 4 não
> existem na biblioteca de fontes hospedadas da Shopify, então são carregadas via Google Fonts.
> Os trechos de `<link>` em `layout/theme.liquid` e `layout/password.liquid` estão entre
> `{% # theme-check-disable RemoteAsset %}` … `{% # theme-check-enable RemoteAsset %}`, com
> comentário justificando a exceção. Nenhum outro check é suprimido. O carregamento é otimizado
> (`preconnect`, `media="print" onload` para não bloquear o render, `<noscript>` de fallback,
> `font-display: swap`).

### Validador de estrutura (Node)

Durante o desenvolvimento usamos um script Node auxiliar que verifica, sem depender da CLI:

- `JSON.parse` de todos os `.json` (templates, config, locales, section groups);
- referências `asset_url` que apontam para arquivos inexistentes em `assets/`;
- `url()` em CSS apontando para assets ausentes;
- snippets referenciados por `render`/`include` que não existem;
- balanço de tags Liquid (removendo `{% comment %}`/`{% # … %}`/`{% raw %}` antes);
- um único `{% schema %}` por section;
- templates e section groups referenciando tipos de section existentes;
- **paridade profunda EN ↔ PT-BR** dos locales.

**Estado atual: 0 erros; 184/184 chaves de locale em paridade (0 faltando, 0 extra).**

### Envio manual (opcional)

Para empurrar o tema diretamente sem GitHub (ex.: testes rápidos numa loja de desenvolvimento):

```bash
shopify theme push                 # cria/atualiza um tema na loja
shopify theme push --unpublished   # envia como tema NÃO publicado (recomendado para revisão)
```

> O fluxo recomendado para produção é via GitHub (§6), não `push` manual.

---

## 5. Estrutura de pastas

```text
.
├── assets/                       # CSS, JS e SVGs (15 arquivos)
│   ├── base.css                  # tokens, tipografia, grid, espaçamento (clamp)
│   ├── components.css            # botões, inputs, cards, badges, quantity, cart-item
│   ├── sections.css              # estilos específicos de seções editoriais/conteúdo
│   ├── animations.css            # fades/reveals discretos (respeitam reduced-motion)
│   ├── theme.js                  # utilidades base + registry de custom elements
│   ├── header.js                 # <limen-header> (sticky/scroll) + <limen-drawer> (menu mobile)
│   ├── product.js                # <product-media-gallery>, <variant-radios>, <quantity-input>, <product-recommendations>
│   ├── cart-drawer.js            # <cart-items> (carrinho AJAX, aria-live)
│   ├── facets.js                 # filtros/ordenação AJAX de coleção e busca
│   ├── predictive-search.js      # <predictive-search>
│   ├── icon-*.svg                # ícones (arrow-right, caret, check)
│   ├── limen-symbol.svg          # símbolo-portal placeholder (substituível por upload)
│   └── paper-texture.svg         # textura discreta de papel
├── blocks/                       # theme blocks reutilizáveis (@theme)
│   ├── text.liquid · button.liquid · image.liquid · accordion-item.liquid
├── config/
│   ├── settings_schema.json      # configurações globais + grupo de 8 color schemes
│   └── settings_data.json        # valores atuais + preset "LIMEN"
├── layout/
│   ├── theme.liquid              # layout principal (fontes, schemes, JSON-LD, meta)
│   └── password.liquid           # layout da página de senha (loja fechada)
├── locales/
│   ├── en.default.json           # inglês (padrão) — 184 chaves
│   └── pt-BR.json                # português do Brasil — 184 chaves (paridade total)
├── section-groups/
│   ├── header-group.json         # announcement-bar + header
│   └── footer-group.json         # footer
├── sections/                     # 31 sections (ver §7)
├── snippets/                     # 19 snippets reutilizáveis
├── templates/                    # 13 templates JSON (ver §7)
├── .theme-check.yml              # configuração do Theme Check
├── .gitignore
├── LIMEN_SHOPIFY_SPEC.md         # especificação (fonte de verdade — não é arquivo de tema)
├── img-ref/                      # referências visuais privadas (NÃO publicadas no tema)
├── README.md                     # este arquivo
└── CHECKLIST.md                  # critérios de aceitação + assets pendentes
```

> **Adaptação à spec §7:** o CSS previsto como `product.css`/`cart.css` foi consolidado em
> `components.css` + `sections.css` para reduzir requisições; toda a funcionalidade prevista
> está presente. `img-ref/` e `LIMEN_SHOPIFY_SPEC.md` são ignorados pelo Theme Check e não
> fazem parte do tema renderizado.

---

## 6. Fluxo GitHub → Shopify

O tema foi feito para a **integração nativa de temas via GitHub** da Shopify. Passo a passo:

1. **Crie ou use um repositório** no GitHub para este tema.
2. **Mantenha o tema na raiz** do repositório (NÃO mova os arquivos para uma subpasta como
   `/theme` — a integração precisa encontrar `layout/`, `sections/`, `config/` etc. na raiz da
   branch conectada).
3. **Faça commits** lógicos do código (ver sugestão de mensagens na spec §26).
4. **Envie para uma branch** (ex.: `main` ou uma branch de release).
5. No **Shopify Admin**, vá em **Online Store → Themes**.
6. Em **Add theme → Connect from GitHub**, **conecte sua conta do GitHub** e autorize.
7. **Escolha o repositório e a branch** que contêm o tema.
8. A Shopify importa o tema e passa a sincronizar commits dessa branch automaticamente.
9. **Teste como tema NÃO publicado**: use **Preview** e **Customize** (Theme Editor) antes de ir ao ar.
10. **Publique somente após a revisão** completa (conteúdo, dados reais, responsivo, a11y).

> Cada commit na branch conectada atualiza o tema na Shopify. Edições feitas no Theme Editor
> são gravadas de volta como commits nessa branch — evite editar o mesmo arquivo nos dois lados
> simultaneamente.

---

## 7. Sections disponíveis e templates

### Globais (em section groups / renderizadas globalmente)

| Section | Papel |
| --- | --- |
| Announcement bar | Faixa de avisos no topo (header group) |
| Header | Cabeçalho editorial: logo, menu, busca, conta, carrinho; sticky + transparência opcional |
| Footer | Rodapé: logo, menus, newsletter, redes sociais, políticas, pagamento, idioma/país |
| Cart drawer | Carrinho lateral AJAX (aria-live, focus-trap, Escape, reduced-motion) |
| Predictive search | Resultados de busca em tempo real (produtos/artigos/páginas) |

### Homepage — seções editoriais (presets, adicionáveis e reordenáveis)

| Section | Papel |
| --- | --- |
| Hero editorial | Hero tipográfico assimétrico; itálico, símbolo, imagem/vídeo opcionais, altura configurável |
| Manifesto editorial | Composição de revista: serifa grande + nota lateral em sans |
| Brand principles | Princípios da marca em grid/lista numerada (blocos: número, título, descrição) |
| Featured collection | Coleção real em grid editorial com hover/segunda imagem opcional |
| Featured product | Produto real em destaque (preço, variantes, add-to-cart, link) |
| Editorial story | História da marca em layouts alternáveis (texto, duas colunas, imagem+texto, citação) |
| Materials & craft | Materiais/processo em blocos numerados (material, etapa, imagem, nota, diagrama) |
| Image + text | Bloco editorial imagem + texto configurável |
| Image collage | Composição de imagens |
| Text marquee | Faixa tipográfica em movimento (respeita reduced-motion) |
| Quote editorial | Citação em destaque |
| Journal | Artigos reais de um blog selecionado (estética de revista) |
| Newsletter editorial | Cadastro via formulário nativo da Shopify (sucesso/erro, consentimento) |
| Final threshold CTA | CTA final tipográfico ("Cross the threshold.") |

### Comércio (sections de template)

| Section | Template | Papel |
| --- | --- | --- |
| Product | `product` | Galeria + zoom, variant picker, preço/URL/imagem/estoque, blocks editáveis, recomendações |
| Collection | `collection` | Facets/ordenação/paginação nativos + drawer de filtros no mobile |
| Cart | `cart` | Página de carrinho (atualização, remoção, subtotal, nota, checkout nativo) |
| Search | `search` | Página de busca (produtos/artigos/páginas, estados vazios, predictive) |
| Product recommendations | (em `product`) | Recomendações nativas da Shopify |

### Conteúdo (sections de template)

| Section | Template | Papel |
| --- | --- | --- |
| Page | `page` | Página padrão com título + RTE + theme blocks (`text/button/image/accordion-item`) |
| Contact form | `page.contact` | Formulário nativo `{% form 'contact' %}` + dados de marca/social |
| Blog posts | `blog` | Lead em destaque + filtro por tag + paginação |
| Blog post | `article` | Largura de leitura, share, comentários nativos, relacionados, JSON-LD BlogPosting |
| List collections | `list-collections` | Lista/índice de coleções reais |
| 404 page | `404` | Página de erro com moldura-portal + busca |
| Password | `password` | Loja fechada: formulário nativo de senha + teaser de newsletter |

### Templates JSON (13)

`index` · `product` · `collection` · `list-collections` · `cart` · `page` · `page.about`
(reutiliza seções editoriais da home) · `page.contact` · `blog` · `article` · `search` · `404`
· `password`.

---

## 8. Personalização no Theme Editor

Tudo abaixo é editável em **Online Store → Themes → Customize**.

### Marca e logos (configurações globais → *Logo & brand*)

- **Logo (primary)** — logotipo principal (SVG/PNG transparente recomendado).
- **Logo (inverse/negative)** — versão clara para header transparente sobre hero escuro.
- **Symbol only** — símbolo-portal isolado (usado em favicon/divisores/transições).
- **Favicon** — recomendado 32×32 px.
- **Largura do logo** — desktop e mobile (ranges independentes).
- Se nenhum logo for enviado, o tema usa o símbolo + wordmark "LIMEN" placeholder.

### Tipografia (*Typography*)

- **Heading font** — Instrument Serif (padrão) ou Source Serif 4.
- **Body font** — `font_picker` da Shopify (padrão IBM Plex Sans).
- **Escala** de títulos e corpo, **tracking** de rótulos, **ênfase em itálico** nos títulos.

### Cores e os 8 color schemes (*Colors*)

Grupo de color schemes nativo, reutilizável por seção. Esquemas embutidos:

| Scheme | Uso típico |
| --- | --- |
| **Ivory** | Padrão claro (fundo ivory cream, texto slate ink, acento terracota) |
| **Warm White** | Variante creme mais quente |
| **Terracotta** | Bloco de campanha em terracota |
| **Sage** | Bloco de campanha em sálvia |
| **Lilac** | Bloco de campanha em lilás |
| **Warm Beige** | Bloco editorial bege mineral |
| **Dark** | Áreas escuras (slate ink) — usado no header transparente sobre hero |
| **Pure White** | Branco puro / preto (alto contraste) |

Cada scheme define fundo, texto, acento, acento secundário, botões e linhas. Há também
controle global de **opacidade de hairlines/divisores**.

### Layout e botões

- **Largura máxima** da página, **espaçamento entre seções**, **margem lateral**, **raio global**.
- **Estilo de botão** (solid/outline), **raio do botão**, **labels em maiúsculas** (on/off).

### Menus, coleções, produtos, blog/journal

- **Menus** — header e footer usam linklists nativas (configure em *Navigation*).
- **Featured collection / Featured product** — selecione coleção/produto reais por seção.
- **Journal** — selecione um blog real; cada card mostra imagem, título, data, resumo, tag.

### Redes sociais e contato (configurações globais)

- **Social media** — Instagram, TikTok, YouTube, LinkedIn, X/Twitter, Pinterest.
- **Contact info** — e-mail, telefone, endereço (usados no rodapé e na página de contato).
- **Social sharing image** — imagem Open Graph padrão (recomendado 1200×630 px).

### Homepage

`templates/index.json` é composto por seções editoriais **reordenáveis e removíveis** no editor.
Cada seção traz presets com textos de campanha da LIMEN — todos editáveis.

### Carrinho, busca, breadcrumbs, animações e acessibilidade

- **Cart** — tipo (drawer/page), nota do pedido, barra de frete grátis + limite.
- **Search** — ligar/desligar busca preditiva e quais resultados exibir.
- **Breadcrumbs** — exibir em páginas internas (também alimenta o JSON-LD BreadcrumbList).
- **Product card** — proporção da imagem, vendor, badges, quick add.
- **Animations** — ligar/desligar entradas, estilo de reveal (fade / fade-up / threshold),
  troca de imagem no hover. Sempre respeitam `prefers-reduced-motion`.
- **Accessibility** — opção de sempre exibir contornos de foco (não desativa recursos essenciais).

---

## 9. Checklist de assets pendentes (a fornecer pelo usuário)

O tema funciona com placeholders configuráveis. Para produção, providencie:

- [ ] **Logo principal** (SVG/PNG transparente)
- [ ] **Logo horizontal** (se diferente do principal)
- [ ] **Logo negativo/claro** (para fundos escuros / header transparente)
- [ ] **Símbolo isolado** da LIMEN (portal/limiar)
- [ ] **Favicon** (32×32 px, quadrado)
- [ ] **Fotografias de produto** (reais, otimizadas para web)
- [ ] **Fotografias lifestyle** (hero, editorial, material/craft)
- [ ] **Ilustrações / diagramas técnicos** (manifesto, materiais & craft)
- [ ] **Vídeos** (hero e/ou processo/craft, hospedados na Shopify)
- [ ] **Imagem de compartilhamento (Open Graph)** padrão — 1200×630 px

Enquanto não forem enviados, o tema exibe placeholders elegantes apenas no Theme Editor —
nada fictício é renderizado na loja ao vivo.

---

## 10. Limitações conhecidas

- **Lighthouse / Web Vitals** só são mensuráveis numa loja real com conteúdo real (produtos,
  imagens, fontes carregadas). O tema foi construído para as metas da spec §18 (Performance ≥ 85,
  Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95), mas a pontuação final depende dos assets e
  do catálogo do usuário.
- **Fontes não self-hosted**: Instrument Serif / Source Serif 4 não estão na biblioteca de fontes
  da Shopify, então são carregadas do Google Fonts (com `preconnect` e carregamento não bloqueante).
  Por isso o aviso `RemoteAsset` do Theme Check é suprimido pontualmente, com justificativa inline.
- **`shopify theme dev`/preview real** exige a CLI e uma loja Shopify do usuário (fora deste
  ambiente de desenvolvimento). O tema é entregue pronto, com as instruções acima.
- **Override de cor de erro**: o token `--color-error` tem uma variante mais clara para o scheme
  `Dark` embutido, garantindo contraste AA do texto de erro tanto em fundos claros quanto escuros.

---

## 11. Próximos passos para ir ao ar

1. Reunir os assets da §9 (logos, favicon, fotos, vídeos).
2. Subir o repositório ao GitHub (ver §6) — **sem push/publicação sem revisão**.
3. Conectar a branch ao tema na Shopify e importar como tema **não publicado**.
4. No Theme Editor: enviar logos/favicon, selecionar coleção/produto/blog em destaque,
   configurar menus, redes sociais e contato, ajustar color schemes.
5. Rodar `npx @shopify/cli theme check` (0 offenses) e revisar em desktop e mobile.
6. **Publicar somente após a revisão final.**

---

Critérios de aceitação detalhados (spec §28) e o checklist de assets: ver **[CHECKLIST.md](CHECKLIST.md)**.
