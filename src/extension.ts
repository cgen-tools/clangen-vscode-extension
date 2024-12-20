import * as vscode from 'vscode';
import path from 'path';
import { getLocation } from 'jsonc-parser';

function createPatrolArtMarkdownString(patrolArtName: string, folder: vscode.WorkspaceFolder|undefined): vscode.MarkdownString {
  if (folder) {
    const imgPath = path.join(folder.uri.fsPath, 'resources', 'images', 'patrol_art', `${patrolArtName}.png`);
    return new vscode.MarkdownString(`![patrol image](${imgPath})`);
  }
  return new vscode.MarkdownString('');
}

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

  const patrolArtHoverProvider = vscode.languages.registerHoverProvider('json', {
      provideHover(document, position, token) {
        if (token.isCancellationRequested) {
          return;
        }

        const location = getLocation(document.getText(), document.offsetAt(position));
        const property = location.path.pop();
        if (property === 'patrol_art' || property === 'patrol_art_clean' || property === 'art') {
          const wordRange = document.getWordRangeAtPosition(position);
          const patrolArtWord = document.getText(wordRange);

          if (patrolArtNames.includes(patrolArtWord)) {
            return new vscode.Hover(createPatrolArtMarkdownString(patrolArtWord, folder), wordRange);
          }
        }
        return undefined;
      },
  });

  const patrolArtAutocompleteProvider = vscode.languages.registerCompletionItemProvider('json', {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
      if (token.isCancellationRequested) {
        return;
      }

      const location = getLocation(document.getText(), document.offsetAt(position));
      const property = location.path.pop();
      if (property === 'patrol_art' || property === 'patrol_art_clean' || property === 'art') {
        return patrolArtNames.map((value) => new vscode.CompletionItem(value), vscode.CompletionItemKind.Value);
      }
      return undefined;
    },

    resolveCompletionItem(item, token) {
      if (token.isCancellationRequested) {
        return;
      }

      item.documentation = createPatrolArtMarkdownString(item.label.toString(), folder);
      return item;
    }
  }, '"');

  context.subscriptions.push(patrolArtAutocompleteProvider, patrolArtHoverProvider);

}

// This method is called when your extension is deactivated
export function deactivate() {}
