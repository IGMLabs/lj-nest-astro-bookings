import { IsNotEmpty, IsString } from "class-validator";
import { Agency } from "./agency.dto";
export class CreateAgencyDto implements Partial<Agency> {
  @IsNotEmpty()
  @IsString()
  name: string;
}
