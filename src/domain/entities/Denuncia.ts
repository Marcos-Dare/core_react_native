import { GeoCoordinates } from "../value-objects/GeoCoordinates";
import { Photo } from "../value-objects/Photo";

export type StatusDenuncia = "pendente" | "em_analise" | "resolvida" | "rejeitada";

export class Denuncia {
  private constructor(
    readonly id: string,
    readonly userId: string,
    readonly foto: Photo,
    readonly descricao: string | null,
    readonly localizacao: GeoCoordinates,
    readonly status: StatusDenuncia,
    readonly dataHora: Date
  ) {}

  static create(
    id: string,
    userId: string,
    foto: Photo,
    localizacao: GeoCoordinates,
    status: StatusDenuncia,
    dataHora: Date,
    descricao?: string,

  ): Denuncia {
    return new Denuncia(id, userId, foto, descricao ?? null, localizacao, status, dataHora);
  }
}
