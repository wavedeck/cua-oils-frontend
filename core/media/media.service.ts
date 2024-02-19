import { type MediaResponse, MediaRepository } from "./media.repository";

export class MediaService implements IMediaService {
  private _repository: MediaRepository;

  constructor() {
    this._repository = new MediaRepository();
  }

  public async getManyMedia(ids: number[]): Promise<MediaResponse[]> {
    return this._repository.getManyMedia(ids);
  }

  public async getMediaById(id: number | string): Promise<MediaResponse> {
    return this._repository.getMediaById(id);
  }
}

export default MediaService;

// Interfaces and Types

interface IMediaService {
  getManyMedia(ids: number[]): Promise<MediaResponse[]>;
  getMediaById(id: number | string): Promise<MediaResponse>;
}
