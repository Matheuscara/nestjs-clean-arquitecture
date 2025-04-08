export class CreatedUserEvent {
  constructor(
    public readonly nome: string,
    public readonly email: string,
  ) {}
}
