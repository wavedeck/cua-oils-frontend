import {
  type TopicData,
  TopicsRepository,
} from "~/core/topics/topics.repository";
import Topic from "~/core/topics/Topic";

export class TopicsService implements ITopicsService {
  private _repository: TopicsRepository;

  constructor() {
    this._repository = new TopicsRepository();
  }

  public async getManyTopics(): Promise<Topic[]> {
    const topicsData = await this._repository.getManyTopics();
    return topicsData.map((topicData) => new Topic(topicData));
  }

  public async getTopicById(id: number | string): Promise<Topic> {
    const topicData = await this._repository.getTopicById(id);
    return new Topic(topicData);
  }

  public async getTopicBySlug(slug: string): Promise<Topic> {
    const topicData = await this._repository.getTopicBySlug(slug);
    return new Topic(topicData);
  }
}

export default TopicsService;

// Interfaces and Types

interface ITopicsService {
  getManyTopics(): Promise<Topic[]>;

  getTopicById(id: number | string): Promise<Topic>;

  getTopicBySlug(slug: string): Promise<Topic>;
}
