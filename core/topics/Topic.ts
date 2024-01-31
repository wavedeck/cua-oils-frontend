import type {TopicData} from "~/core/topics/topics.repository";

export class Topic {
    private readonly _data: TopicData;

    constructor(data: TopicData) {
        this._data = data;
    }

    public getData(): TopicData {
        return this._data;
    }

    public getTitle(): string {
        return this._data.title.rendered ?? "";
    }

    public getPreviewImageId(): number | null {
        return this._data.acf["preview-image"] ?? null;
    }

    public getPostImageId(): number | null
    {
        return this._data.acf["post-image"] ?? null;
    }

    public getPostHeaderId(): number | null
    {
        return this._data.acf["post-header"] ?? null;
    }

    public getPostGalleryIds(): number[]
    {
        return this._data.acf["post-gallery"] ?? [];
    }

}

export default Topic;