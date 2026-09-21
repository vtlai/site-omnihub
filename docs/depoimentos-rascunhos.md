# Modelos para coletar depoimentos

Rascunhos de estrutura, não declarações de clientes. Nenhum texto abaixo foi dito ou aprovado por uma empresa. Não atribuir a marcas, pessoas ou cargos antes da validação. Este arquivo não integra o build publicado.

## Atendimento

“Antes, nossa equipe [descrever a dificuldade real]. Com a OmniHub, passamos a [mudança confirmada na rotina]. Hoje, [benefício observado pelo cliente].”

## Personalização

“Precisávamos de [necessidade específica]. A equipe da OmniHub desenvolveu [entrega efetivamente utilizada]. Isso nos permite [resultado confirmado, sem estimativas inventadas].”

## Integrações

“Usávamos [sistema] para [atividade] e precisávamos [problema real]. Com a integração, conseguimos [ação que o cliente executa hoje] dentro da OmniHub.”

## Informações a preencher em cada relato

- Nome e cargo da pessoa que confirmou o texto.
- Empresa e autorização de uso do nome ou logo.
- Texto revisado e aprovado pelo cliente.
- Se houver número: valor, período, forma de medição e autorização de publicação.
- Data e registro da autorização.

## Perguntas para a conversa

1. O que era difícil na rotina antes da OmniHub?
2. O que mudou de fato e como vocês usam isso hoje?
3. Qual exemplo concreto você daria a outra empresa?
4. Podemos publicar sua resposta, com seu nome, cargo e empresa?

## Componente do site

O carrossel está preparado em `src/testimonials.py`. A lista `src/testimonials.json` contém os dez relatos fornecidos por Eduardo e confirmados por ele como relatos reais de clientes, formatados com auxílio de IA. Foram preservados os nomes, cargos e textos enviados; nenhuma empresa foi acrescentada. Quando a lista de relatos aprovados estiver vazia, a seção não aparece na publicação. Adicione somente relatos reais autorizados com os campos `name`, `role`, `company`, `quote` e `approved: true`. O build escapa o texto e gera o carrossel automaticamente. Os exemplos fictícios da prévia local não fazem parte dessa lista.
