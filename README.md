---

## Passo a passo para executar o projeto

### 1. **Clonar o repositório**

Abra o terminal e execute:

```bash
git clone [https://github.com/seu-usuario/marketing-growth-app.git](https://github.com/ludhill/PrevisibilidadeCalc.git)
```

Substitua o link pelo correto, se necessário.

### 2. **Instalar o TypeScript (caso não tenha)**

Verifique se o TypeScript está instalado:

```bash
tsc -v
```

Se não estiver, instale globalmente:

```bash
npm install -g typescript
```

### 3. **Verificar os arquivos do projeto**

Confirme que os arquivos estão organizados assim:

```
marketing-growth-app/
├── index.html
├── styles.css
├── calculator.ts
├── tsconfig.json
```

### 4. **Compilar o TypeScript**

Execute na pasta raiz do projeto:

```bash
tsc --watch
```

Isso criará o `calculator.js` automaticamente com base em `calculator.ts`.

### 5. **Executar o projeto com Live Server (ou outro servidor)**

Se estiver usando VS Code, instale a extensão **Live Server** e clique com o botão direito no `index.html` → "Open with Live Server".

Alternativamente, use um servidor HTTP simples:

```bash
npx serve .
```

Ou:

```bash
python -m http.server
```

### 6. **Usar a calculadora**

- Preencha os dados da empresa
- Clique em **Gerar Gráfico**
- Use os botões para **Salvar**, **Exportar** e **Imprimir**


---

Se quiser, posso incorporar essa seção direto no seu `README.md` final com versão em inglês ou em formato documentável. Também posso montar um guia em vídeo ou apresentação estática com imagens. Quer seguir por aí?
