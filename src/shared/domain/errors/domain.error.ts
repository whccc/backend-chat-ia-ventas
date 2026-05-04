export type DomainErrorCategory = 'validation' | 'conflict' | 'business';

export abstract class DomainError extends Error {
  protected constructor(
    message: string,
    public readonly category: DomainErrorCategory = 'business',
  ) {
    super(message);
    this.name = new.target.name;
  }
}