import { Data } from './data';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { validateData } from './data.validation';

@Injectable()
export class Storage {

  loadData(): Data {
    let data: Data;
    if (fs.existsSync('./storage/data.json')) {
      let raw = fs.readFileSync('./storage/data.json', 'utf8');
      try {
        data = JSON.parse(raw);
      } catch (e) {
        console.log(e);
      }
    }
    if (data == null) {
      data = {} as any as Data;
    }
    if (data.users == null) data.users = [];
    if (data.posts == null) data.posts = [];
    return data;
  }

  commitData(data: Data) {
    validateData(data);
    let raw = JSON.stringify(data, null, 2);
    fs.writeFileSync('./storage/data.json', raw);
  }

}