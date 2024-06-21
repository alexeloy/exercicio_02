export interface OriginLocationProps {
  name: string
  url: string
}

export class OriginLocation {
  private readonly name: string
  private readonly url: string
  get value(): OriginLocationProps {
    return {
      name: this.name,
      url: this.url,
    }
  }

  constructor(input: OriginLocationProps) {
    this.name = input.name
    this.url = input.url
  }
}
