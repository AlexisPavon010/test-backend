import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

const accountSid = 'ACae56978f983c1b3e1a4a585b142df91d';
const authToken = '515a0458d9b925bcd4a541f8abe4f020';
const client = require('twilio')(accountSid, authToken);

@Injectable()
export class MessagesService {
  async create(createMessageDto: CreateMessageDto) {
    const { message, phoneNumber } = createMessageDto;

    try {
      const result = await client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:+${phoneNumber}`
      })
      console.log(result.sid)
      return result.sid;

    } catch (error) {
      console.log(error)
      return new BadRequestException('Error en el servidor');
    }
  }

  async webhook(reciveMessageDto: any) {
    console.log(reciveMessageDto)
    const { Body, From } = reciveMessageDto;
    try {
      const result = await client.messages.create({
        body: Body,
        from: 'whatsapp:+14155238886',
        to: From
      })
      console.log(result.sid)
      return result.sid;

    } catch (error) {
      console.log(error)
      return new BadRequestException('Error en el servidor');
    }
  }
}
