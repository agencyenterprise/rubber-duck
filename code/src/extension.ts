'use strict'

import * as vscode from 'vscode'
import * as path from 'path'

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.rubberDuck', () => {
    const panel = vscode.window.createWebviewPanel('rubberDuck', 'Rubber duck', vscode.ViewColumn.One, {
      enableScripts: true,
    })

    const onDiskQuackImage = vscode.Uri.file(path.join(context.extensionPath, 'src', 'images', 'quack.png'))
    const quackImage = onDiskQuackImage.with({ scheme: 'vscode-resource' }).path

    const onDiskScript = vscode.Uri.file(path.join(context.extensionPath, 'src', 'quack.js'))
    const script = onDiskScript.with({ scheme: 'vscode-resource' }).path

    const onDiskStyle = vscode.Uri.file(path.join(context.extensionPath, 'src', 'quack.css'))
    const style = onDiskStyle.with({ scheme: 'vscode-resource' }).path

    panel.webview.html = getWebviewContent({ quackImage, script, style })
  })

  context.subscriptions.push(disposable)
}

function getWebviewContent({ quackImage, script, style }) {
  return `<!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Rubber Duck</title>

      <link rel="stylesheet" href="vscode-resource://${style}">

      <script type="text/javascript" src="vscode-resource://${script}"></script>
  </head>

  <body>
      <div class="content">
          <div class="step step-1 vertical-center" style="display: block">
              <h1>Ask me a question!</h1>

              <p>You'll need to explain your problem.</p>

              <p>Do you have a microphone?</p>

              <button value="true">Yes</button>
              <button value="false">No</button>
          </div>
          <div class="step step-2 vertical-center">
            <div class="opt opt-true">
              <p>Please explain with all the details!</p>
            </div>
            <div class="opt opt-false">
              <p>Don't worry, I can read brainwaves. Just speak naturally anyway.</p>
              <p>Please explain with all the details!</p>
            </div>
          </div>
          <div class="step step-3 vertical-center">
            <h2>QUACK!</h2>
            <p>
              Rubber ducking is a powerful method for solving even the most complex problems.
            </p>
            <p>
              A lot of ideas are often found by simply
              describing the problem aloud.
            </p>
            <p>Didn't find your answer? Try these:</p>
            <ul>
              <li>
                <a href="https://stackoverflow.com/questions/ask" target="_blank">Stack Overflow</a>
              </li>
              <li>
                <a href="https://github.com/">Github issues</a>
              </li>
            </ul>

            <sub>no ducks were harmed in the making of this software</sub>
          </div>
          <div>
              <img src="vscode-resource://${quackImage}" width="200" />
          </div>
      </div>
      <p>
        <a href="https://ae.studio">Made by AE.Studio</a>
      </p>
  </body>

  </html>`
}

// this method is called when your extension is deactivated
export function deactivate() {}
