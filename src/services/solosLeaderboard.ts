import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";
import { SolosLeaderboard, SolosLeaderboardDocument } from "../schemas/solosLeaderboard";
import { Pagination } from "src/types/base";

@Injectable()
class SolosLeaderboardService {
	private logger = new Logger(SolosLeaderboardService.name);

	constructor(
		@InjectModel(SolosLeaderboard.name)
		private readonly solosLeaderboardModel: Model<SolosLeaderboardDocument>
	) {}

	public async getSolosLeaderboardByChannelId(
		channelId: string,
		skip: number
	): Promise<Pagination<SolosLeaderboardDocument[]>> {
		try {
			this.logger.log(`getSolosLeaderboardByChannelId: ${channelId}`);
			const data = await this.solosLeaderboardModel
				.find({ channelId })
				.skip(skip)
				.limit(10)
				.sort({ mmr: -1, wins: -1, userId: -1 });

			const total = await this.solosLeaderboardModel.countDocuments({ channelId });

			return { total, data } as Pagination<SolosLeaderboardDocument[]>;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}

	public async getSolosLeaderboardsByGuildId(guildId: string, skip: number): Promise<SolosLeaderboardDocument[]> {
		this.logger.log(`getSolosLeaderboardsByGuildId: ${guildId}, ${this.solosLeaderboardModel.collection.name}`);
		return await this.solosLeaderboardModel.find({ guildId }).skip(skip).limit(10);
	}
}
export default SolosLeaderboardService;
