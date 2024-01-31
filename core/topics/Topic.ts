import type {TopicData} from "~/core/topics/topics.repository";

export class Topic {
    private readonly _data: TopicData;

    constructor(data: TopicData) {
        this._data = data;
    }

    public getData(): TopicData {
        return this._data;
    }

    public getPreviewImageId(): number | null {
        return this._data.acf["preview-image"] ?? null;
    }

    public getTitle(): string {
        return this._data.title.rendered ?? "";
    }
}

export default Topic;