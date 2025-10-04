import { MockDenunciaRepository } from "../../../infra/repositories/MockDenunciaRepository";
import { UpdateDenuncia } from "../../../domain/use-cases/UpdateDenuncia";
import { RegisterDenuncia } from "../../../domain/use-cases/RegisterDenuncia";
import { Photo } from "../../../domain/value-objects/Photo";
import { GeoCoordinates } from "../../../domain/value-objects/GeoCoordinates";
import { Denuncia } from "../../../domain/entities/Denuncia";

describe("testando use-case: UpdateDenuncia", ()=>{
    it("deve atualizar uma denuncia com sucesso", async ()=>{
        const denunciaRepository = new MockDenunciaRepository()
        const registerDenuncia = new RegisterDenuncia(denunciaRepository)
        const updateDenuncia = new UpdateDenuncia(denunciaRepository)

        const denuncia = await registerDenuncia.execute({
            userId: "1",
            foto: Photo.create("file:///home/marcos/Imagens/tela3.png"),
            localizacao: GeoCoordinates.create(-23.1234, -43.1234),
            descricao: "essa é 1"
        })

        expect((await denuncia).descricao).toBe("essa é 1")

        const denuncia_atualizada = await updateDenuncia.execute({
            id: denuncia.id,
            descricao: "essa é 2",
            localizacao: GeoCoordinates.create(-23.1234, -43.1234),
        })

        expect(denuncia_atualizada).toBeInstanceOf(Denuncia)
        expect((await denuncia_atualizada).descricao).toBe("essa é 2")
    })

    it("deve lançar um erro ao tentar atualizar uma denúncia que não existe", async () => {
        const denunciaRepository = new MockDenunciaRepository();
        const updateDenuncia = new UpdateDenuncia(denunciaRepository);
        const idInexistente = "11";

        await expect(
            updateDenuncia.execute({
                id: idInexistente,
                descricao: "essa é 2",
            })
        ).rejects.toThrow(new Error('Denúncia não encontrada'));
    });
})