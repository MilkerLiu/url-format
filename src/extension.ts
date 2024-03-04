import * as vscode from "vscode";

const tab = "    ";

export function activate(context: vscode.ExtensionContext) {
  {
    let disposable = vscode.commands.registerCommand("url.format", () => {
      check().then(({ editor, text }) => {
        editor.edit((builder) => {
          builder.insert(
            editor.selection.end,
            `\n${JSON.stringify(formatUrl(text, ""), null, 4)}`
          );
        });
      });
    });
    context.subscriptions.push(disposable);
  }

  {
    let disposable = vscode.commands.registerCommand("url.encode", () => {
      check().then(({ editor, text }) => {
        const res = urlEncode(text);
        editor.edit((builder) => {
          builder.replace(editor.selection, res);
        });
      });
    });
    context.subscriptions.push(disposable);
  }

  {
    let disposable = vscode.commands.registerCommand("url.decode", () => {
      check().then(({ editor, text }) => {
        const res = urlDecode(text);
        editor.edit((builder) => {
          builder.replace(editor.selection, res);
        });
      });
    });
    context.subscriptions.push(disposable);
  }
}

function check(): Promise<{
  editor: vscode.TextEditor;
  text: string;
}> {
  return new Promise((resolve, reject) => {
    const editor = vscode.window.activeTextEditor;
    if (editor === undefined) {
      reject();
      return;
    }
    const text = editor.document.getText(editor.selection);
    if (text === undefined || text.length == 0) {
      reject();
      return;
    }
    resolve({ editor, text });
  });
}

function formatUrl(text: string, ident: string): any {
  ident += tab;
  const url = new URL(text);
  const searchs: Record<string, any> = {};
  for (const [key, value] of url.searchParams) {
    var res = value;
    if (isURI(value)) {
      res = formatUrl(value, ident);
    }
    searchs[key] = res;
  }
  return {
    main: `${url.protocol}//${url.host}${url.pathname}`,
    params: searchs,
    hash: url.hash,
  };
}

function urlEncode(str: string) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
}

function urlDecode(str: string) {
  return decodeURIComponent(str);
}

function isURI(str: string) {
  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
}

export function deactivate() {}
