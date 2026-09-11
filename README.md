# Site — Lorena Aquino, psicóloga

Prévia conceitual criada pela [Norman.dgt](https://github.com/hNNrq) e apresentada
a Lorena Aquino (psicóloga clínica, TCC, CRP 04/56533 — Belo Horizonte).
Enquanto não for aprovada por ela, a página carrega a assinatura "Prévia ·
Norman.dgt" no topo e não é o site oficial da profissional.

## Arquivos

| Arquivo | O que é |
|---|---|
| `_template.html` | **O fonte. É esse que se edita.** Usa os marcadores `__FOTO_HERO__`, `__FOTO_SOBRE__` e `__WA__` |
| `montar.js` | Gera o `index.html` substituindo os marcadores e embutindo as fotos em base64 |
| `index.html` | Gerado. Não editar na mão — a edição se perde no próximo build |
| `assets/` | Fotos originais |

## Build

```bash
node montar.js
```

Sem dependência: usa só o `fs` do Node.

As fotos vão inline em base64 porque a primeira versão rodou como Artifact do
Claude, que bloqueia imagem externa. Em hospedagem normal (Netlify, Vercel,
Pages) dá pra apontar pro `assets/` e derrubar o HTML de ~420 KB pra ~40 KB.
