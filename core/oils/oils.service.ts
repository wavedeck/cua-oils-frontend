import type OilsRepository from "~/core/oils/oils.repository";
import type {FetchManyOptions} from "~/core/oils/oils.types";

export class OilsService {
    private repository: OilsRepository;

    constructor(repository: OilsRepository) {
        this.repository = repository;
    }

    public async getManyOils(options: FetchManyOptions) {
        return this.repository.getManyOils({allPages: true})
    }

    public async getOilById(id: number | string) {
        return this.repository.getOilById(id);
    }

    public async getOilBySlug(slug: string) {
        return this.repository.getOilBySlug(slug);
    }
}

export default OilsService;