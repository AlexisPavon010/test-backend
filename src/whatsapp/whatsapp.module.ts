import { Module } from '@nestjs/common';
import { WhatsappGateway } from './whatsapp.gateway';

@Module({
  providers: [WhatsappGateway]
})
export class WhatsappModule { }
