import { t } from '@/locale';

export interface ICategory {
  name: string;
  icon: string;
}

export class Category implements ICategory {
  constructor(
    public name: string,
    public icon: string
  ) { }

  get label() {
    return t(`categories.${this.name}`);
  }
}
