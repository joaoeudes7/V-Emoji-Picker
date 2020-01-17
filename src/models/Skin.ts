export interface ISkin {
  name: string;
  color: string;
  character: string;
}

export class Skin implements ISkin {
  constructor(
    public name: string,
    public color: string,
    public character: string
  ) { }
}
