export interface OilResponse {
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
  template: string;
  acf: {
    "ol-bild"?: number;
    beschreibung: string;
    rezepte?: number[];
    video?: string;
    [key: string]: any;
  };
}

export interface OilResponseQuery {
  id?: number;
  slug?: string;
  title?: string;
}

export interface IOilsRepository {
  getManyOils(options: FetchManyOptions): Promise<OilResponse[]>;
  getOilById(id: number): Promise<OilResponse>;
  getOilBySlug(slug: string): Promise<OilResponse>;
}

export interface FetchManyOptions {
  allPages?: boolean;
}
