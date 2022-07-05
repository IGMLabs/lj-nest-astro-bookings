import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    tripId:string;

    @IsString()
    @IsNotEmpty()
    client:string;

    @IsNumber()
    passengers?:number;

}
