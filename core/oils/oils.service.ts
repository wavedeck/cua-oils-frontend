import type OilsRepository from "~/core/oils/oils.repository";

export class OilsService {
    private repository: OilsRepository;

    constructor(repository: OilsRepository) {
        this.repository = repository;
    }

    public async getManyOils() {
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