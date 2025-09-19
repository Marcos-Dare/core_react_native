import { GeoCoordinates } from "../value-objects/GeoCoordinates";

export type StatusDenuncia = "pendente" | "em_analise" | "resolvida" | "rejeitada";

export class Denuncia {
  private constructor(
    readonly id: string,
    readonly userId: string,
    readonly foto: string,
    readonly descricao: string | null,
    readonly localizacao: GeoCoordinates,
    readonly status: StatusDenuncia,
    readonly dataHora: Date
  ) {}

  static create(
    id: string,
    userId: string,
    foto: string,
    localizacao: GeoCoordinates,
    descricao?: string
  ): Denuncia {
    return new Denuncia(id, userId, foto, descricao ?? null, localizacao, "pendente", new Date());
  }
}
