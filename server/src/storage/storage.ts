import { Data } from './data';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

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
    return data;
  }

  commitData(data: Data) {
    let raw = JSON.stringify(data, null, 2);
    fs.writeFileSync('./storage/data.json', raw);
  }

}