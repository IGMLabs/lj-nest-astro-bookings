import { Body, Controller, Get, Param, Post, ValidationPipe, HttpException, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { AgenciesService } from "./agencies.service";
import { AgencyDto } from "./dto/agency.dto";
import { Agency } from "./dto/agency.interface";
import { ApiKeyGuard } from './api-key.guard';

@Controller("agencies")
@UseGuards(ApiKeyGuard)
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) { }

  @Get()
  getAll(): Agency[] {
    return this.agenciesService.selectAll();
  }

  @Get("/:id")
  getById(@Param("id") id: string) {
    try {
      return this.agenciesService.findById(id);
    } catch (error) {
      throw new HttpException(`No existen agencias con ese id ${id}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  postAgency(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    agency: AgencyDto,
  ): Agency {
    return this.agenciesService.insert(agency);
  }

  @Put("/:id")
  public putAgency(@Param("id") agencyId: string, @Body() payload: Agency): Agency {
    try {
      return this.agenciesService.update(agencyId, payload);
    } catch (error) {
      const message: string = error.message;
      if (message.startsWith("NOT FOUND:")) throw new HttpException(message, HttpStatus.NOT_FOUND);
      else throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
}
