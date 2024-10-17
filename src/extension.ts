import * as vscode from 'vscode';
import path from 'path';

export async function activate(context: vscode.ExtensionContext) {
  const PATROL_GLOB = 'resources/images/patrol_art/*.png';
  const folder = vscode.workspace.workspaceFolders?.[0];

  var patrolArtPaths: vscode.Uri[] = [];
  var patrolArtNames: string[] = [];

  if (folder) {
    const p = new vscode.RelativePattern(folder, PATROL_GLOB);
    patrolArtPaths = await vscode.workspace.findFiles(p);
    patrolArtNames = patrolArtPaths.map((value) => path.parse(value.fsPath).name);
  }

  console.log(patrolArtNames);

  const patrol_art_autocomplete_provider = vscode.languages.registerCompletionItemProvider('json', {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
      return patrolArtNames.map((value) => new vscode.CompletionItem(value), vscode.CompletionItemKind.Value);
    }
  });

  context.subscriptions.push(patrol_art_autocomplete_provider);

}

// This method is called when your extension is deactivated
export function deactivate() {}
