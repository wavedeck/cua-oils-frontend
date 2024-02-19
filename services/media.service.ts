import { apiConfig } from "@/config/api";

export class MediaService {
  private mediaIds: number[] = [];
  private _paginationParams = { per_page: "100" };

  public constructor();
  public constructor(mediaIds: number[]);

  public constructor(mediaIds?: number[]) {
    if (mediaIds) {
      this.mediaIds = mediaIds;
    }
  }

  public async getMedia(): Promise<MediaResponse[]>;
  public async getMedia(mediaIds: number[] | number): Promise<MediaResponse[]>;

  public async getMedia(
    mediaIds?: number[] | number,
  ): Promise<MediaResponse[]> {
    if (mediaIds === undefined) {
      return this._fetchMedia(this.mediaIds);
    }

    if (Array.isArray(mediaIds)) {
      return this._fetchMedia(mediaIds);
    }

    return this._fetchMedia([mediaIds]);
  }

  private async _fetchMedia(mediaIds: number[]): Promise<MediaResponse[]> {
    const queryString = this._createQueryString({
      include: mediaIds.join(","),
    });
    const mediaApiUrl = apiConfig.basePath + "/wp/v2/media?" + queryString;

    const mediaResponse = await fetch(mediaApiUrl);
    return await mediaResponse.json();
  }

  private _createQueryString(properties: object): string {
    return this._createQueryParams(properties).toString();
  }

  private _createQueryParams(properties: object): URLSearchParams {
    return new URLSearchParams({
      ...properties,
      ...this._paginationParams,
    });
  }
}

export interface MediaResponse {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: any[];
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: any;
    image_meta: any;
  };
  post: number;
  source_url: string;
}
