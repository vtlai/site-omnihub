# Site OmniHub

Site institucional estático em português. HTML, CSS e JavaScript, com um gerador em Python sem dependências externas.

## Publicar no Cloudflare Pages

Em **Workers & Pages → Create application → Pages → Import an existing Git repository**, conectar `vtlai/site-omnihub`.

| Campo | Valor |
|---|---|
| Production branch | `main` |
| Framework preset | `None` |
| Root directory | deixar vazio (raiz do repositório) |
| Build command | `python3 src/publish.py` |
| Build output directory | `dist` |

Não são necessárias variáveis de ambiente ou instalação de pacotes. O build gera `dist/` apenas com páginas, estilos, scripts e imagens/fontes referenciadas. Documentação, templates, arquivos de origem dos logos e assets antigos não são publicados.

Após o primeiro deploy, testar a URL `*.pages.dev`. Para usar o domínio principal, adicionar `omnihub.site` em **Custom domains** no projeto Pages e seguir a configuração de DNS indicada pelo Cloudflare. O envio ao GitHub não altera o domínio automaticamente.

Referências oficiais: [HTML estático](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/), [configuração de build](https://developers.cloudflare.com/pages/configuration/build-configuration/), [domínios personalizados](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Desenvolvimento

Requer Python 3.9 ou superior.

```sh
python3 src/build.py
python3 -m http.server 4173 --bind 127.0.0.1
```

Abrir `http://127.0.0.1:4173`. Para testar exatamente o pacote de publicação:

```sh
python3 src/publish.py
python3 -m http.server 4174 --directory dist --bind 127.0.0.1
```

## Arquivos principais

- `src/home.html`: conteúdo e estrutura da home.
- `src/build.py`: páginas, cabeçalho, rodapé, SEO, FAQ e tabela de planos.
- `src/plans.json`: fonte dos valores e limites; gera o HTML e os dados usados na alternância mensal/anual.
- `src/deliveries.json` e `src/deliveries.html`: exemplos de integrações personalizadas entregues.
- `src/integrations.json`: catálogo de integrações.
- `assets/integracoes/sources.json`: origem dos arquivos de marca.
- `styles.css` e `app.js`: apresentação e interações.
- `src/publish.py`: gera o pacote limpo em `dist/`.

Depois de editar templates ou dados, executar novamente o build. O Cloudflare executa o build a cada publicação da branch conectada.

## Comportamentos

O vídeo carrega no próprio bloco após clique. Sem JavaScript, o link abre no YouTube. Carrosséis de clientes e integrações têm movimento automático contínuo, conforme a direção aprovada.

O pedido de personalização abre o WhatsApp comercial com texto para o visitante revisar e enviar. Não há backend de formulário ou envio automático. Valores anuais mostram o equivalente mensal e o total cobrado ao ano. Links de checkout usam o total do ciclo selecionado.

As integrações apresentadas incluem conexões da plataforma e entregas específicas para clientes. Novas solicitações dependem de análise técnica, escopo e condições dos serviços envolvidos. Não são alegadas parcerias oficiais ou aprovação automática de toda demanda.

## Rotas e SEO

Rotas: `/`, `/planos/`, `/sobre/`, `/condicoes/`, `/obrigado/` e `404.html`. `_redirects` normaliza URLs antigas sem barra final. A página 404 evita o fallback automático de SPA do Cloudflare Pages.

Canonical, sitemap e Open Graph apontam para `https://omnihub.site`. Search Console preservado. `/obrigado/` e a página 404 usam `noindex`; o retorno do checkout não afirma pagamento confirmado. A imagem social é `assets/social.png`.

Nenhuma compra foi efetuada nos testes. A conexão com Cloudflare e a configuração final do domínio são etapas externas ao build deste repositório.
