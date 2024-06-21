import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {

  getHello(): string {
    return "Hello World!"
  }

  getHtml(): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Documentation</title>
      <style>
        body, html {
          height: 100%;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Arial, sans-serif;
          background-image: url('https://img.freepik.com/premium-vector/white-abstract-background-clean-wave-signal-pattern-online-communication_1406-367.jpg?w=1960');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }
        .container {
          text-align: center;
          background: rgba(255, 255, 255, 0.8);
          padding: 20px;
          border-radius: 8px;
        }
        .button {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 16px;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          text-decoration: none;
        }
        .button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Exercício 02</h1>
        <p>Clique no botão abaixo para acessar a documentação da API</p>
        <a href="/api" class="button" target="_blank">Acessar documentação da API</a>
      </div>
    </body>
    </html>
  `
  }
}
