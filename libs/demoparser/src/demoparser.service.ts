import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoparserService {
    public parseDemo() {
        console.log("HEY!");
    }
}
