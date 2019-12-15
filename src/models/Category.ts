export interface ICategory {
  name: string;
  icon: string;
}

export class Category implements ICategory {
  constructor(
    public name: string,
    public icon: string
  ) { }
}
