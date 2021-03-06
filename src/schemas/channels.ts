import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Base } from "./base";

@Schema()
export class Channels extends Base {
	@Prop()
	queueSize: number;

	@Prop()
	queueMode: string;

	@Prop()
	guildId: string;

	@Prop()
	channelId: string;

	@Prop({ default: true })
	createVoiceChannels: boolean;

	@Prop({ default: false })
	createTextChannels: boolean;

	@Prop({ default: true })
	sendDirectMessage: boolean;

	@Prop()
	name?: string;
}

export type ChannelsDocument = Channels & Document;

export const ChannelsSchema = SchemaFactory.createForClass(Channels);
