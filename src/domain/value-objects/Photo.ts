// DENTRO DO ARQUIVO: value-objects/Photo.ts

export class Photo {
  private constructor(readonly uri: string) {} // Renomeado para 'uri' para ser mais genérico

  static create(source: string): Photo {
    if (!this.validate(source)) {
      throw new Error('Fonte da imagem (URI) inválida');
    }
    return new Photo(source);
  }

  private static validate(source: string): boolean {
    // Agora, a validação aceita URLs da web OU caminhos de arquivo locais
    const isWebUrl = source.startsWith('http://') || source.startsWith('https://');
    const isFileUri = source.startsWith('file://');

    // A fonte é válida se for um dos dois
    return isWebUrl || isFileUri;
  }
}