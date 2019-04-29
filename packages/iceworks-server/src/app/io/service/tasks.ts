const execa = require('execa');
import { provide, inject } from 'midway';

@provide()
export class TasksService {
  @inject()
  ctx;

  async dev() {
    try {
      return await execa.shell('npm -v');
    } catch (error) {
      return { error };
    }
  }

  async build() {}

  async lint() {}
}
