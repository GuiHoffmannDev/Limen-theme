# LIMEN — Checklist de aceitação

Mapeamento dos **critérios de aceitação da spec §28** ao estado real do tema.
Validado com `npx @shopify/cli theme check` (**75 arquivos, 0 offenses**) e com o
validador de estrutura Node (**0 erros; 184/184 chaves de locale em paridade**).

## Critérios de aceitação (spec §28)

| # | Critério | Status | Evidência |
| --- | --- | :---: | --- |
| 1 | Arquitetura Shopify válida | ✅ | OS 2.0: `layout/`, `templates/*.json`, `sections/` (31), `blocks/` (4), `snippets/` (19), `section-groups/` (2), `config/`. Theme Check 0 offenses. |
| 2 | Conectável via GitHub | ✅ | Tema na **raiz** do repositório; sem subpasta `/theme`. Fluxo documentado no README §6. |
| 3 | Todos os templates essenciais existem | ✅ | 13 templates: index, product, collection, list-collections, cart, page, page.about, page.contact, blog, article, search, 404, password. |
| 4 | Homepage totalmente configurável | ✅ | `templates/index.json` com 14 seções editoriais com presets, reordenáveis/removíveis no editor. |
| 5 | Produtos e coleções usam dados reais | ✅ | Featured collection/product e grids usam objetos nativos; nenhum produto fictício no código; placeholders só no editor. |
| 6 | Variantes funcionam | ✅ | `<variant-radios>` (product.js): atualiza preço, URL, imagem, SKU, disponibilidade; combinações indisponíveis tratadas. |
| 7 | Carrinho funciona | ✅ | Cart drawer AJAX (`<cart-items>`) + página `cart`; subtotal, quantidade, remoção, nota, checkout nativo. |
| 8 | Busca funciona | ✅ | Página `search` + busca preditiva (`<predictive-search>`); produtos/artigos/páginas, estados vazios. |
| 9 | Responsivo | ✅ | Mobile-first com `clamp()` e grids adaptativos; revisado de 320px a ultrawide, sem overflow horizontal. |
| 10 | Menu mobile funciona | ✅ | `<limen-drawer>`: painel lateral com focus-trap, scroll-lock, fechar com Escape, submenu acessível. |
| 11 | Navegável por teclado | ✅ | Skip link, foco visível, `aria-expanded`/`aria-controls`, drawers/modais com foco preso, ordem lógica. |
| 12 | Sem erros importantes no console | ✅ | JS vanilla com feature-detection; custom elements guardados; nenhum framework/erro de runtime. |
| 13 | Sem Liquid ou JSON inválido | ✅ | Theme Check 0 offenses; validador Node faz JSON.parse de todos os `.json` e balanço de tags Liquid. |
| 14 | Sem assets inexistentes | ✅ | Validador checa `asset_url`, `url()` em CSS e `render`/`include`; todas as referências resolvem. |
| 15 | Textos funcionais traduzidos | ✅ | `en.default.json` + `pt-BR.json`, **184/184 chaves** em paridade profunda; campanha como settings editáveis. |
| 16 | Documentação completa | ✅ | `README.md` (visão, pré-requisitos, dev local, validação, GitHub→Shopify, personalização, assets, limitações) + este arquivo. |
| 17 | Identidade visual corresponde à LIMEN | ✅ | Conceito "limiar/portal": Instrument Serif no display, terracota sobre beges minerais, símbolo-portal, hairlines, textura. |
| 18 | Parece editorial, humana e premium (não genérica) | ✅ | Inversão tipográfica deliberada (serifa no display), espaço negativo, ritmo de revista; sem cards/sombras/neon genéricos. |

## Resumo das validações

| Verificação | Comando | Resultado |
| --- | --- | --- |
| Shopify Theme Check | `npx @shopify/cli theme check` | 75 arquivos, **0 offenses** |
| Estrutura (Node) | script de validação do projeto | **0 erros** |
| Paridade de locales | (incluída no validador) | **184/184** chaves, 0 faltando, 0 extra |

## Assets pendentes do usuário

Ver **[README.md §9](README.md#9-checklist-de-assets-pendentes-a-fornecer-pelo-usuário)**:
logo principal/horizontal/negativo, símbolo isolado, favicon, fotografias de produto/lifestyle,
ilustrações/diagramas, vídeos de hero/craft e imagem Open Graph. Até lá, placeholders
configuráveis no Theme Editor — nada fictício na loja ao vivo.
