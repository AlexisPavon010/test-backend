import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
const { Client, LocalAuth, } = require('whatsapp-web.js');
const { Message, ClientInfo, Buttons } = require('whatsapp-web.js/src/structures');
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: '/whatsapp' })
export class WhatsappGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() io: Server;

  handleConnection(socket: Socket) {
    console.log('connected')

    const client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: { headless: true }
    })

    client.initialize()

    client.on('ready', () => {
      console.log('Ready')
      this.io.emit('ready', { ok: true })
    })

    client.on('message', async message => {
      console.log(message.body)
      if (message.body === 'Hola') {

        // let button = new Buttons('Button body', [{ body: 'Aceptar' }, { body: 'rechazar' }], 'title', 'footer');
        let button = new Buttons('¡Hola! Gracias por realizar tu pedido con nosotros. Nos complace confirmar que hemos recibido tu pedido con el número de orden #12345 y estamos trabajando diligentemente para prepararlo y enviarlo lo antes posible. Si tienes alguna pregunta o inquietud sobre tu pedido, no dudes en ponerte en contacto con nosotros con el número de orden correspondiente. ¡Gracias por elegirnos!', [{ body: 'Aceptar', id: 'accept-button' }, { body: 'rechazar', id: 'reject-button' }]);

        client.sendMessage(message.from, button);
      }
    });


    client.on('message_create', async (message) => {
      if (message.type === 'buttons_response') {
        if (message.selectedButtonId === 'accept-button') {
          client.sendMessage(message.from, 'Bienvenido a la Deep Web!');
        } else if (message.selectedButtonId === 'reject-button') {
          client.sendMessage(message.from, 'Lo siento, no podemos permitirte entrar.');
        }
      }
    });


    client.on('disconnected', () => {
      console.log('disconnected')
      client.initialize()
    })

    client.on('auth_failure', () => {
      console.log('auth_failure')
    })

    client.on('qr', (qr) => {
      // qrcode.generate(qr, { small: true })
      this.io.emit('getqr', qr)
      // console.log(qr)
    })

  }
  handleDisconnect(client: Socket) {
    console.log('Cliente desconnectado', client.id)
  }


}
