import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class UrlDecodePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return decodeURIComponent(value);
    } else return value;
  }
}
