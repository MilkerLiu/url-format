import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  {
    let disposable = vscode.commands.registerCommand("url.format", () => {
      check().then(({ editor, text }) => {
        editor.edit((builder) => {
          builder.insert(
            editor.selection.end,
            `\n${JSON.stringify(formatUrl(text), null, 4)}`
          );
        });
      });
    });
    context.subscriptions.push(disposable);
  }
  
  {
    let disposable = vscode.commands.registerCommand("url.generate", () => {
      check().then(({ editor, text }) => {
        editor.edit((builder) => {
          builder.insert(
            editor.selection.end,
            `\n${generateUrl(text)}`
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

function formatUrl(text: string): any {
  const url = new URL(text);
  const searchs: Record<string, any> = {};
  for (const [key, value] of url.searchParams) {
    var res = value;
    if (isURI(value)) {
      res = formatUrl(value);
    }
    searchs[key] = res;
  }
  return {
    main: `${url.protocol}//${url.host}${url.pathname}`,
    params: searchs,
    hash: url.hash,
  };
}

function generateUrl(text: string) {
  function check(item: any) {
    let { main, params, hash } = item;
    if (main === undefined) {
      return false;
    }
    if (params != undefined && typeof params != "object") {
      return false;
    }
    if (hash != undefined && typeof hash != "string") {
      return false;
    }
    return true;
  }

  function merge(item: any): string {
    if (!check(item)) {
      return "";
    }
    let { main, params, hash } = item;
    let url = new URL(main);
    if (params != undefined) {
      for (const [key, value] of Object.entries(params)) {
        let _v = typeof value == "object" ? merge(value) : value;
        url.searchParams.set(key, _v as string);
      }
    }
    if (hash != undefined) {
      url.hash = hash;
    }
    return url.toString();
  }

  let json = JSON.parse(text);
  return merge(json);
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
